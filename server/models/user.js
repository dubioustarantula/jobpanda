/*================ REQUIRE DEPENDENCIES ================*/
var db 				  = require('../config/config'),
    ListingUser = require('./job_user'),
    bcrypt      = require('bcrypt'),
    Promise     = require('bluebird'),
    Listings 	  = require('./listing');

/*============== SET SCHEMA RELATIONSHIPS ==============*/
var User = db.Model.extend({
	tableName: 'users',
  //if the section below looks very familiar... that's because it is
	initialize: function(){
    this.on('creating', this.generateHash);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  generateHash: function(){
    return bcrypt.hashSync(this.get('password'), bcrypt.genSaltSync(8), null);
  },
	listings: function(){
		return this.belongsToMany(Listings).through(ListingUser);
	}
});

/*=================== EXPORT MODULE ===================*/
module.exports = User;