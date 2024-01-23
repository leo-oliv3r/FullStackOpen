/* eslint-disable react/prop-types */
import { useState } from "react";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <Title>Phone Book</Title>

            <ContactForm
                setNewName={setNewName}
                newName={newName}
                setPersons={setPersons}
                persons={persons}
            ></ContactForm>

            <ContactList persons={persons}></ContactList>
        </div>
    );
}

export default App;
