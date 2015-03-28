/*==================== NOT CURRENTLY IN USE ====================*/

//Because authentication is planned to be session-based, it is simpler to write
//request-handlers directly in server-config.js where session dependency is already required

/*==================== REQUIRE DEPENDENCIES ====================*/
var User = require('../models/user.js');

//this part I got from Kango
var fs = require('fs');

module.exports = {
	//Kango
    index: function(req, res) {
        res.set('Content-Type', 'text/html');

        fs.readFile(__dirname + '/../../client/src/index.html', function(err, data) {
        	if (err) {
        		console.log('err: ' + err);
        		res.send('<html><head/><body>empty: ' + __dirname + '</body></html>');
        		return;
        	}

        	res.send(data);
        });
    },

    landing: function(req, res) {
    res.set('Content-Type', 'text/html');

        fs.readFile(__dirname + '/../../client/src/landing.html', function(err, data) {
          if (err) {
            console.log('err: ' + err);
            res.send('<html><head/><body>empty: ' + __dirname + '</body></html>');
            return;
          }

          res.send(data);
        });
    },
     
    //Kango
    getUsers: function(req, res) {
    	var username = req.parsed.query;

    	if(username) {
    		new User({username: username}).fetch().then(function(user) {
    			if(user) {
    				res.send(200, user);
    			} else {
    				res.send(404, 'Username does not appear in our database');
    			}
    		});
    	}
    },


	signin: function(req, res, next){
    console.log('SIGN IN');
		new User({username: req.body.username}).fetch()
		.then(function(foundUser){
			if (!foundUser){
				new User({username: req.body.username, password: req.body.password}).save().then(function(newUser){
					var user = {};

				});
			} else {
				console.error('User already exists!');
			}
		});
	},

	login: function(req, res, next){
     res.set('Content-Type', 'text/html');

        fs.readFile(__dirname + '/../../client/src/signup.html', function(err, data) {
          if (err) {
            console.log('err: ' + err);
            res.send('<html><head/><body>empty: ' + __dirname + '</body></html>');
            return;
          }

          res.send(data);
        });
	},

	logout: function(req, res, next){

	}
}