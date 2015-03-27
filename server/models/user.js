/*================ REQUIRE DEPENDENCIES ================*/
<<<<<<< HEAD
var db 				  = require('../config/config'),
    bcrypt      = require('bcrypt-nodejs'),
    ListingUser = require('./job_user'),
    Listings 	  = require('./listing');
=======
var db 				= require('../config/config'),
    JobUser   = require('./job_user'),
    bcrypt    = require('bcrypt-nodejs'),
    Listings 	= require('./listing');
>>>>>>> master

/*============== SET SCHEMA RELATIONSHIPS ==============*/
var User = db.Model.extend({
	tableName: 'users',
  //if the section below looks very familiar... that's because it is
<<<<<<< HEAD
	// initialize: function(){
 //    this.on('creating', this.generateHash(this.get('password')));
 //    console.log('user initialized');
 //  },
=======
	initialize: function(){
    this.on('creating', this.generateHash);
  },
  validPassword: function(attemptedPassword, callback) {
    bcrypt.compareSync(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  // generateHash: function(){
  //   return bcrypt.hashSync(this.get('password'), bcrypt.genSaltSync(8), null);
>>>>>>> master
  /* FROM JOBPANDA
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    // return a promise - bookshelf will wait for the promise
    // to resolve before completing the create action
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
>>>>>>> (refactor) Refactor code in user.js to not uses Promises
  },
  */
  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  */
  generateHash: function(password) {
    console.log('generating hash');
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
	// listings: function(){
	// 	return this.belongsToMany(Listings).through(ListingUser);
	// },
  validPassword: function(attemptedPassword, callback) {
    console.log('validating password');
    // return bcrypt.compareSync(attemptedPassword, this.get('password'), function(err, isMatch) {
    //   callback(isMatch);
    // });
  }
});

/*=================== EXPORT MODULE ===================*/
module.exports = User;