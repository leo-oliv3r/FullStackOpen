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
