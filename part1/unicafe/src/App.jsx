/* eslint-disable react/prop-types */

import { useState } from "react";

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

function Statistics({ good, neutral, bad }) {
    return (
        <>
            <h2>Statistics</h2>
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
            </ul>
        </>
    );
}

function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const clearAll = () => {
        setGood(0);
        setNeutral(0);
        setBad(0);
    };

    return (
        <>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood((good) => good + 1)}>Good</Button>
            <Button onClick={() => setNeutral((neutral) => neutral + 1)}>Neutral</Button>
            <Button onClick={() => setBad((bad) => bad + 1)}>Bad</Button>
            <Button onClick={clearAll}>Clear</Button>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
}

export default App;
