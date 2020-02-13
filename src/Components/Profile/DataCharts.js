import React from 'react';
import BarCharts from './BarCharts';
import CalendarGraph from './CalendarGraph';

export default function DataCharts({ dataType, data }) {
    console.log("HERE IS THE DATA TYPE AND THE DATA FROM PROPS ");
    console.log(dataType);
    console.log(data);
    console.log("\n", "\n", "\n");

    const typeSet = new Set(["week", "today", "twoWeek", "month"]);

    if(typeSet.has(dataType)) {
        console.log("GOING TO RENDER BAR CHARTS ", dataType, typeSet, typeSet.has(dataType));
        return(
            <div>
                <BarCharts dataType={dataType} data={data} />
            </div>
        )
    } else {
        console.log("GOING OT RENDER CALENDAR ", dataType, typeSet, typeSet.has(dataType));
        return (
            <div>
                <CalendarGraph dataType={dataType} data={data} />
            </div>
        )
    }

}
