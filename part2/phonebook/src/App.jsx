/* eslint-disable react/prop-types */
import { useState } from "react";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", phoneNumber: "999221232" }]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <Title>Phone Book</Title>

            <ContactForm
                newName={newName}
                setNewName={setNewName}
                persons={persons}
                setPersons={setPersons}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            ></ContactForm>

            <ContactList persons={persons}></ContactList>
        </div>
    );
}

export default App;
