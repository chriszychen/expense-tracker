const express = require('express')
const router = express.Router()

const incomeController = require('../../controllers/incomeController.js')

// render index page
router.get('/', incomeController.getIncomes)

// render filtered records
router.get('/filter', incomeController.getFilteredIncomes)

// render new page
router.get('/new', incomeController.newPage)

// CREATE function
router.post('/', incomeController.createIncome)

// render edit page
router.get('/:id/edit', incomeController.editPage)

// UPDATE function
router.put('/:id', incomeController.putIncome)

// DELETE function
router.delete('/:id', incomeController.deleteIncome)

module.exports = router
