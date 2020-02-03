const express = require('express');

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

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port ${5000}`);
});
