import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

async function getAllCountries() {
    return await axios.get(`${BASE_URL}/all`).then((res) => res.data);
}

export default { getAllCountries };
