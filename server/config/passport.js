//load all the things we need
var LocalStrategy = require('passport-local').Strategy;
//load up the user model
var User = require('../models/user');

//expose this function to our app using module.exports
module.exports = function(passport) {
    //passport session setup
    //required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of session

    //used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //used to deserialize the user
    passport.deserializeUser(function(id, done) {
        new User({id: id}).fetch().then(function(err, user) {
            done(null, id);
        });
    });

    //LINKEDIN SIGNUP

}