import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import '../../App.css';

export default function MaterialUIPickers({ sendDateToParent, journalDate }) {

    // set the dateObj
    const dateObj = (journalDate ? new Date(journalDate) : new Date());

    // assing the dateObj to the state
    const [selectedDate, setSelectedDate] = React.useState(dateObj);


    // ge the new date and send it to parent (JounralHome.js)
    const handleDateChange = (date) => {
        console.log("HERE THE DATE IN THE HANDLE CHANGE FUNC ", date, typeof(date));
        setSelectedDate(date);
        console.log("HERE DATE IN THE CALEDNAR BEFORE SEDN", "\n", "\n", "\n", date);
        sendDateToParent(date);
    };

    return (
        <div className="calendar-cont">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Choose Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}
