import React, { useContext, useState, useEffect } from 'react';
import DataCharts from './DataCharts';
import { UserContext } from '../../context/UserContext';
import './Profile.css';
import axios from 'axios';


export default function Profile() {
    // get the user from the context
    const { user } = useContext(UserContext);

    // dataType used to ttackl which type of data is selected (i.e today, 7D, 14D, 30D, calendar)
    const [dataType, setDataType] = useState("today");

    // selectedData is the data related to the dataType
    const [selectedData, setSelectedData] = useState(null);

    // allData is all the user data grouped into sections of the dataTypes
    const [allData, setAllData] = useState(null);

    // used to control the render
    const [dataFetched, setDataFetched] = useState(false);

    // useEffect that will only run on the initial render (get all the user's meal data)
    useEffect(() => {
        const clientDate = new Date();

        const day = clientDate.getDate();
        const month = clientDate.getMonth();
        const year = clientDate.getFullYear();

        console.log("HERE IS THE CLIENT DATE VERY IMPORTANt ", clientDate, "\n", "\n", "\n","\n","\n","\n");

        const dateObj = {
            day,
            month,
            year
        };

        console.log("HERE CATE OBJ A");
        console.log(dateObj);

        axios.get('/api/foodItems/allData', {params : dateObj})
            .then(res => {
                console.log("HERE IS THE RES");
                console.log(res);
                setDataFetched(true);
                setAllData(res.data.success);
                setSelectedData(res.data.success[dataType]);
            })
            .catch(err => console.log(err));
    }, [])


    const dataClick = (val) => {
        if(val === dataType) {
            console.log("SAME DATA TYPE DONT DO ANYTHING");
            return
        } else {
            // change the selected Data to the proper type
            console.log("Gonna update the selected data")
            setDataType(val);
            console.log("HERE THE VAL AND THE ALL DAYA ", val, allData, "\n", "\n", "\n");
            setSelectedData(allData[val]);
        }
    }

    if(dataFetched) {
        return (
            <div className="profile-cont">
                <div className="profile-header">{user.username}'s Statistics</div>
                <div className="select-data-header">
                    <div className={"data-header-item " + (dataType === "today" ? "selected" : "")} onClick={() => dataClick("today")}>Today</div>
                    <div className={"data-header-item " + (dataType === "week" ? "selected" : "")} onClick={() => dataClick("week")}>7D</div>
                    <div className={"data-header-item " + (dataType === "twoWeek" ? "selected" : "")} onClick={() => dataClick("twoWeek")}>14D</div>
                    <div className={"data-header-item " + (dataType === "month" ? "selected" : "")} onClick={() => dataClick("month")}>30D</div>
                    <div className={"data-header-item " + (dataType === "calendar" ? "selected" : "")} onClick={() => dataClick("calendar")}>Calendar</div>
                </div>
                <DataCharts dataType={dataType} data={selectedData} />
            </div>
        )
    } else {
        return null;
    }

}
