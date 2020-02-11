const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : { type : String},
    name : { type : String},
    password : {
        type : String,
    },
    calorieGoal : {
        type : Number,
        default : 2000,
    }
});

module.exports = mongoose.model("User", UserSchema);
