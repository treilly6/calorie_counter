

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
}
