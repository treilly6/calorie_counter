const express = require('express');
const mongoose = require('mongoose');

const app = express();

// get the food data based on the date
app.get('/api/foodItems', (req,res) => {
    const foodData = [
        {
            name : "Peanut Butter",
            calories : 180,
            carbs : 13,
            fat : 18,
            protein : 9,
        }
    ];

    // would like the return to be soemthing like
    // foodData = {
    //      breakfast : [{foodDataItem}],
    //      lunch : [{foodDataItem}],
    //      dinner : [{foodDataItem}],
    //      snacks : [{foodDataItem}],
// }

    res.json({foodData});
})

// db connection variable
// DB_CONNECTION=mongodb://bug_admin:8Li7vX2@localhost:27017/bugdb


// Connect to DB
mongoose.connect(`mongodb://calorie_admin:72mHf9qXy@localhost:27017/caloriedb`, { useNewUrlParser : true }, (err) =>
    {
        if (err) {
            console.log("ERROR IN DB CONNETION");
            console.log(err);
        } else {
            console.log("SUCCESSSUFL DB CONNECTION");
        }
    }
);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port ${5000}`);
});
