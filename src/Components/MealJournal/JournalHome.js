import React, {useEffect, useState} from 'react';
import CalendarInput from '../Calendar/CalendarInput';
import APISearch from '../Search/APISearch';
import MealTable from './MealTypes/MealTable';
import CalorieCounter from '../CalorieCounter/CalorieCounter';
import MacroChart from './MacroChart/MacroChart';
import axios from 'axios';
import './JournalHome.css';

export default function JournalHome(props) {

    console.log("HERE THE JOURNAL HOME PROPS ", props);

    const [journalDate, setJournalDate] = useState(null);
    // const [params, setParams] = useState(false);
    const [foodData, setFoodData] = useState({
        breakfast : [],
        lunch : [],
        dinner : [],
        snacks : [],
    });

    // // state variable that holds cumulative calorie by macor info
    // // this is passed to the pie chart for rendering
    // const [calorieData, setCalorieData] = useState([]);


    // props.location.state will have a redirectDate value when a user saves
    // meal data on the FoodItem.js page and it redirects back to the journalHome
    // this will maintain a consistency with the date so users could add multiple meal items
    // for the same date relatively quickly
    // If there is not redirectDate value then set the dateObj to the current date

    // inital render set the state for the journal date
    useEffect(() => {
        console.log("USE EFFECT IN JOURNAL HOME ");
        const dateObj = (props.location.state && props.location.state.redirectDate ? new Date(props.location.state.redirectDate) : new Date());
        setJournalDate(dateObj);
    }, []);

    useEffect(() => {
        console.log("USE EFFECT FOR SENDING THE AXIOS TO FOOD ITEMS ")
        console.log("HERET HE JDATE , " , journalDate);

        // if no date return
        if(journalDate === null) {
            return
        }

        // want an api call when the date changes to get the proper data for that days meals and calories
        axios.get('/api/foodItems' , {params : {date : journalDate}})
            .then(res => {
                console.log("HERE THE API FOOD ITEMS ");
                console.log(res);
                if(res.data.success) {
                    // set the foodData to the retrieved data
                    setFoodData(res.data.success);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, [journalDate])

    const getDate = (date) => {
        console.log("HERE IS THE DATE IN THE JOURNAL HOME ", date);
        console.log("HERE THE JDATE BEFOER STATE CHANGE ", journalDate);
        setJournalDate(date);
    }


    console.log("BEFORE THE FIRST RENDER ");
    console.log(journalDate);
    console.log(foodData);
    console.log("\n","\n","\n","\n","\n","\n","\n","\n")
    return (
        <div className="journal-main-cont">
            <CalendarInput sendDateToParent={getDate} journalDate={journalDate} />
            <CalorieCounter foodData={foodData} />
            <MacroChart data={foodData} />
            <MealTable journalDate={journalDate} mealType="Breakfast" foodData={foodData.breakfast} />
            <MealTable journalDate={journalDate} mealType="Lunch" foodData={foodData.lunch} />
            <MealTable journalDate={journalDate} mealType="Dinner" foodData={foodData.dinner} />
            <MealTable journalDate={journalDate} mealType="Snacks" foodData={foodData.snacks} />
        </div>
    )
}
