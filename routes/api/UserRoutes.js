const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

let User = require('../../models/User');

// signup route
router.post('/signup', (req, res) => {
    console.log("HERE IN THE SIGNUP ROUTE");
    console.log(req.body);

    // pull out the username and password fields from the body
    const { username, password, password2 } = req.body;

    if(password !== password2) {
        return res.json({failure : "Passwords do not match"});
    } else if (password.length < 5) {
        return res.json({failure : "Password must be at least 5 characters"});
    }

    User.findOne({username : new RegExp(`${username}`, 'i')})
        .then(user => {
            if(user) {
                res.json({failure : "User already exists"});
            } else {
                // create a function for making the user
                const makeUser = async () => {
                    try {
                        // create the salt with bcrypt
                        const salt = await bcrypt.genSalt();
                        // hash the password
                        const hashPassword = await bcrypt.hash(password, salt);
                        // create a new user
                        const newUser = new User({
                            username : username,
                            password : hashPassword,
                        });
                        // save the user
                        await newUser.save();

                        // log the new user in
                        req.login(newUser, (err) => {
                            if(err) {
                                console.log("ERROR ON THE LOGIN FROM SIGNUP ", err);
                            }
                            req.session.save();
                            res.json({success : {
                                    message : `${newUser.username} successfully created}`,
                                    redirect : "/journal",
                                    user : newUser,
                                }
                            });
                        });

                    } catch (err) {
                        console.log(err);
                        res.json({failure : "Failed to make new user"})
                    }
                }

                // call the function
                makeUser();
            }
        })
        .catch(err => console.log(err));
});

// method for local passport login
router.post('/login', (req, res, next) => {
    console.log("In user login passport stuff");
    console.log(req.session);
    console.log("ABOVE IT THE SEESIOM");
    console.log(req.body);

    // call the passport authenticate function
    passport.authenticate('local', (err, user, info) => {
        console.log("AUTHENTICATE PARAMS BELOW");
        console.log(user);
        console.log(info);
        if (err) {
            console.log("Authenticate Error");
            console.log(err);
            return res.json({"error" : err});
        }
        if (!user) {
            console.log("No user in the authenticate");
            return res.json({failure :{"message" : "Error : Invalid Username or Password"}});
        }

        // Login user
        req.logIn(user, (err) => {
            if (err) {
                return res.json({"error":`User ${req.body.username} failed log in`, "message" : err});
            }
            return res.json({success : {
                    message : `Welcome back ${req.body.username}!`,
                    redirect : "/journal",
                    user : user
                }
            });
        });

    })(req, res, next);
});

// used to check if the user is authenticated
router.get('/auth', (req, res) => {
    console.log("IN THE AUTH API CALL");
    console.log(req.user);
    console.log(req.session.passport);
    if(req.user) {
        console.log("THERE IS A USER")
        res.json({auth : req.user});
    } else {
        console.log("THER IS NOT A USER")
        res.json({auth : false});
    }
});


// method for logging out users
router.get('/logout', (req, res, next) => {
    console.log("IN the logout");
    if (req.isAuthenticated()) {
        const username = req.user.username;

        // destroy the session (holds passport.js info of user)
        req.session.destroy();
        res.json({success:`${username} successfully logged out`, "redirect" : "/"});
    } else {
        res.json({"error":"there is no user logged in atm"});
    }

});

// method for updating the user calorie goal
router.post('/calorieGoal', (req, res) => {
    console.log("In the calorie goal route ");
    console.log(req.user);
    console.log(req.body);

    const calorieGoal = Number(req.body.calorieGoal);

    if(calorieGoal <= 0) {
        return res.json({failure : {message : "Calorie Goal Must be Positive"}})
    }

    console.log("HERE IS THE CALOREIR GOAAL VALEU ", calorieGoal);

    // find the user
    User.findOne({_id : req.user._id})
        .then(user => {
            console.log(user);
            // if not valid user return an error message
            if(!user) {
                return res.json({failure : {
                    message : "User Error : Try to logout then log back in",
                    }
                })
            }

            // change the user's calorie goal
            user.calorieGoal = calorieGoal;

            // save the updated user
            user.save(err => {
                if(err) {
                    return res.json({failure : {message : "Error : Problem when saving new calorie goal"}})
                }
                return res.json({success : {
                    message : "Success : Saved Calorie Goal",
                    user : user,
                }})
            })
        })
        .catch(err => console.log(err));
})

module.exports = router;
