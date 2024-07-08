import axios from "axios";

const LOGIN_URI = "/api/login";

async function login(credentials) {
  const response = await axios.post(LOGIN_URI, credentials);
  return response.data;
}

export default { login };
