const express = require('express');
const mongoose = require('mongoose');
const params = require('./config/params');

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

// Connect to DB
mongoose.connect(`${params.db.url}`, { useNewUrlParser : true }, (err) =>
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
