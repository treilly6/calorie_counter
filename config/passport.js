const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'username'}, (username, password, done) => {
            // match the user
            User.findOne({username : username})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message : "Invalid Username"})
                    }
                })
                .catch(err => console.log(err))

            // check the passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    throw err;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message : "Incorrect Password"});
                }
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            });
    });
}
