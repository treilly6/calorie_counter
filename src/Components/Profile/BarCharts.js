import React, {useContext} from 'react';
import './Profile.css';
import { BarChart, XAxis, YAxis, Legend, Tooltip, Bar, CartesianGrid, ReferenceLine, Label, Cell, ResponsiveContainer } from 'recharts';
import { UserContext } from '../../context/UserContext';
import CustomLegend from './CustomLegend';


const BarCharts = ({ dataType, data }) => {

    console.log("plz help bar graphs ");
    console.log(dataType);
    console.log(data);
    console.log("\n", "\n", "\n");

    // set the context user varibale
    const { user } = useContext(UserContext);

    const calorieGoal = user.calorieGoal;

    // if there is no data or dataType return null
    if(dataType === undefined || data === null) {
        return null
    }

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


    // if(dataType === "today" || dataType === "week") {
    //     if(data && Object.keys(data).length > 0) {
    //         console.log("GOING INTO THE FOR EACH");
    //         Object.keys(data).forEach((objKey) => {
    //             console.log("HERE IS THE OBJ KEY ", objKey)
    //             parsedData.push(data[objKey]);
    //         });
    //     }
    // } else {
    //     parsedData.push(data);
    // }

    // set the parsedData variable
    // parsed data is just the values of the incoming data object
    var parsedData = [];

    // if the data is not null
    if(data) {
        // if the data type is today or week set the parsed data to the object values
        if((dataType === "today" || dataType === "week") && Object.keys(data).length > 0) {
            parsedData = Object.values(data);
        // set the parsed data to the data (this is for if dataType is twoWeek or month)
        } else {
            console.log("INT THE ELSE FOR PARSED DATA HERE IS THE DATA ");
            console.log(data);
            parsedData.push(data);
        }
    }


    // if((dataType === "today" || dataType === "week") && (data && Object.keys(data).length > 0)) {
    //     parsedData = Object.values(data);
    // } else if(data)
    //
    // const parsedData = ((data && Object.keys(data).length > 0) ? Object.values(data) : []);


    // find the max value of calorie inputs and assign max value to the max calories + 1000
    const yAxisMax = parsedData.reduce((maxVal, dataObj) => {
        if(dataObj.calories > maxVal) {
            return Math.ceil(dataObj.calories / 500) * 500;
        } else {
            return maxVal;
        }
    }, user.calorieGoal + 500)

    const emptyData = parsedData.reduce((emptyData, data) => {
        if(!emptyData || data.calories > 0) {
            return false
        } else {
            return true
        }
    }, true)


    console.log("HERE IS THE PArsed data ", parsedData);

    const successColor = "#2eb82e";
    const failColor = "#b82e2e";


    if(emptyData) {
        return (
            <div className="chart-cont">
                <div style={{margin : "10px 0px"}}>
                    <div style={{display : "flex", justifyContent : "center", flexDirection : "column" , margin : "10px 0px", padding : "30px 0px", textAlign : "center"}}>
                        <div style={{fontSize : "3em", color : "rgba(0,0,0,.45)"}}>No Data</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
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
        )
    }

}

export default BarCharts;
