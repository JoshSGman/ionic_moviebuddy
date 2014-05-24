// config/auth.js

exports.facebookAuth = {
  'clientID': '225403147654068', // your App ID
  'clientSecret': '0bb841a53a02a76e177abe3073ee54b9', // your App Secret
  'callbackURL': 'http://localhost:8080/auth/facebook/callback'
};

// exports.facebookAuth = {
//   'clientID': '227436327446392', // your App ID
//   'clientSecret': '9491a0d640daf987b3897361b7f19f1c', // your App Secret
//   'callbackURL': 'http://localhost:8080/auth/facebook/callback'
// };

exports.gmailAuth = {
  user: 'moviebuddyapp@gmail.com',
  pass: 'moviebuddy!'
};