import axios from "axios";
const baseUrl = "/api/notes";

async function getAll() {
	const notes = await axios.get(baseUrl);
	return notes.data;
}

async function create(newNote) {
	const request = axios.post(baseUrl, newNote);
	const createdNote = (await request).data;
	return createdNote;
}

async function update(id, newNote) {
	const request = axios.put(`${baseUrl}/${id}`, newNote);
	const updatedNote = (await request).data;
	return updatedNote;
}

export default {
	getAll,
	create,
	update,
};
