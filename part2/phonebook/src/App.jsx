/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import noteService from "./services/notes";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";

function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        noteService.getAllPersons().then((res) => setPersons(res));
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
            ></ContactForm>

            <ContactList persons={persons} searchWord={searchWord}></ContactList>
        </div>
    );
}

export default App;
