

module.exports = {
    stringToMidnightUTC : (stringDate) => {
        // make the sting into a date object
        const date = new Date(stringDate);

        // get the month day and year of the date
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        // make another object which is UTC midnight of the given query date
        const utcDate = new Date(Date.UTC(year, month, day));

        // return the utcDate
        return utcDate;
    },
    dateChange : (baseDate, dayChange) => {
        // copy the base date
        const copyDate = new Date(baseDate);

        // make a new date that factors in the dayChange difference
        const diffDate = new Date(copyDate.setDate(copyDate.getDate() + dayChange));

        // return the diffDate
        return diffDate;
    },

    // check if the two dates are exactly equal
    dateChecker : (date1, date2) => {
        // return true if same year month and day, false otherwise
        return (
            (date1.getFullYear() === date2.getFullYear()) &&
            (date1.getMonth() === date2.getMonth()) &&
            (date1.getDate() === date2.getDate())
        )

    },

    // check if the dateToCheck is between date1 and date2
    dateRangeChecker : (date1, date2, dateToCheck) => {
        const lowerDate = (date1 <= date2 ? date1 : date2);
        const upperDate = (date1 <= date2 ? date2 : date1);

        return(lowerDate <= dateToCheck && dateToCheck <= upperDate)
    }
}
