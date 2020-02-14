import React, { useState, useEffect, useContext } from "react";
import { ResponsiveCalendar } from '@nivo/calendar';
import { UserContext } from '../../context/UserContext';
import './Profile.css';

// make sure parent container of ResponsiveCalendar had a defined height,
// otherwise height will be 0 and no chart will be rendered.

const CalendarGraph = ({ data }) => {

    console.log("HERE IST HE CALENDAR DAATA ", data);

    console.log(Object.values(data));

    // get the user from context
    const { user } = useContext(UserContext);

    var parsedData = [];

    const testData = [
        {
            day : "2020-04-20",
            value : 420,
            color : "green",
        },
        {
            day : "2020-05-20",
            value : 420,
            color : "red",
        },
    ]

    if(Object.values(data).length > 0) {
        console.log("SETTING THE PARSED DATA")
        parsedData = Object.values(data);
    }

    console.log("HERE IS THE PARSED DATA VVVV IMPRITNAT ", parsedData);
    console.log("HERE THE OTHER DATA TO CHEK THE FORMAT ", testData);

    const size = useWindowSize();


    const getDirection = () => {
        console.log("HERE IS THE COPONENT ");
        console.log(size);
        if(size.width <= 800) {
            return "vertical";
        } else {
            return "horizontal";
        }
    }

    const getMargin = () => {
        // vertical alignment
        if(size.width <= 800) {
            return { top: 20, right: 5, bottom: 0, left: 20 };
        // horizontal alignment
        } else {
            return { top: 0, right: 5, bottom: 0, left: 20 };
        }
    }

    const handleClick = (data, e) => {
        console.log("HERE IS THE DAY CLICKED ");
        console.log(data);
        console.log("HERE SI THE EVENT");
        console.log(e);
    }

    console.log("ABOUT TO RETURN");

    if(data === null) {
        console.log("NULL CALENDAR RENDER");
        return null
    }

    const colorFunc = () => {
        console.log("WHAT THE FUNSSK");
    }

    // need some kind of date setting here that will only get the past year or something

    return(
        <div className="calendar-graph-cont">
            <ResponsiveCalendar
                data={testData}
                from="2020-01-02"
                to="2020-12-31"
                emptyColor="#eeeeee"
                colors = {["#2eb82e", "#b82e2e"]}
                margin={getMargin()}
                direction={getDirection()}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                onClick={(data, event) => {
                    handleClick(data, event);
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </div>

    )

}


// Hook
function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}



export default CalendarGraph
