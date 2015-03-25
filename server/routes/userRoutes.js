/*==================== NOT CURRENTLY IN USE ====================*/

/*==================== REQUIRE DEPENDENCIES ====================*/
//var userController = require('../controllers/userController.js');

/*=================== SET HANDLERS TO ROUTES ===================*/
module.exports = function (app, passport) {
  //app.post('/signup', userController.signup);
  //app.post('/login', userController.login);
  //app.post('/logout', userController.logout);


  //HOME PAGE (with login links)
  app.get('/', function(req, res) {
    res.render('../client/src/js/landing.html'); //load the landing page
  });

  //LOGIN
  //show the login form
  app.get('/login', function(req, res) {
    //render the page and pass in any flash data if it exists
    res.render('../client/src/js/login.html', {message: req.flash('loginMessage')}
  });
)};

  //prrocess the login form
  //app.post('/login', do all the passport stuff here);


  //PROFILE SECTION
  //we will want this protected so you have to be logged in to visit
  //we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('../client/src/js/index.html', {
        user: req.user //get the user out of session and pass to template
      });
  });

  //LOGOUT
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  //if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  //if they aren't redirect them to the home page
  res.redirect('/');
}



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
  
