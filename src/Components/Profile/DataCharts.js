import React, {useContext} from 'react';
import './Profile.css';
import { BarChart, XAxis, YAxis, Legend, Tooltip, Bar, CartesianGrid, ReferenceLine, Label, Cell, ResponsiveContainer } from 'recharts';
import { UserContext } from '../../context/UserContext';
import CustomLegend from './CustomLegend';

export default function DataCharts({ dataType, data }) {
    console.log("HERE IS THE DATA TYPE AND THE DATA FROM PROPS ");
    console.log(dataType);
    console.log(data);
    console.log("\n", "\n", "\n");

    const parsedData = [];

    // set the context user varibale
    const { user } = useContext(UserContext);

    const calorieGoal = user.calorieGoal;

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


    // find the max value of calorie inputs and assign max value to the max calories + 1000
    const yAxisMax = parsedData.reduce((maxVal, dataObj) => {
        if(dataObj.calories > maxVal) {
            return Math.ceil(dataObj.calories / 500) * 500;
        } else {
            return maxVal;
        }
    }, user.calorieGoal + 500)


    console.log("HERE IS THE PArsed data ", parsedData);

    const successColor = "#2eb82e";
    const failColor = "#b82e2e";

    return(
        <div>
            <div className="chart-cont">
                <ResponsiveContainer width="100%" height={300} >
                    <BarChart data={parsedData} margin={{top : 5, right : 5, bottom : 5, left : 0}} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{fontSize : ".75em"}} />
                        <YAxis domain={[0, yAxisMax]} tick={{fontSize : ".75em"}} width={40} />
                        <Tooltip cursor={false} />

                        <Bar maxBarSize={50} dataKey="calories">
                            {parsedData.map((entry) => (
                                <Cell fill={entry.calories > calorieGoal ? failColor : successColor} />
                            ))}
                        </Bar>
                        <ReferenceLine y={calorieGoal} stroke="#2eb82e" isFront={true} strokeDasharray="5 5" />
                        <Legend content={<CustomLegend />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
