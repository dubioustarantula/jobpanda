//load all the things we need
var LinkedInStrategy = require('passport-linkedin').Strategy;
//load up the user model
var User = require('../models/user.js');

//load the auth variables
var configAuth = require('./authorization.js');


//expose this function to our app using module.exports
module.exports = function(passport) {
    //passport session setup
    //required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of session

    //used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializing user');
        done(null, user.id);
    });

    //used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('deserializing user');
        new User({'linkedin_id': id}).fetch().then(function(user) {
            done(null, user);
        });
    });

    console.log('consumerKey', configAuth.linkedinAuth.consumerKey);
    console.log('consumerSecret', configAuth.linkedinAuth.consumerSecret);
    console.log('callbackURL', configAuth.linkedinAuth.callbackURL);

    //LINKEDIN SIGNUP
    passport.use(new LinkedInStrategy({
        //pull in our app id and secret from our settings.json file
        consumerKey: configAuth.linkedinAuth.consumerKey,
        consumerSecret: configAuth.linkedinAuth.consumerSecret,
        callbackURL: configAuth.linkedinAuth.callbackURL,
        scope: ['r_basicprofile', 'r_emailaddress'],
        passReqToCallback: true //allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    
    //linkedin will send back the token and profile
    function callback(req, token, tokenSecret, profile, done) {
        console.log("HEYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
        console.log('\ntoken', token);
        console.log('\ntokenSecret', tokenSecret);
        console.log('\nprofile', profile);
        console.log('\ndone', done);
        console.log(profile.email_address);
        console.log(profile.emails);
        //asynchronous
        //new User won't fire until we have all our data back from Linkedin
        process.nextTick(function() {
            //find the user in the database based on their linkedin id
            new User({'linkedin_id' : profile.id}).fetch().then(function(user) {
                //if there is an error, stop everything and return that
                //ie an error connecting to the database
                // if(err) {
                //     return done(err);

                //if the user is found, then log them in
                if(user) {
                    console.log('i am already a user');
                    done(null, user); //user found, return that user
                } else {

                    var newUser = {
                      linkedin_id: profile.id,
                      token: token,
                      first_name: profile.name.givenName,
                      last_name: profile.name.familyName
                    }

                    new User(newUser).save().then(function(model){
                      console.log("WE DID IT")
                      console.log(model);
                      done();
                    })

                    //if there is no user found with that linkedin id, create them
                    // var newUser = new User();

                    //set all of the linkedin information in our user model
                    // newUser.linkedin_id = profile.id; //set the user's linkedin id
                    // newUser.token = token; //we will save the token that linkedin provides to the user
                    // newUser.first_name = profile.name.givenName;
                    // newUser.last_name = profile.name.familyName; //look at the passport user profile to see how names are returned
                    //newUser.email = profile.emails[0].value; //facebook can return multiple emails so we'll take the first

                    //save our user to the database
                    // console.log('newUser', newUser);

                    // newUser.save(function(err, data){
                    //   console.log(err, data);
                    //   done();
                    // })
                    // newUser.save().then(function(newUser) {
                    //   console.log('further still');
                    //     // if (err)
                    //     //     throw err;

                    //     //if successful, return the new user
                    //     done(null, newUser);
                    // });
                    // newUser.save().then(function(newUser) {
                    //    console.log('newUser');
                    //    done();
                    // });
                    // done();
                    // console.log('we here');
                }
                });
        });
    }));
};
