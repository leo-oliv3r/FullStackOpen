import React from "react";
import { useState } from "react";

function handleLogin(event) {
  event.preventDefault();
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleLogin}>
      <div>
        <div>username</div>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(target) => setUsername(target.value)}
        />
      </div>
      <div>
        <div>password</div>
        <input
          type="text"
          value={password}
          name="Password"
          onChange={(target) => setPassword(target.value)}
        />
      </div>

      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
