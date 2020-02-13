import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';


// Legend for the Pie chart
const PieLegend = () => {
    return (
        <div>
            <div className="legend-elem-cont">
                <div className="legend-elem">
                    <div className="legend-label">Fats</div>
                    <div className="box" style={{backgroundColor : "#b8502e"}}></div>
                </div>
                <div className="legend-elem">
                    <div className="legend-label">Carbs</div>
                    <div className="box" style={{backgroundColor : "#73b82e"}}></div>
                </div>
                <div className="legend-elem">
                    <div className="legend-label">Protein</div>
                    <div className="box" style={{backgroundColor : "#2e95b8"}}></div>
                </div>
            </div>
        </div>
    )
}

const dataTest = [
    { name : "fats", calories : 300},
    { name : "carbs", calories : 500},
    { name : "protein", calories : 200}
];

const colorMap = {
    "fats" : "#b8502e",
    "carbs" : "#73b82e",
    "protein" : "#2e95b8"
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function MacroChart({ data }) {

    console.log("HERE IS THE DATA FOR THE PIE CHART ");
    console.log(data);

    const macroObj = {
        fats : {calories : 0, name : "fats"},
        carbs : {calories : 0, name : "carbs"},
        protein : {calories : 0, name : "protein"},
    }

    const calsPerGram = {
        "fats" : 9,
        "carbs" : 4,
        "protein" : 4,
    }

    // variable that hold the formatted data needed for the pieChart
    const parsedData = Object.values(Object.keys(data).reduce((map1, key1) => {
        return (
            data[key1].reduce((map2, foodItem) => {
                // add all the macros
                map2.fats.calories += (Number(foodItem.fat) * calsPerGram["fats"]);
                map2.carbs.calories += (Number(foodItem.carbs) * calsPerGram["carbs"]);
                map2.protein.calories += (Number(foodItem.protein) * calsPerGram["protein"]);
                // return the map2
                return map2;
            }, macroObj)
        )
    }, macroObj));


    console.log("HERE IS THE PARSED DATA ");
    console.log(parsedData);

    // see if the data is empty
    var emptyData = parsedData.reduce((boolVal, macroItem) => {
        if(!boolVal) {
            return false;
        } else if(macroItem.calories > 0) {
            return false;
        } else {
            return true;
        }
    }, true)

    console.log("HERE IS THE EMOPTY DATA VAR ", emptyData);

    // console.log(Object.values(parsedData));

    if(emptyData) {
        return (
            <div style={{margin : "10px 0px"}}>
                <div style={{fontSize : "1.15em", fontWeight : "bold", textAlign : "center", width : "100%"}}>Calorie Breakdown</div>
                <div style={{display : "flex", justifyContent : "center", flexDirection : "column" , margin : "10px 0px", padding : "30px 0px", textAlign : "center"}}>
                    <div style={{fontSize : "3em", color : "rgba(0,0,0,.45)"}}>No Data</div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{position : "relative"}}>
                <div style={{position : "absolute", top : "5px", fontSize : "1.15em", fontWeight : "bold", textAlign : "center", width : "100%"}}>Calorie Breakdown</div>
                <div style={{display : "flex", justifyContent : "center", flexDirection : "column" , margin : "10px 0px"}}>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                            data={parsedData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius="75%"
                            fill="#8884d8"
                            dataKey="calories"
                            >
                                {
                                  dataTest.map((entry, index) => <Cell key={`cell-${index}`} fill={colorMap[entry.name]} />)
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <PieLegend />
                </div>
            </div>

        );
    }


}
