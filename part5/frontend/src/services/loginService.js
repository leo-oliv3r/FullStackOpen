import axios from "axios";

const LOGIN_URI = "/api/login";

let currentUserToken = null;

function setCurrentUserToken(newToken) {
  currentUserToken = `Bearer ${newToken}`;
}

function getCurrentUserToken() {
  return currentUserToken;
}

async function login(credentials) {
  const response = await axios.post(LOGIN_URI, credentials);
  setCurrentUserToken(response.data.token);
  return response.data;
}

export default { login, setCurrentUserToken, getCurrentUserToken };
