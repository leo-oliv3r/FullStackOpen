/* eslint-disable react/prop-types */

function ContactForm({ setNewName, newName, setPersons, persons, newNumber, setNewNumber }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPersons = [...persons, { name: newName, phoneNumber: newNumber }];
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-name">
                        Name:
                        <input
                            id="new-name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="new-number">
                        Number:
                        <input
                            id="new-number"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                        />
                    </label>
                </div>

                <button type="submit">Add Contact</button>
            </form>
        </>
    );
}

export default ContactForm;
