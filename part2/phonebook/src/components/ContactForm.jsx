/* eslint-disable react/prop-types */

function ContactForm({ setNewName, newName, setPersons, persons }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPersons = [...persons, { name: newName }];
        setPersons(newPersons);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-name">
                    Name:
                    <input
                        id="new-name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </label>

                <button type="submit">Add Contact</button>
            </form>
        </>
    );
}

export default ContactForm;
