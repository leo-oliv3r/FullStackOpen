import axios from "axios";

const BASE_URL = "/api/persons";

async function getAllPersons() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

async function createContact(contact) {
  const newContact = await axios.post(BASE_URL, contact).then((res) => res.data);
  return newContact;
}

async function deleteContact(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.status;
}

export default {
  getAllPersons,
  createContact,
  deleteContact,
};
