/* eslint-disable react/prop-types */
import { React, useState } from "react";
import isNameInList from "../utils/utils";
import { updateContact, createContact } from "../services/phonebook";

function ContactForm({ setPersons, persons, setNewNotification }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const resetInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const updateContactList = (newPerson) => setPersons((oldState) => [...oldState, newPerson]);

  const sendNotification = (message, type) => setNewNotification({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newName === "" || newName.length < 3) {
      sendNotification(`Name is required and should be at least 3 characters long`, "warning");
      return;
    }

    if (newNumber === "" || newNumber.length < 10) {
      sendNotification(`Number is required and should be at least 10 characters long`, "warning");
      return;
    }

    const newData = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    if (isNameInList(newName, persons)) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const isToUpdate = confirm(`${newName} already in use, do you want to update the number?`);
      if (!isToUpdate) return;

      try {
        const contactFound = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedContact = await updateContact(contactFound.id, newData);

        const updatedContacts = persons.map((person) =>
          person.id !== updatedContact.id ? person : updatedContact
        );

        setPersons(updatedContacts);
        sendNotification(`Contact ${newName} updated!`, "created");
      } catch (error) {
        sendNotification(error.message, "warning");
      }
    } else {
      try {
        const newPerson = await createContact(newData);
        updateContactList(newPerson);
        sendNotification(`Contact "${newName} - ${newNumber}" created`, "created");
      } catch (error) {
        sendNotification(error.message, "warning");
      }
    }

    resetInput();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-name">
        Name
        <input
          id="new-name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
          minLength={2}
        />
      </label>

      <label htmlFor="new-number">
        Number
        <input
          id="new-number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          required
          pattern="/^\d{2,3}-\d{2,}$/"
          title="Example: XX-XXXXXXXX"
        />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
