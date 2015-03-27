/*==================== REQUIRE DEPENDENCIES ====================*/
var express           = require('express'),
    session           = require('express-session'),
    bodyParser        = require('body-parser'),
    passport          = require('passport'),
    // LinkedInStrategy = require('passport-linkedin').Strategy,
<<<<<<< HEAD
    User             = require('./models/user.js'),
    ListingController= require('./controllers/listingController.js')
    http             = require('http');
=======
    User              = require('./models/user.js'),
    ListingController = require('./controllers/listingController.js')
    http              = require('http');
>>>>>>> master

/*===================== INITIALIZE EXPRESS =====================*/
var app = express();
app.use(bodyParser());


/*================= CONFIGURE PASSPORT/LINKEDIN ================*/
app.use(session({ secret: "DECEITFUL PANDA IS THE WEB FOR YOUR JOB COB"}));
// app.use(passport.initialize());
// app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });


// passport.use(new LinkedInStrategy({
//   consumerKey: process.env.LINKEDIN_API_KEY || 'DUMMY',
//   consumerSecret: process.env.LINKEDIN_SECRET_KEY || 'DUMMY',
//   callbackURL: process.env.AUTH_CALLBACK_URL || 'DUMMY'
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ linkedinId: profile.id}, function(err, user) {
//       return done(err, user);
//     });
//   }
//   ));

/*===================== INITIALIZE ROUTERS =====================*/
// Not currently in use for CORS and session compatibility
// var userRouter = express.Router();
// var listingRouter = express.Router();

/*================== CONFIGURE EXPRESS MODULES =================*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log(__dirname);

/*===================== SET EXPRESS ROUTES =====================*/
// app.use('/api/users', userRouter);

app.post('/api/users/signup', function(req, res, next){
  //create new user session and database entry if username does not already exist
  var latest = req.body;
<<<<<<< HEAD
  new User({username: req.body.username}).fetch()
=======
  new User({user_name: req.body.username}).fetch()
>>>>>>> master
    .then(function(foundUser){
      if (!foundUser){
        new User({
          user_name: latest.username, 
          password: latest.password,
          email: latest.email,
          first_name: latest.firstname,
          last_name: latest.lastname,
          token: latest.token
        }).save().then(function(newUser){
          req.session.regenerate(function() {
            req.session.user = newUser;
            res.redirect('/');
          });
        });
      } else {
        res.send(418, 'User already exists!');
      }
    });
});

app.post('/api/users/login', function(req, res, next){
  //check username and password to log in
  var username = req.body.username;
  var password = req.body.password;
  new User({user_name: username}).fetch().then(function(user){
    if( !user ){
      res.redirect('/');
    } else {
      user.comparePassword(password, function(match){
        if(match) {
          req.session.regenerate(function() {
            req.session.user = newUser;
            res.redirect('/');
          });
        } else {
          res.redirect('/')
        }
      });
    };
  });
});

app.get('/api/users/logout', function(req, res, next){
  //delete session on logout
  req.session.destroy(function(){
    res.redirect('/');
  });
});

//app.use('/api/listings', listingRouter);

app.get('/api/users/checkbookmarklet', function(req, res, next){
  //check user session to let bookmarklet know if logged in or not
  var response = {};
  response.isAuthenticated = false;
  var loggedIn = req.session ? !!req.session.user : false;
  if (!loggedIn){
    res.send(response);
  } else {
    new User({user_name: loggedIn.username}).fetch().then(function(user){
      if (!user){
        res.send(response);
      } else {
        response.isAuthenticated = true;
        res.send(response);
      }
    });
  }
});

//listing routes
app.get('/api/listings', ListingController.getListing);
app.post('/api/listings', ListingController.saveListing);

/*=================== SET ROUTER DEPENDENCIES ==================*/
// Not currently in use for CORS and session compatibility
// require('./routes/userRoutes.js')(userRouter);
// require('./routes/listingRoutes.js')(listingRouter);

/*================== EXPORT EXPRESS TO MODULE ==================*/
module.exports = app;