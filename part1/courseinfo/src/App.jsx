/* eslint-disable react/prop-types */
function Header({ course }) {
    return <h1>{course}</h1>;
}

function Part({ title, nrExercises }) {
    return (
        <p>
            {title} {nrExercises}
        </p>
    );
}

function Content({ parts }) {
    return (
        <>
            {parts.map((part, index) => (
                <Part key={index} title={part.name} nrExercises={part.nrExercises} />
            ))}
        </>
    );
}

function Total({ total }) {
    return <p>Number of exercises: {total} </p>;
}

function App() {
    const course = "Half Stack application development";

    const parts = [
        {
            name: "Fundamentals of React",
            nrExercises: 10,
        },
        {
            name: "Using props to pass data",
            nrExercises: 7,
        },
        {
            name: "State of a component",
            nrExercises: 14,
        },
    ];

    const totalNrExercises = parts.reduce((acc, current) => (acc += current.nrExercises), 0);

    return (
        <>
            <Header course={course} />

            <Content parts={parts} />

            <Total total={totalNrExercises} />
        </>
    );
}

export default App;
