/* eslint-disable react/prop-types */
import React from "react";

function UserPanel({ user }) {



  return (

  <div>{user && <p>Welcome, {user.username}</p>} </div>;
  )
}
