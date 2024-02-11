/* eslint-disable react/prop-types */
function Button({ onClick, children }) {
    return (
        <button style={{ cursor: "pointer" }} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
