const express = require('express');
const mongoose = require('mongoose');
const params = require('./config/params');
const passport = require('passport');
const session = require('express-session');

const app = express();

// require the passport config and pass in the passport variable
// that is imported above
require('./config/passport')(passport);

// body parser
app.use(express.json());

// express session
app.use(session({
    secret : "secret",
    resave : true,
    saveUninitialized : true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// api Route files
const UserRoutes = require('./routes/api/UserRoutes');
const FoodRoutes = require('./routes/api/FoodRoutes');

// define the api routes
app.use('/api/user', UserRoutes);
app.use('/api/foodItems', FoodRoutes);

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
