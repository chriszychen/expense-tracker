const passport = require('passport')

module.exports = {
  facebookLogin: passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  }),
  facebookLoginCallback: passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  }),
  googleLogin: passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
  googleLoginCallback: passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  }),
  githubLogin: passport.authenticate('github', {
    scope: ['user:email'],
  }),
  githubLoginCallback: passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  }),
}
