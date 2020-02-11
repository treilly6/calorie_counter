import React, { useState, useEffect } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

export default function MessageBox({ message }) {

    // To use the MessageBox componenet in the current configuration you must pass the message
    // to the MessageBox component through a prop called 'message'
    // Also use a key on the component so it remounts each time

    const [opacity, setOpacity] = useState(0);
    const [showMessage, setShowMessage ] = useState(false);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        // if there is a message
        if(message) {
            // set the message state
            setMessageText(message);

            // set the showing message state to true
            setShowMessage(true);

            // set the opacity to one
            setOpacity(1);

            // create a timeout that will set opacity to false
            setTimeout(() => {
                console.log("OPACITY TIMEOUT");
                setOpacity(0);
            }, 6400);

            // create timeout that will set show message to false
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
        }
    }, [message])

    // if there is a message and showMessgae is true
    if(showMessage && message) {
        var styles = (message.includes("Error")) ? Object.assign({}, messageBoxCont, errorBox, {opacity : opacity}) : Object.assign({}, messageBoxCont, successBox, {opacity : opacity});
        return(
            <div style={styles}>
                <div>
                    <h5 style={{margin : "0"}}>{messageText}</h5>
                </div>
            </div>
        )
    // else return nothing
    } else {
        return null;
    }
}

var messageBoxCont = {
    padding : "10px",
    margin : "8px auto",
    maxWidth : "600px",
    textAlign : "center",
    borderRadius : "5px",
    transition : ".5s",
}

const errorBox = {
    backgroundColor : "#ffcccc",
    border : "1px solid #ff3333",
    color : "#ff3333",
}

const successBox = {
    backgroundColor : "#d6f5d6",
    border : "1px solid #33cc33",
    color : "#33cc33",
}

const warningBox = {
    backgroundColor : "#fffae6",
    border : "1px solid #ffcc00",
    color : "#ffcc00",
}
