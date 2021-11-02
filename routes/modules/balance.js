const express = require('express')
const router = express.Router()

const balanceController = require('../../controllers/balanceController.js')

// render index page
router.get('/', balanceController.getBalance)

// render filtered records
router.get('/filter', balanceController.getFilteredBalance)

module.exports = router
