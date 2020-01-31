import React, {useEffect} from 'react';
import CalendarInput from '../Calendar/CalendarInput';
import APISearch from '../Search/APISearch';

export default function JournalHome() {

    const getDate = (date) => {
        console.log("HERE IS THE DATE IN THE JOURNAL HOME ", date);

    }
    return(
        <div>
            <h1>JOURNAL HOME</h1>
            <CalendarInput sendDateToParent={getDate}/>
            <APISearch />
        </div>
    )
}
