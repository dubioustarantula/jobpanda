var express = require('express');
var request = require('request');

var app = require('./server/server-config.js');

var port = process.env.PORT || 8000;

//set /client/dist to static root
app.use(express.static(__dirname + '/client/dist'));

//Attempt to automatically reroute to landing page
//client side routing may work better for this

// app.get('/', function(req, res){
// 	res.redirect(__dirname + '/client/dist/landing.html');
// });

//set app page to /app instead of root /
app.get('/app', function(req, res){
	res.sendFile(__dirname + '/client/dist/index.html');
});

request('http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=32318&t.k=fkXNoggvsho&userip=173.247.199.46&useragent=&action=employers&q=uber', function(error, response, body){
	if (!error && response.statusCode === 200) {
		console.log(body);
	}
});

app.listen(port);

console.log('listening on port: ' + port);