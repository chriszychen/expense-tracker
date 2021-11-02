const express = require('express')
const router = express.Router()

const authController = require('../../controllers/authController.js')

// Facebook auth routes
router.get('/facebook', authController.facebookLogin)

router.get('/facebook/callback', authController.facebookLoginCallback)

// Google auth routes
router.get('/google', authController.googleLogin)

router.get('/google/callback', authController.googleLoginCallback)

// GitHub auth routes
router.get('/github', authController.githubLogin)

router.get('/github/callback', authController.githubLoginCallback)

module.exports = router
