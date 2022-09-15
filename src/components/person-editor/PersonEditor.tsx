import React, { ReactElement, useState, useEffect } from "react";
import localforage from "localforage";
import { LabeledInput } from "../LabeledInput";
import { Loading } from '../Loading';
import { initialPerson } from "../../utils/initialPerson";
import type { Person } from "../../types/person";

function saveperson(person:Person | null):void{
    console.log("Saving person : " , person);
    localforage.setItem("person", person);
}
export function PersonEditor(): ReactElement {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const getPerson = async ()=> {
        const person = await localforage.getItem<Person>("person")
        setPerson(person ?? initialPerson);
    }
    getPerson();
  },[]);

  useEffect(() => {
    saveperson(person);
  },  [person]);

  if(!person){
    return <Loading />
  }
  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`);
      }}
    >
      <LabeledInput
        label="First Name : "
        value={person.firstName}
        onChange={(e) => {
          setPerson((person) => ({
            ...person,
            firstName: e.target.value,
          })); 
        }}
      />
      <LabeledInput
        label="last Name : "
        value={person?.lastName}
        onChange={(e) => {
          setPerson((person) => ({ ...person, lastName: e.target.value }));
        }}
      />
      <LabeledInput
        label="EMail : "
        value={person?.email}
        onChange={(e) => {
          setPerson((person) => ({ ...person, email: e.target.value }));
        }}
      />
      <LabeledInput
        label="Address : "
        value={person?.address}
        onChange={(e) => {
          setPerson((person) => ({ ...person, address: e.target.value }));
        }}
      />
      <LabeledInput
        label="Phone : "
        value={person?.phone}
        onChange={(e) => {
          setPerson((person) => ({ ...person, phone: e.target.value }));
        }}
      />
      <hr />
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <hr />
      <div>
        <pre>{JSON.stringify(person, null, 2)}</pre>
      </div>
    </form>
  );
}
