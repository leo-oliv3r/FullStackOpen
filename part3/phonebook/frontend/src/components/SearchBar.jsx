/* eslint-disable react/prop-types */
import React from "react";

function SearchBar({ searchWord, setSearchWord }) {
  return (
    <div style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "10px" }}>
      <label htmlFor="search">
        Search:
        <input id="search" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
      </label>
    </div>
  );
}

export default SearchBar;
