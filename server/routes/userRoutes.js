var userController = require('../controllers/userController.js');

var isLoggedIn = function(req, res, next) {
  //if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  //if they aren't redirect them to the home page
  res.redirect('/');
};


module.exports = function(app, passport) {

  //HOME PAGE
  app.get('/', userController.index);
  app.get('/login', userController.login);


  //PROFILE
  //we will want this protected so you have to be logged in to visit
  //we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('../../client/src/js/landing.html', {
      user: req.user //get the user out of session and pass to template
    });
  });

  //LOG OUT
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', //redirect to the secure profile section
    failureRedirect : '/signup', //redirect back to the signup page if there is an error
    failureFlash : true //allow flash messages
  }));

  //process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', //redirect to the secure profile section
    failureRedirect : '/login', //redirect back to the signup page if there is an error
    failureFlash : true //allow flash messages
  }));

  //LINKEDIN ROUTES
  //route for linkedin authentication and login
  app.get('/auth/linkedin', passport.authenticate('linkedin', {scope: 'email'}));

  //handle the callback after linkedin has authenticated the user
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));


  //AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT)
  //Linkedin
  //send to Linkedin to do the authentication
  app.get('/connect/linkedin', passport.authorize('linkedin', {scope: 'email'}));

  //handle the callback after Linkedin has authorized the user
  app.get('/connect/linkedin/callback',
    passport.authorize('linkedin', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  //UNLINK ACCOUNTS
  //used to unlink accounts; for social accounts, just remove the token
  //for local account, remove email and password
  //user account will stay active in case they want to reconnect in the future


  //linkedin
  app.get('/unlink/linkedin', function(req, res) {
    var user = req.user;
    user.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
};











/* FROM JOBPANDA

//==================== NOT CURRENTLY IN USE ====================

//==================== REQUIRE DEPENDENCIES ====================
var userController = require('../controllers/userController.js');

//=================== SET HANDLERS TO ROUTES ===================
module.exports = function (app) {
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
  app.post('/logout', userController.logout);
};



  // // Simple route middleware to ensure user is authenticated.
  // //   Use this route middleware on any resource that needs to be protected.  If
  // //   the request is authenticated (typically via a persistent login session),
  // //   the request will proceed.  Otherwise, the user will be redirected to the
  // //   login page.
  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) { return next(); }
  //   res.redirect('/login');
  // };

  // // app.post('/login', userController.login);
  // // app.post('/signup', userController.signup);
  // // app.get('/signedin', userController.checkAuth);
  // //app.get('/logout', userController.logout);

  // app.get('/', function(req, res){
  //   res.render('index', { user: req.user });
  // });

  // app.get('/account', ensureAuthenticated, function(req, res){
  //   res.render('account', { user: req.user });
  // });

  // app.get('/login', function(req, res){
  //   res.render('login', { user: req.user });
  // });

  // // GET /auth/linkedin
  // //   Use passport.authenticate() as route middleware to authenticate the
  // //   request.  The first step in LinkedIn authentication will involve
  // //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
  // //   redirect the user back to this application at /auth/linkedin/callback
  // app.get('/auth/linkedin',
  //   passport.authenticate('linkedin'),
  //   function(req, res){
  //     // The request will be redirected to LinkedIn for authentication, so this
  //     // function will not be called.
  // });

  // // GET /auth/linkedin/callback
  // //   Use passport.authenticate() as route middleware to authenticate the
  // //   request.  If authentication fails, the user will be redirected back to the
  // //   login page.  Otherwise, the primary route function function will be called,
  // //   which, in this example, will redirect the user to the home page.
  // app.get('/auth/linkedin/callback',
  //   passport.authenticate('linkedin', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     res.redirect('/');
  // });

  // app.get('/logout', function(req, res){
  // req.logout();
  // res.redirect('/');
  // });
  
};
  
*/