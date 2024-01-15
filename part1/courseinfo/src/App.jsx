/* eslint-disable react/prop-types */
function Header({ course }) {
    return <h1>{course}</h1>;
}

function Content({ title, nrExercises }) {
    return (
        <p>
            {title} {nrExercises}
        </p>
    );
}

function Total({ total }) {
    return <p>Number of exercises: {total} </p>;
}

function App() {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;
    const total = exercises1 + exercises2 + exercises3;

    return (
        <>
            <Header course={course} />

            <Content title={part1} nrExercises={exercises1} />

            <Content title={part2} nrExercises={exercises2} />

            <Content title={part3} nrExercises={exercises3} />

            <Total total={total} />
        </>
    );
}

export default App;
