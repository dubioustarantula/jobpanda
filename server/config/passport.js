//load all the things we need
var LinkedinStrategy = require('passport-linkedin').Strategy;
//load up the user model
var User = require('../models/user');

//load the auth variables
var configAuth = require('./authorization.js');


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
        new User({id: id}).fetch().then(function(user) {
            done(null, user);
        });
    });

    //LINKEDIN SIGNUP
    passport.use(new LinkedinStrategy({
        //pull in our app id and secret from our settings.json file
        consumerKey      : configAuth.linkedinAuth.consumerKey,
        consumerSecret  : configAuth.linkedinAuth.consumerSecret,
        callbackURL   : configAuth.linkedinAuth.callbackURL,
        passReqToCallback: true //allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },

    //linkedin will send back the token and profile
    function callback(req, token, tokenSecret, profile, done) {
        //asynchronous
        //new User won't fire until we have all our data back from Linkedin
        process.nextTick(function() {
            //find the user in the database based on their linkedin id
            new User({'id' : profile.id}).fetch().then(function(user) {
                //if there is an error, stop everything and return that
                //ie an error connecting to the database
                // if(err) {
                //     return done(err);

                //if the user is found, then log them in
                if(user) {
                    done(null, user); //user found, return that user
                } else {
                    //if there is no user found with that linkedin id, create them
                    var newUser = new User();

                    //set all of the linkedin information in our user model
                    newUser.id = profile.id; //set the user's linkedin id
                    newUser.token = token; //we will save the token that linkedin provides to the user
                    newUser.first_name = profile.name.givenName;
                    newUser.last_name = profile.name.familyName; //look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; //facebook can return multiple emails so we'll take the first

                    //save our user to the database
                    newUser.save().then(function(newUser) {
                        // if (err)
                        //     throw err;

                        //if successful, return the new user
                        return done(null, newUser);
                    });
                }
                });
        });
    }));
}
