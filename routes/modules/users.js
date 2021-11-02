const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController.js')

router.get('/login', userController.loginPage)

router.post('/login', userController.login)

router.get('/register', userController.registerPage)

router.post('/register', userController.register)

router.get('/logout', userController.logout)

module.exports = router
