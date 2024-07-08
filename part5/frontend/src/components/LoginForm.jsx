/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import loginService from "../services/loginService";

function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage("Credentials required");
      return;
    }

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setErrorMessage("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <div>username</div>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <div>password</div>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">login</button>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </form>
  );
}

export default LoginForm;
