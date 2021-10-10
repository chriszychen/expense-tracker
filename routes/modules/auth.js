const express = require('express')
const router = express.Router()

const passport = require('passport')

// Facebook Auth routes
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// Google Auth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// GitHub Auth routes
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
)

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

module.exports = router
