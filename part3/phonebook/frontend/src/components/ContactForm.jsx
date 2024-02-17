/* eslint-disable react/prop-types */
import React from "react";
import phonebookService from "../services/phonebook";
import { isNameInList, isNumberInList } from "../utils/utils";

function ContactForm({
  setNewName,
  newName,
  setPersons,
  persons,
  newNumber,
  setNewNumber,
  setNewNotification,
}) {
  async function handleSubmit(e) {
    e.preventDefault();

    if (newName === "" || newNumber === "") {
      setNewNotification({
        message: `Name and Number required`,
        type: "warning",
      });
      return;
    }

    if (isNameInList(newName, persons)) {
      setNewNotification({
        message: `Name "${newName}" is already on the phonebook`,
        type: "warning",
      });
      return;
    }

    if (isNumberInList(newNumber, persons)) {
      setNewNotification({
        message: `Number ${newNumber} is already on the phonebook`,
        type: "warning",
      });
      return;
    }

    try {
      const newPerson = await phonebookService.createContact({
        name: newName.trim(),
        number: newNumber.trim(),
      });

      const newPersons = [...persons, newPerson];
      setPersons(newPersons);

      setNewNotification({
        message: `Contact "${newName} - ${newNumber}" created`,
        type: "created",
      });
      setNewName("");
      setNewNumber("");
    } catch (error) {
      setNewNotification({
        message: `Error: ${error.response.data.error}`,
        type: "warning",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-name">
        Name
        <input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
      </label>

      <label htmlFor="new-number">
        Number
        <input id="new-number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
