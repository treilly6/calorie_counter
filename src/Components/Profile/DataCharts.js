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
    
    if(data && Object.keys(data).length > 0) {
        console.log("GOING INTO THE FOR EACH");
        Object.keys(data).forEach((objKey) => {
            console.log("HERE IS THE OBJ KEY ", objKey)
            parsedData.push(data[objKey]);
        });
    }

    console.log("HERE IS THE PArsed data ", parsedData);


    // const data = [
    //   {
    //     "name": "Page A",
    //     "uv": 4000,
    //     "pv": 2400,
    //     "amt": 2400
    //   },
    //   {
    //     "name": "Page B",
    //     "uv": 3000,
    //     "pv": 1398,
    //     "amt": 2210
    //   },
    //   {
    //     "name": "Page C",
    //     "uv": 2000,
    //     "pv": 9800,
    //     "amt": 2290
    //   },
    //   {
    //     "name": "Page D",
    //     "uv": 2780,
    //     "pv": 3908,
    //     "amt": 2000
    //   },
    //   {
    //     "name": "Page E",
    //     "uv": 1890,
    //     "pv": 4800,
    //     "amt": 2181
    //   },
    //   {
    //     "name": "Page F",
    //     "uv": 2390,
    //     "pv": 3800,
    //     "amt": 2500
    //   },
    //   {
    //     "name": "Page G",
    //     "uv": 3490,
    //     "pv": 4300,
    //     "amt": 2100
    //   }
    // ];


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
