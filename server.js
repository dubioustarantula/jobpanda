var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//these were in Kango but idk if they are necessary
var path = require('path');
var url = require('url');
var errorHandler = require('errorhandler');
var config = require('./server/config/config');


//pass passport for configuration
require('./server/config/passport.js')(passport);


//set up our express application
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

//required for passport
app.use(session({
secret: 'teamdubioustarantula',
resave: false,
saveUninitialized : false
})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session



//routes
//load our routes and pass in our app and fully configured passport
require('./server/routes/userRoutes.js')(app, passport); 


/* THIS IS FROM JOBPANDA
var app = require('./server/server-config-js');
set /client/dist to static root
app.use(express.static(__dirname + '/client/dist'));

Attempt to automatically reroute to landing page
client side routing may work better for this

app.get('/', function(req, res){
	res.redirect(__dirname + '/client/dist/landing.html');
});

set app page to /app instead of root /
app.get('/app', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/client/dist/index.html');
});
*/

//launch

app.listen(port);

console.log('listening on port: ' + port);

