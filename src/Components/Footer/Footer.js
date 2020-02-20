import React from 'react';
import './Footer.css';

export default function Footer(props) {

    // if on the home page dont render the footer
    if(window.location.pathname === "/") {
        return null
    } else {
        return (
            <div className="footer">

            </div>
        );
    }
}
