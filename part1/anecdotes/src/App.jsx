/* eslint-disable react/prop-types */
import { useState } from "react";
import anecdotes from "./anecdotes";

function Button({ handleClick, children }) {
    return <button onClick={handleClick}>{children}</button>;
}

function App() {
    const [selected, setSelected] = useState(0);

    const getRandomIndex = (array) => Math.floor(Math.random() * array.length);
    const handleClick = () => setSelected(getRandomIndex(anecdotes));

    return (
        <div>
            <div>{anecdotes[selected]}</div>
            <Button handleClick={handleClick}>Show me another</Button>
        </div>
    );
}

export default App;
