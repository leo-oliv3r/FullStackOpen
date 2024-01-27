import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

async function getAllPersons() {
    const res = await axios.get(BASE_URL);
    return res.data;
}

async function createContact(contact) {
    const response = await axios
        .post("http://localhost:3001/persons", contact)
        .then((res) => res.data);
    return response;
}

export default {
    getAllPersons,
    createContact
};
