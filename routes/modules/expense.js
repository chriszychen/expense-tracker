const express = require('express')
const router = express.Router()

const expenseController = require('../../controllers/expenseController.js')

// render index page
router.get('/', expenseController.getExpenses)

// render filtered records
router.get('/filter', expenseController.getFilteredExpenses)

// render new page
router.get('/new', expenseController.newPage)

// CREATE function
router.post('/', expenseController.createExpense)

// render edit page
router.get('/:id/edit', expenseController.editPage)

// UPDATE function
router.put('/:id', expenseController.putExpense)

// DELETE function
router.delete('/:id', expenseController.deleteExpense)

module.exports = router
