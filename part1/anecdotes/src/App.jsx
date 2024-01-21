/* eslint-disable react/prop-types */
import { useState } from "react";
import anecdotes from "./anecdotes";

function Button({ onClick, children }) {
    return (
        <button style={{ cursor: "pointer" }} onClick={onClick}>
            {children}
        </button>
    );
}

function App() {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    const getRandomIndex = (array) => Math.floor(Math.random() * array.length);
    const handleNextAnecdote = () => setSelected(getRandomIndex(anecdotes));
    const handleVote = () => {
        const newPoints = [...points];
        newPoints[selected] += 1;
        setPoints(newPoints);
    };

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <em>{`"${anecdotes[selected]}"`}</em>
            <div>This anecdote has {points[selected]} votes</div>
            <Button onClick={handleNextAnecdote}>Show me another</Button>
            <Button onClick={handleVote}>Vote</Button>
        </div>
    );
}

export default App;
