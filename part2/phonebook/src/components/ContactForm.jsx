/* eslint-disable react/prop-types */
import phonebookService from "../services/phonebook";

function ContactForm({ setNewName, newName, setPersons, persons, newNumber, setNewNumber }) {
    const nameAlreadyInUse = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const phoneNumberAlreadyInUse = persons.find((person) => person.phoneNumber === newNumber);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nameAlreadyInUse) {
            alert(`Name "${newName}" is already added to phonebook`);
            return;
        }

        if (phoneNumberAlreadyInUse) {
            alert(`Number ${newNumber} is already added to phonebook`);
            return;
        }

        const newPerson = await phonebookService.createContact({
            name: newName,
            phoneNumber: newNumber,
        });

        const newPersons = [...persons, newPerson];
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-name">Name</label>
                <div>
                    <input
                        id="new-name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>

                <label htmlFor="new-number">Number</label>
                <div>
                    <input
                        id="new-number"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                    />
                </div>

                <button type="submit">Add Contact</button>
            </form>
        </>
    );
}

export default ContactForm;
