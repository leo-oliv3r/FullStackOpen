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

function ContactList({ persons }) {
    return (
        <>
            <h1>Numbers</h1>
            {persons.map((person) => (
                <Contact key={person.name} name={person.name} phoneNumber={person.phoneNumber} />
            ))}
        </>
    );
}

export default ContactList;
