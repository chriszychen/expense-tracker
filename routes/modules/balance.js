const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountingFormat, getTotalBalance, getIconClassName, getIncomeCategorizedSum, getExpenseCategorizedSum } = require('../../public/javascripts/helpers')

// render index page
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const [records, categories] = await Promise.all([Record.find({ userId }).lean().sort('-date'), Category.find().lean()])

    // processing records
    records.forEach((record) => {
      record.iconClass = getIconClassName(record.category, categories)
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    // processing chart data
    const isIncomeRecordPresent = records.some((record) => record.type === 'income')
    const isExpenseRecordPresent = records.some((record) => record.type === 'expense')
    const incomeCategorizedSum = JSON.stringify(getIncomeCategorizedSum(records))
    const expenseCategorizedSum = JSON.stringify(getExpenseCategorizedSum(records))
    // processing other data
    const totalAmount = getAccountingFormat(getTotalBalance(records))
    const defaultStartDate = '2021-01-01'
    const today = moment().format('YYYY-MM-DD')

    res.render('index', {
      records,
      isIncomeRecordPresent,
      isExpenseRecordPresent,
      incomeCategorizedSum,
      expenseCategorizedSum,
      totalAmount,
      startDate: defaultStartDate,
      endDate: today,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// render filtered records
router.get('/filter', async (req, res, next) => {
  try {
    const userId = req.user._id
    let { startDate = '2021-01-01', endDate = moment().format('YYYY-MM-DD') } = req.query // set default value if undefined
    if (new Date(startDate) > new Date(endDate)) {
      ;[startDate, endDate] = [endDate, startDate]
    }
    const [filteredRecords, categories] = await Promise.all([
      Record.find({
        date: { $gte: startDate, $lte: endDate },
        userId,
      })
        .lean()
        .sort('-date'),
      Category.find().lean(),
    ])
    // processing records
    filteredRecords.forEach((record) => {
      record.iconClass = getIconClassName(record.category, categories)
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    // processing chart data
    const isIncomeRecordPresent = filteredRecords.some((record) => record.type === 'income')
    const isExpenseRecordPresent = filteredRecords.some((record) => record.type === 'expense')
    const incomeCategorizedSum = JSON.stringify(getIncomeCategorizedSum(filteredRecords))
    const expenseCategorizedSum = JSON.stringify(getExpenseCategorizedSum(filteredRecords))
    // processing other data
    const totalAmount = getAccountingFormat(getTotalBalance(filteredRecords))

    res.render('index', {
      records: filteredRecords,
      isIncomeRecordPresent,
      isExpenseRecordPresent,
      incomeCategorizedSum,
      expenseCategorizedSum,
      totalAmount,
      startDate,
      endDate,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
