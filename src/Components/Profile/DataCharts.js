import React from 'react';
import './Profile.css';
import { BarChart, XAxis, YAxis, Legend, Tooltip, Bar, CartesianGrid } from 'recharts';

export default function DataCharts({ dataType, data }) {
    console.log("HERE IS THE DATA TYPE AND THE DATA FROM PROPS ");
    console.log(dataType);
    console.log(data);
    console.log("\n", "\n", "\n");

    const parsedData = [];


    // need to add some kind of fuction that will fill in days if there is no data
    // (i.e) if last 7 days is chosen but only 4 days have user data, the other 7 days need
    // to be added to the data set with a calorie value of 0 so the chart still looks consistent


    // const dataFormat = [
    //   {
    //     "date": date,
    //     "calories : calories
    //   },
    //   {
    //     "date": date,
    //     "calories : calories
    //   },
    //   {
    //     "date": date,
    //     "calories : calories
    //   },
    // ];

    // if daily or weekly data must rearrange to fit the required data format
    if(dataType === "today" || dataType === "week") {
        if(data && Object.keys(data).length > 0) {
            console.log("GOING INTO THE FOR EACH");
            Object.keys(data).forEach((objKey) => {
                console.log("HERE IS THE OBJ KEY ", objKey)
                parsedData.push(data[objKey]);
            });
        }
    } else {
        parsedData.push(data);
    }


    console.log("HERE IS THE PArsed data ", parsedData);





    return(
        <div>
            <div className="">HERE THE DATA CHARTS</div>
            <div className="chart-cont">
                <BarChart width={700} height={250} data={parsedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    )
}
