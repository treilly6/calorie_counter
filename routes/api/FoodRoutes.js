const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var tools = require('../../tools/dateTools');

let Meal = require('../../models/Meal');

// used to get the users food data based on the given date
router.get('/', (req,res) => {

    // call tools date function to convert the query date to a midnight UTC date
    const utcDate = tools.stringToMidnightUTC(req.query.date);

    console.log("HERE THE JOURNAL DATE RIGHT AFTER THE QUERY  NEW DA?TE ", req.query.date);
    console.log("HERET HE HOPEFULLY MIDNIGHT SHIT IF THE QUERY ", utcDate);

    // get the username
    const username = req.user.username;

    Meal.find({
        username : username,
        date : utcDate,
    })
    .then(meals => {
        console.log("HERE ARE THE MEALS");
        console.log(meals);

        // make the food Data object which holds the meals based on their mealtype
        const mealData = {
            breakfast : meals.filter(meal => meal.mealType === "breakfast"),
            lunch : meals.filter(meal => meal.mealType === "lunch"),
            dinner : meals.filter(meal => meal.mealType === "dinner"),
            snacks : meals.filter(meal => meal.mealType === "snacks")
        };

        res.json({success : mealData});
    })
    .catch(err => console.log(err));
});

// route used to post a new meal item
router.post('/newItem', (req,res) => {
    console.log("IN THE POST NEW ITEM");

    // pull out all varibales needed to make new meal object
    const { username, foodName, servings, calories, fat, carbs, protein, journalDate, mealType } = req.body;

    console.log("HERE IS THE JOURNAL DATE ON THE BACKEND ");
    console.log(journalDate, typeof(journalDate));

    // call tools date function to convert the query date to a midnight UTC date
    const utcDate = tools.stringToMidnightUTC(journalDate);

    console.log("HERE IS THE STUFF THAT WILL BE SAVED");
    console.log(username, foodName, servings, calories, fat, carbs, protein, utcDate, mealType);

    // make the new meal object and save it
    new Meal({
        username,
        foodName,
        servings,
        calories,
        fat,
        carbs,
        protein,
        date : utcDate,
        mealType,
    })
    // save the new meal
    .save()
        .then(meal => {
            console.log("HERE IS THE MEAL ");
            console.log(meal);
            res.json({success : meal});
        })
        .catch(err => console.log(err));
});

