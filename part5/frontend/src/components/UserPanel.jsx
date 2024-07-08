/* eslint-disable react/prop-types */
import React from "react";

function UserPanel({ user, setUser }) {
  function logOut() {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  }

  return (
    <div>
      {user && <p>Welcome, {user.username}</p>} <button onClick={logOut}>Logout</button>
    </div>
  );
}

export default UserPanel;
