var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var passport = require('passport');
var flash = require('connect-flash');

//pass passport for configuration
require('./server/config/passport.js')(passport);

app.configure(function() {
    //set up our express application
    app.use(express.logger('dev')); //log every request to the console
    app.use(express.cookieParser()); //read cookies (needed for auth)
    app.use(express.bodyParser()); //get information from html forms

    //required for passport
    app.use(express.session({secret: 'teamdubioustarantula'})); //session secret
    app.use(passport.initialize());
    app.use(passport.session()); //persistent login sessions
    app.use(flash()); //use connect-flash for flash messages stored in session

});

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
	res.sendFile(__dirname + '/client/dist/index.html');
});
*/


//launch
app.listen(port);

console.log('listening on port: ' + port);