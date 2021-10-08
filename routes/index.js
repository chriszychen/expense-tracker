const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
// const income = require('./modules/income')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/expense/records', authenticator, expense)
// router.use('/income/records', authenticator, income)
router.use('/', authenticator, home)

module.exports = router
