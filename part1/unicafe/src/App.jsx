/* eslint-disable react/prop-types */

import { useState } from "react";

function Button({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            style={{
                cursor: "pointer",
            }}>
            {children}
        </button>
    );
}

function StatisticsLine({ data, children, isPercentage }) {
    return (
        <tr>
            <td>{children}</td>
            <td>
                {data}
                {isPercentage && "%"}
            </td>
        </tr>
    );
}

function Statistics({ good, neutral, bad }) {
    const surveyIsEmpty = good === 0 && neutral === 0 && bad === 0;
    if (surveyIsEmpty) {
        return (
            <>
                <h2>No feedback given yet</h2>
            </>
        );
    }

    const totalVotes = calculateTotalVotes();
    const averageScore = calculateAverageScore();
    const positivePercentage = calculatePositivePercentage();

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td
                            colSpan={2}
                            style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
                            Statistics
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <StatisticsLine data={good}>Good</StatisticsLine>
                    <StatisticsLine data={neutral}>Neutral</StatisticsLine>
                    <StatisticsLine data={bad}>Bad</StatisticsLine>

                    <StatisticsLine data={totalVotes}>Total votes</StatisticsLine>
                    <StatisticsLine data={averageScore}>Average score</StatisticsLine>
                    <StatisticsLine data={positivePercentage} isPercentage={true}>
                        Positive percentage
                    </StatisticsLine>
                </tbody>
            </table>
        </>
    );

    function calculateTotalVotes() {
        return good + neutral + bad;
    }

    function calculatePositivePercentage() {
        return ((good / totalVotes) * 100 || 0).toFixed();
    }

    function calculateAverageScore() {
        const average = (good * 1 + bad * -1) / totalVotes || 0;
        if (average < 0) return 0;
        return (average * 10).toFixed(2);
    }
}

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const clearAll = () => {
        setGood(0);
        setNeutral(0);
        setBad(0);
    };

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <h1>Give feedback</h1>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                }}>
                <Button onClick={() => setGood((good) => good + 1)}>Good</Button>
                <Button onClick={() => setNeutral((neutral) => neutral + 1)}>Neutral</Button>
                <Button onClick={() => setBad((bad) => bad + 1)}>Bad</Button>
                <Button onClick={clearAll}>Clear</Button>
            </div>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;
