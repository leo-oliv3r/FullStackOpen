/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import { getAllPersons } from "./services/phonebook";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [notificationMessage, setNewNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    getAllPersons().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <Title>Phone Book</Title>

      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />

      <ContactForm
        persons={persons}
        setPersons={setPersons}
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