// used to get all the user's meal data for the profile page
router.get('/allData' , (req, res) => {
    console.log("IN THE ALL DATA FUNCTION");
    console.log(req.user);
    console.log(req.query);


    // call tools date function to convert the query date to a midnight UTC date
    // const utcDate = tools.stringToMidnightUTC(req.query.date);

    // console.log("HERE IS THE UTC DATE");
    // console.log(utcDate);

    // set the username varibale
    const username = req.user.username;

    // pull out the client year, month, and day from the query params
    const { year, month, day } = req.query;

    console.log("HERE TEH PARAMS AND SHIT ");
    console.log(year, month, day);

    console.log("HERE IS THE CONTRUCTED DATE");
    const currentDate = new Date(Date.UTC(year, month, day));
    console.log(currentDate);
    console.log("END OF THE IMPORTANT STUFF");

    const weekDate = tools.dateChange(currentDate, -6);
    const twoWeekDate = tools.dateChange(currentDate, -13);
    const monthDate = tools.dateChange(currentDate, -29);


    // function that will group the meals by the date they were entered
    // used to find the total calories for specific dates
    const groupByDate = (mealArray, intialDict) => {
        return mealArray.reduce((map, mealItem) => {
            console.log(mealItem.date);
            console.log(map);
            console.log("above is map");
            console.log(mealItem);
            console.log(tools.convertDateForCharts(mealItem.date));
            const chartDate = tools.convertDateForCharts(mealItem.date);
            if(chartDate in map) {
                if(map[chartDate].date && map[chartDate].calories) {
                    console.log("everything in the map is there");
                    map[chartDate].calories += Number(mealItem.calories);
                } else {
                    console.log("INITIALIZING THE DICT VALUES");
                    map[chartDate].date = chartDate;
                    map[chartDate].calories = Number(mealItem.calories);
                }
            }
            return map;
        }, intialDict);
    }

    // used to group the data for the calendar
    // for calendar date must be yyyy/mm/dd format
    const CalendarGroup = (mealArray) => {
        return mealArray.reduce((map, mealItem) => {
            const dateKey = tools.convertDateForCalendar(mealItem.date);
            if(dateKey in map) {
                // increment the calories
                map[dateKey].value += Number(mealItem.calories);
            } else {
                // init the obj for the dateKey
                map[dateKey] = {};
                // set the date
                map[dateKey].day = dateKey;
                // set the calories
                map[dateKey].value = Number(mealItem.calories);
            }
            return map;
        }, {})
    }

    // takes a date dict and averages the daily calorie intake over the given timeFrame
    const avgCalories = (dateDict, timeFrame) => {
        const totalMap = Object.keys(dateDict).reduce((map, dateKey) => {
            if(dateDict[dateKey].calories > 0) {
                // add the days calories to the total
                map.totalCals += dateDict[dateKey].calories;
                // increment the number of days
                map.totalDays++;
            }
            return map;
        }, {totalCals : 0, totalDays : 0});

        // if total days is not zero return avg cals
        if(totalMap.totalDays > 0) {
            return {
                date : timeFrame,
                calories : totalMap.totalCals / totalMap.totalDays,
            }
        } else {
            // return dict with avg at 0
            return {date : timeFrame, calories : 0};
        }
    }

    const makeDateDict = (startDate, endDate, initParams=[]) => {
        // function returns a dictionary where the keys are all dates between (inclusive) the startDate and the endDate
        // and the values for those keys are empty dictionaries

        // the initParams argument is optional and if supplied must be a list of lists [[key1, value1], [key2, value2], ...]. Function will add each key value pair to each date key


        // init the date Dict that will be returned
        const dateDict = {};

        // init a sameDay to false for the while loop
        var sameDay = false;

        // create a copy of the start date
        var arrayDate = new Date(startDate);

        // while not same Day
        while(!sameDay) {

            // get the chart date format "mm/dd"
            var chartDate = tools.convertDateForCharts(arrayDate);

            // add chart date as a key to the dictionary
            dateDict[chartDate] = {};

            // if initial params were supplied add them to the dateDict[chartDate]
            if(initParams.length > 0) {
                for (params of initParams) {
                    // if date should also be a sub key
                    if(params[0] === "date") {
                        // add the chart dict to the date key
                        dateDict[chartDate]["date"] = chartDate;
                    } else {
                        // add the key value pair to the date Dict
                        dateDict[chartDate][params[0]] = params[1];
                    }
                }
            }

            // if the end date is null or the dates are the same
            if(endDate === null || tools.dateChecker(arrayDate, endDate)) {
                // change the same day variable thus breaking out of the whiel loop
                sameDay = true;
            } else {
                // make the array date equal to the next day
                arrayDate = tools.dateChange(arrayDate, 1);
            }
        }

        // return the date dict
        return dateDict;
    }

    const dayDict = makeDateDict(currentDate, null, [["date", ""],["calories", 0]]);
    const weekDict = makeDateDict(weekDate, currentDate, [["date", ""],["calories", 0]]);
    const twoWeekDict = makeDateDict(twoWeekDate, currentDate, [["date", ""],["calories", 0]]);
    const monthDict = makeDateDict(monthDate, currentDate, [["date", ""],["calories", 0]]);

    // find all the users meal info
    Meal.find({
        username : username,
    })
    .then(meals => {
        console.log("HERE ARE THE MEALS");
        console.log(meals);

        // make the food Data object which holds the meals based on certain time frames and groups by date within each time fram
        const mealData = {
            today : groupByDate(meals.filter(meal => tools.dateChecker(meal.date, currentDate)), dayDict),
            week : groupByDate(meals.filter(meal => tools.dateRangeChecker(weekDate, currentDate, meal.date)), weekDict),
            twoWeek : avgCalories(groupByDate(meals.filter(meal => tools.dateRangeChecker(twoWeekDate, currentDate, meal.date)), twoWeekDict), "2 Week Avg."),
            month : avgCalories(groupByDate(meals.filter(meal => tools.dateRangeChecker(monthDate, currentDate, meal.date)), monthDict), "Past Month Avg."),
            calendar : CalendarGroup(meals),
        };

        // get the avaerage for the week
        const weekAvg = avgCalories(mealData.week, "Avg.");

        // add the week avaergae into the weekly data object
        mealData.week["avg"] = weekAvg;

        return res.json({success : mealData});
    })
    .catch(err => console.log(err));

})

module.exports = router;
