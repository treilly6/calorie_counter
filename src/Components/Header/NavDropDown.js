import './Header.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavDropDown({ navDown, setNavDown }) {
    console.log("HERE IS THE REF IN THE NAV FROP DONW ");

    const navMenuRef = useRef();
    const [navMenuHeight, setNavMenuHeight] = useState(0);

    // effect will only run once on initial render
    useEffect(() => {
        // get the height of the nav menu dropdown
        const height = Number(navMenuRef.current.clientHeight);
        // set the navMenuHeight state variable to the height calculated above
        setNavMenuHeight(height);
    }, []);

    // effect will run everytime the navDown prop changes
    // this prop is toggled by the parent component when the menu bar is clicked
    useEffect(() => {
        // if the navDown param is true then set the height to the navMenuHeight
        if(navDown) {
            console.log("THE NAV MENU SHOULD BE DOWN");
            console.log(navMenuRef.current.style.height);
            navMenuRef.current.style.height = navMenuHeight + "px";
        // if the navDown param is true then set the height to zero
        } else {
            console.log("THE NAV MENU SHOULD BE UP");
            console.log(navMenuRef.current.style.height);
            navMenuRef.current.style.height = 0;
        }

    }, [navDown]);

    // functioin for closing the nav menu when a linnk is clicked
    const closeMenu = () => {
        setNavDown(false);
    }

    return (
        <div ref={navMenuRef} style={{border : (navDown ? "1px solid #ccc" : "none")}} className="nav-menu-dropdown">
            <div className="nav-padding">
                <div className="nav-link-cont">
                    <Link onClick={closeMenu} className="nav-link" to={{
                        pathname : "/"
                    }}>Home</Link>
                </div>
                <div className="nav-link-cont">
                    <Link onClick={closeMenu} className="nav-link" to={{
                        pathname : "/journal"
                    }}>Journal</Link>
                </div>
                <div className="nav-link-cont">
                    <Link onClick={closeMenu} className="nav-link" to={{
                        pathname : "/profile"
                    }}>Profile</Link>
                </div>
            </div>
        </div>
    )
}
