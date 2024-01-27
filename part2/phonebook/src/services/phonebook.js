import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

async function getAllPersons() {
    return await axios.get(BASE_URL).then((res) => res.data);
}

async function createContact(contact) {
    const newContact = await axios
        .post("http://localhost:3001/persons", contact)
        .then((res) => res.data);
    return newContact;
}

async function deleteContact(id) {
    return await axios.delete(`${BASE_URL}/${id}`).then((res) => res.status);
}

export default {
    getAllPersons,
    createContact,
    deleteContact,
};
