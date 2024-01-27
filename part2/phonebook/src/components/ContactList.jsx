/* eslint-disable react/prop-types */

import phonebookService from "../services/phonebook";
import Button from "./Button";

function Contact({ name, phoneNumber }) {
    return (
        <>
            <div style={{ textTransform: "capitalize", display: "inline" }}>
                {name} - {phoneNumber}
            </div>
        </>
    );
}

function ContactList({ persons, setPersons, setNewNotification, searchWord }) {
    const personsToRender = searchWord
        ? persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))
        : persons;

    const handleClick = (person) => {
        const confirmed = confirm(`Confirm delete of ${person.name.toUpperCase()}?`);

        if (confirmed) {
            phonebookService.deleteContact(person.id).then(() => {
                setNewNotification({ message: `Contact ${person.name} deleted`, type: "deleted" });
                const newPersons = persons.filter((current) => current.id !== person.id);
                setPersons(newPersons);
            });
        }
    };

    return (
        <>
            <h1>Contacts</h1>

            {personsToRender.map((person) => (
                <div key={person.id}>
                    <Contact name={person.name} phoneNumber={person.phoneNumber} />
                    <Button onClick={() => handleClick(person)}>Delete</Button>
                </div>
            ))}
        </>
    );
}

export default ContactList;
