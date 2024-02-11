/* eslint-disable react/prop-types */

function SearchBar({ searchWord, setSearchWord }) {
    return (
        <div style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "10px" }}>
            <label htmlFor="search">Search:</label>
            <input id="search" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        </div>
    );
}

export default SearchBar;
