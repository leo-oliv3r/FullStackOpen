/* eslint-disable react/prop-types */
import React from "react";

function Button({ onClick, children }) {
  return (
    <button type="button" style={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
