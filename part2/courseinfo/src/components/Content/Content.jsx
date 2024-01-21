/* eslint-disable react/prop-types */
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
            {parts.map((part) => (
                <Part key={part.id} title={part.name} nrExercises={part.nrExercises} />
            ))}
        </>
    );
}

export default Content;
