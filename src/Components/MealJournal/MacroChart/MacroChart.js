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

export default function MacroChart() {

    return (
        <div style={{position : "relative"}}>
            <div style={{position : "absolute", top : "5px", fontSize : "1.15em", fontWeight : "bold", textAlign : "center", width : "100%"}}>Calorie Breakdown</div>
            <div style={{display : "flex", justifyContent : "center", flexDirection : "column" , margin : "10px 0px"}}>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                        data={dataTest}
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
