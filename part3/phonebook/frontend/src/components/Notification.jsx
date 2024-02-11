/* eslint-disable react/prop-types */

function Notification({ notificationMessage }) {
    let style = {
        fontWeight: "bold",
        padding: "20px",
    };

    if (notificationMessage.type === "created") {
        style = { ...style, border: "solid 2px green", color: "green", backgroundColor: "silver" };
    }

    if (notificationMessage.type === "warning" || notificationMessage.type === "deleted") {
        style = { ...style, border: "solid 2px red", color: "red", backgroundColor: "silver" };
    }

    return (
        <div style={style}>
            <em>{notificationMessage.message}</em>
        </div>
    );
}

export default Notification;
