/* eslint-disable react/prop-types */

function Contact({ name, phoneNumber }) {
    return (
        <>
            <div style={{ textTransform: "capitalize" }}>
                {name} - {phoneNumber}
            </div>
        </>
    );
}

function ContactList({ persons, searchWord }) {
    const personsToRender = searchWord
        ? persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))
        : persons;

    return (
        <>
            <h1>Contacts</h1>
            {personsToRender.map((person) => (
                <Contact key={person.name} name={person.name} phoneNumber={person.phoneNumber} />
            ))}
        </>
    );
}

export default ContactList;
