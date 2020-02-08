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
})

module.exports = router;
