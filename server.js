const express = require('express');

const app = express();

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

    res.json({foodData});
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port ${5000}`);
});
