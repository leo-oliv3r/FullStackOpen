import axios from "axios";

async function getAllPersons() {
    const res = await axios.get("http://localhost:3001/persons");
    return res.data;
}

export default {
    getAllPersons,
};
