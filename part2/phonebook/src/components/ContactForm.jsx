/* eslint-disable react/prop-types */
import phonebookService from "../services/phonebook";
import { isNameInList, isNumberInList } from "../utils/utils";

function ContactForm({
    setNewName,
    newName,
    setPersons,
    persons,
    newNumber,
    setNewNumber,
    setNewNotification,
}) {
    async function handleSubmit(e) {
        e.preventDefault();

        if (isNameInList(newName, persons)) {
            setNewNotification({
                message: `Name "${newName}" is already on the phonebook`,
                type: "warning",
            });
            return;
        }

        if (isNumberInList(newNumber, persons)) {
            setNewNotification({
                message: `Number ${newNumber} is already on the phonebook`,
                type: "warning",
            });
            return;
        }

        try {
            const newPerson = await phonebookService.createContact({
                name: newName,
                number: newNumber,
            });

            const newPersons = [...persons, newPerson];
            setPersons(newPersons);

            setNewNotification({
                message: `Contact "${newName} - ${newNumber}" created`,
                type: "created",
            });
            setNewName("");
            setNewNumber("");
        } catch (error) {
            setNewNotification({
                message: `Error: ${error.response.data.error}`,
                type: "warning",
            });
        }
    }

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
