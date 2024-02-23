/* eslint-disable react/prop-types */
import React from "react";
import { deleteContact } from "../services/phonebook";
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

  const sendNotification = (message, type) => setNewNotification({ message, type });

  const handleDeleteClick = async (person) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmed = confirm(`Confirm delete of ${person.name.toUpperCase()}?`);
    const personToDelete = person;

    if (confirmed) {
      try {
        await deleteContact(personToDelete.id);
        sendNotification(`Contact ${personToDelete.name} deleted`, "deleted");
      } catch (error) {
        sendNotification(`Contact ${personToDelete.name} was already deleted on server`, "deleted");
        return;
      }

      const newPersons = persons.filter((current) => current.id !== personToDelete.id);
      setPersons(newPersons);
    }
  };

  return (
    <>
      <h1>Contacts</h1>
      {personsToRender.map((person) => (
        <div key={person.id}>
          <Contact name={person.name} phoneNumber={person.number} />
          <Button onClick={() => handleDeleteClick(person)}>Delete</Button>
        </div>
      ))}
    </>
  );
}

export default ContactList;
