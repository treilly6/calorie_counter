import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const dataTest = [
    { name : "fats", calories : 300, "% cals" : "30%" },
    { name : "carbs", calories : 500,"% cals" : "50%"},
    { name : "protein", calories : 200,"% cals" : "20%"}
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
        <div style={{display : "flex", justifyContent : "center"}}>
            <PieChart width={400} height={400} >
                <Pie
                data={dataTest}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="calories"
                >
                    {
                      dataTest.map((entry, index) => <Cell key={`cell-${index}`} fill={colorMap[entry.name]} />)
                    }
                </Pie>
            </PieChart>
        </div>
    );

}
