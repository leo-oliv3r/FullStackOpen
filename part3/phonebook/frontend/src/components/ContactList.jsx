/* eslint-disable react/prop-types */
import React from "react";
import phonebookService from "../services/phonebook";
import Button from "./Button";

function Contact({ name, phoneNumber }) {
  return (
    <div style={{ textTransform: "capitalize", display: "inline" }}>
      {name} - {phoneNumber}
    </div>
  );
}

function ContactList({ persons, setPersons, setNewNotification, searchWord }) {
  const personsToRender = searchWord
    ? persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))
    : persons;

  const handleClick = (person) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmed = confirm(`Confirm delete of ${person.name.toUpperCase()}?`);

    if (confirmed) {
      phonebookService
        .deleteContact(person.id)
        .then(() => {
          setNewNotification({
            message: `Contact ${person.name} deleted`,
            type: "deleted",
          });
          const newPersons = persons.filter((current) => current.id !== person.id);
          setPersons(newPersons);
        })
        .catch(() => {
          setNewNotification({
            message: `Contact ${person.name} was already deleted on server`,
            type: "deleted",
          });

          phonebookService.getAllPersons().then((res) => setPersons(res));
        });
    }
  };

  return (
    <>
      <h1>Contacts</h1>
      {personsToRender.map((person) => (
        <div key={person.id}>
          <Contact name={person.name} phoneNumber={person.number} />
          <Button onClick={() => handleClick(person)}>Delete</Button>
        </div>
      ))}
    </>
  );
}

export default ContactList;
