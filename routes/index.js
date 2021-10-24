const express = require('express')
const router = express.Router()
const balance = require('./modules/balance')
const expense = require('./modules/expense')
const income = require('./modules/income')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')
const { setNavbarIfActive } = require('../public/javascripts/helpers')

router.use('/users', users)
router.use('/auth', auth)
router.use(setNavbarIfActive) // to set active navbar for balance, expense, income pages
router.use(authenticator) // routes below need authentication
router.use('/balance/records', balance)
router.use('/expense/records', expense)
router.use('/income/records', income)
router.use('/', (req, res) => res.redirect('/balance/records'))

router.all('*', (req, res, next) => {
  const err = new Error(`Cannot find the page ${req.protocol}://${req.hostname}${req.originalUrl}`)
  err.name = 'Not Found'
  err.statusCode = 404
  next(err)
})

router.use((err, req, res, next) => {
  let name, message
  if (err.statusCode === 404) {
    name = err.name
    message = err.message
  } else {
    // default error name and message
    err.statusCode = 500
    name = 'Internal Server Error'
    message = 'Something wrong happened! Please try again.'
  }

  res.status(err.statusCode).render('error', {
    name,
    message,
  })
})

module.exports = router
