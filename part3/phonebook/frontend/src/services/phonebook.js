import axios from "axios";

const BASE_URL = "/api/persons";

async function getAllPersons() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

async function createContact(contact) {
  const response = await axios.post(BASE_URL, contact);
  return response.data;
}

async function deleteContact(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.status;
}

async function updateContact(id, newData) {
  const response = await axios.put(`${BASE_URL}/${id}`, newData);
  return response.data;
}

export { getAllPersons, createContact, deleteContact, updateContact };
