import { useState, useEffect } from "react";
import localforage from "localforage";
import type { Person } from "../types/person";
import { SleepTime } from '../utils/sleepTime';
import { useIsMounted } from './useIsMounterd';

function saveperson(person: Person | null): void {
  console.log("Saving person : ", person);
  localforage.setItem("person", person);
}

/*
custom hook can also be exported as anonymous function
 export default function (initialPerson:Person)
 and can be imported in any component and assigned to any name
 i.e => import  useMyPerson from "./usePerson";
 const [person, setPerson] = useMyPerson(initialPerson);4
 Or
 Costum hook name should start with 'use' keyword followed by anysenseble name
 i.e usePerson
 */

export function usePerson(initialPerson: Person) {
  const [person, setPerson] = useState<Person | null>(null);
  const isMounted = useIsMounted();
  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person");
      // Wait for 2.5 seconds before loading data in personEditor
      await SleepTime(1000);
      console.log("isMounted 2: ",isMounted);
      if(isMounted.current){
        setPerson(person ?? initialPerson);
      }
    };
    getPerson();
  }, [initialPerson, isMounted]);

  useEffect(() => {
    saveperson(person);
  }, [person]);

  return [person, setPerson] as const;
}
