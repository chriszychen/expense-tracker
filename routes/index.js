const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const income = require('./modules/income')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/expense/records', authenticator, expense)
router.use('/income/records', authenticator, income)
router.use('/', authenticator, home)

router.all('*', (req, res, next) => {
  const err = new Error(`Cannot find the page ${req.protocol}://${req.hostname}${req.originalUrl}`)
  err.name = 'Not Found'
  err.statusCode = 404
  next(err)
})

router.use((err, req, res, next) => {
  // set default error name and message
  err.name = err.name || 'Internal Server Error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).render('error', {
    error: err,
  })
})

module.exports = router
