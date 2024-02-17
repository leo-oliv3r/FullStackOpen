/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import phonebookService from "./services/phonebook";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [notificationMessage, setNewNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    phonebookService.getAllPersons().then((res) => setPersons(res));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Title>Phone Book</Title>

      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />

      <ContactForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNewNotification={setNewNotification}
      />

      <Notification notificationMessage={notificationMessage} />

      <ContactList
        persons={persons}
        setPersons={setPersons}
        searchWord={searchWord}
        setNewNotification={setNewNotification}
      />
    </div>
  );
}

export default App;
