/* eslint-disable react/prop-types */

import Course from "./components/Course/Course";

function App() {
    const courses = [
        {
            id: 1,
            title: "Half Stack application development",

            courseParts: [
                {
                    name: "Fundamentals of React",
                    nrExercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    nrExercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    nrExercises: 14,
                    id: 3,
                },
            ],
        },
        {
            id: 2,
            title: "Node.js",
            courseParts: [
                {
                    name: "Routing",
                    nrExercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    nrExercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    );
}

export default App;
