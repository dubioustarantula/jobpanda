// __tests__/sum-test.js
jest.dontMock('../../server/server-config');

describe('database endpoints', function() {
 it('adds users with post requests to /api/signup', function() {
  window.jquery = require('jquery');
  var user = {
     username: 'guest',
     password: ''  
   }; 
   user = JSON.stringify(user);
   expect(user.username).toBe('guest');
   // $.ajax({
   //   type: "POST",
   //   data: user,
   //   url: '/api/signup',
   //   success: function(data) {
   //    console.log(data);
   //   },
   // });
 });
});