import React, {useEffect, useState} from 'react';
import CalendarInput from '../Calendar/CalendarInput';
import APISearch from '../Search/APISearch';
import MealTable from './MealTypes/MealTable';

export default function JournalHome() {

    // i want to figure out how to get the intial calandar date from the Calandar input on first render
    const [journalDate, setJournalDate] = useState(null);

    const getDate = (date) => {
        console.log("HERE IS THE DATE IN THE JOURNAL HOME ", date);
        setJournalDate(date);
    }

    return (
        <div>
            <h1>JOURNAL HOME</h1>
            <CalendarInput sendDateToParent={getDate}/>
            <MealTable mealDate={journalDate} mealType="Breakfast" />
            <MealTable mealDate={journalDate} mealType="Lunch"/>
            <MealTable mealDate={journalDate} mealType="Dinner"/>
            <MealTable mealDate={journalDate} mealType="Snacks"/>
        </div>
    )
}
