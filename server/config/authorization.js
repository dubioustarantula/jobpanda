//load the auth variables
var nconf = require('nconf');
nconf.file('settings.json')
     .env();

var consumerKey = nconf.get('consumerKey');
var consumerSecret = nconf.get('consumerSecret');


module.exports = {
    'linkedinAuth' : {
        'consumerKey' : consumerKey,
        'consumerSecret' : consumerSecret,
        'callbackURL' : 'http://127.0.0.1:8000/auth/linkedin/callback'
}
};





// /*========== NOT CURRENTLY IN USE ==========*/
// //Current plan for authorization was session based, so this file would be deleted
// var jwt = require('jwt-simple');

// module.exports = {
//   decode: function (req, res, next) {
//     var token = req.headers['x-access-token'];
//     var user;
//     if (!token) {
//       return res.send(403); // send forbidden if a token is not provided
//     }
//     try {
//       // decode token and attach user to the request
//       // for use inside our controllers
//       user = jwt.decode(token, 'secret');
//       req.user = user;
//       next();
//     } catch(error) {
//       return next(error);
//     }

//   }
// };

