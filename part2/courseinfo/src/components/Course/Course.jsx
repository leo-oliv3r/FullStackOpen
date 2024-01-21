/* eslint-disable react/prop-types */

import Header from "../Header/Header";
import Content from "../Content/Content";
import Total from "../Total/Total";

function Course({ course }) {
    const totalNrExercises = course.courseParts.reduce(
        (acc, current) => (acc += current.nrExercises),
        0
    );

    return (
        <>
            <Header course={course.title} />

            <Content parts={course.courseParts} />

            <Total total={totalNrExercises} />
        </>
    );
}

export default Course;
