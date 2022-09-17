import { useState, useEffect, useCallback, SetStateAction, useReducer } from "react";
import localforage from "localforage";
import type { Person } from "../types/person";
import { SleepTime } from '../utils/sleepTime';
import { useIsMounted } from './useIsMounterd';
import { useDebounce } from './useDebounce';
import { useWillUnmount } from './useWillUnmount';
import { useThrottle } from './useThrottle';
import { personEditorReducer } from './personEditorReducer';

function saveperson(person: Person | null): void {
  console.log("Saving person : ", person);
  localforage.setItem("person", person);
}

interface MetaData {
  isDirty: boolean
  isValid: boolean
}

/*
//custom hook can also be exported as anonymous function
 export default function (initialPerson:Person)
 and can be imported in any component and assigned to any name
 i.e => import  useMyPerson from "./usePerson";
 const [person, setPerson] = useMyPerson(initialPerson);4
 Or
 Costum hook name should start with 'use' keyword followed by anysenseble name
 i.e usePerson
 */

export function usePerson(initialPerson: Person) {
  // const [person, setPerson] = useState<Person | null>(null);
  // const [metadata, setMetaData] = useState<MetaData>({isDirty: false, isValid: true});
  
  // We will now set and manage state with reducer 

  const [{person, metadata}, dispatch] = useReducer(personEditorReducer,{
    person:null,
    metadata: {isDirty: false, isValid: true}
  })

  const isMounted = useIsMounted();
  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person");
      // Wait for 100 miliseconds before loading data in personEditor
      await SleepTime(100);
      if(isMounted.current){
        //setPerson(person ?? initialPerson);

        dispatch({
          type: 'set-initial-person',
          payload: person ?? initialPerson
        })
      }
    };
    getPerson();
  }, [initialPerson, isMounted]);

  // Save the person only after when you stop typing 
  const saveFun = useCallback(() => {
    saveperson(person);
  }, [person])
  
  // Save 1 seccond after stop typing in input field
  //useDebounce(saveFun, 1000);
  
  // save after every 1 second in interval after start typing
  useThrottle(saveFun, 1000);

  // Due to debounce delay of 10 seconds, When component unmount
  // Changes will not save. So we need to call saveFun function 
  // before unmount of component in useWillUnmount custom hook.
  useWillUnmount(saveFun); 


  /*function setPersonAndMeta(value: SetStateAction<Person | null>) {
    console.log("SetStateAction : ",value);
    setPerson(value);
    setMetaData((m) => ({...m, isDirty: true}));
    //TODO: Validation
  }*/

  // Dispatch new event to reducer function to update values on form edit
  function setproperty(name: keyof Person, value:unknown) {
    dispatch({type:'set-property', payload:{name,value}});
  }
  
  function setproperties(payload:Partial<Person>) {
    dispatch({type:'set-properties', payload});
  }

  return [person, setproperty, setproperties, metadata] as const;
}
