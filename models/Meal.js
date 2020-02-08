const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
    username : String,
    foodName : String,
    mealType : String,
    servings : String,
    calories : String,
    fat : String,
    carbs : String,
    protein : String,
    date : Date,
});

module.exports = mongoose.model("Meal", MealSchema);
