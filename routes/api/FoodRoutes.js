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

    const weekDate = tools.dateChange(currentDate, -7);
    const twoWeekDate = tools.dateChange(currentDate, -14);
    const monthDate = tools.dateChange(currentDate, -30);

    console.log("HERE ARE ALL THE DATES ");
    console.log(currentDate);
    console.log(weekDate);
    console.log(twoWeekDate);
    console.log(monthDate);

    // function that will group the meals by the date they were entered
    // used to find the total calories for specific dates
    const groupByDate = (mealArray) => {
        return mealArray.reduce((map, mealItem) => {
            console.log(mealItem.date);
            console.log(map);
            console.log("above is map");
            console.log(mealItem);
            console.log(tools.convertDateForCharts(mealItem.date));
            const chartDate = tools.convertDateForCharts(mealItem.date);
            if(chartDate in map) {
                console.log("Key is in the map");
                map[chartDate].calories += Number(mealItem.calories);
            } else {
                console.log("key is not in the map");
                map[chartDate] = {};
                map[chartDate].date = chartDate;
                map[chartDate].calories = Number(mealItem.calories);
            }
            return map;
        }, {});
    }

    // find all the users meal info
    Meal.find({
        username : username,
    })
    .then(meals => {
        console.log("HERE ARE THE MEALS");
        console.log(meals);

        // make the food Data object which holds the meals based on their mealtype
        const mealData = {
            today : groupByDate(meals.filter(meal => tools.dateChecker(meal.date, currentDate))),
            week : groupByDate(meals.filter(meal => tools.dateRangeChecker(weekDate, currentDate, meal.date))),
            twoWeek : groupByDate(meals.filter(meal => tools.dateRangeChecker(twoWeekDate, currentDate, meal.date))),
            month : groupByDate(meals.filter(meal => tools.dateRangeChecker(monthDate, currentDate, meal.date))),
            calendar : meals,
        };

        console.log("HERE IS THE TODAY RESULT IN THE MEAL DATA");
        console.log(mealData.today);



        console.log("HERE IS THE TEST MAP CONST");

        console.log("HERE THE ABOUT TO RETUrN THING");

        return res.json({success : mealData});
    })
    .catch(err => console.log(err));

})

module.exports = router;
