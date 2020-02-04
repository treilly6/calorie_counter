import React, {useEffect, useState} from 'react';
import CalendarInput from '../Calendar/CalendarInput';
import APISearch from '../Search/APISearch';
import MealTable from './MealTypes/MealTable';
import CalorieCounter from '../CalorieCounter/CalorieCounter';
import axios from 'axios';
import './JournalHome.css';

export default function JournalHome(props) {

    console.log("HERE THE JOURNAL HOME PROPS ", props);

    // props.location.state will have a redirectDate value when a user saves
    // meal data on the FoodItem.js page and it redirects back to the journalHome
    // this will maintain a consistency with the date so users could add multiple meal items
    // for the same date relatively quickly
    // If there is not redirectDate value then set the dateObj to the current date
    const dateObj = (props.location.state && props.location.state.redirectDate ? new Date(props.location.state.redirectDate) : new Date())

    const [journalDate, setJournalDate] = useState(dateObj);

    const getDate = (date) => {
        console.log("HERE IS THE DATE IN THE JOURNAL HOME ", date);
        setJournalDate(date);

        // want an api call when the date changes to get the proper data for that days meals and calories
        axios.get('/api/foodItems' , {params : {date : journalDate}})
            .then(res => {
                console.log("HERE THE API FOOD ITEMS ");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="journal-main-cont">
            <CalendarInput sendDateToParent={getDate} journalDate={journalDate} />
            <CalorieCounter />
            <MealTable journalDate={journalDate} mealType="Breakfast" />
            <MealTable journalDate={journalDate} mealType="Lunch"/>
            <MealTable journalDate={journalDate} mealType="Dinner"/>
            <MealTable journalDate={journalDate} mealType="Snacks"/>
        </div>
    )
}
