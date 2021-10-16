const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getIconClassName, getTotalAmount, getAccountingFormat, inputValidation } = require('../../public/javascripts/helpers')

// render index page
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const [records, categories] = await Promise.all([Record.find({ userId, type: 'expense' }).lean().sort('-date'), Category.find().lean()])
    // processing records
    records.forEach((record) => {
      record.iconClass = getIconClassName(record.category, categories)
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    // processing other data
    const totalAmount = getAccountingFormat(getTotalAmount(records))
    const defaultStartDate = '2021-01-01'
    const today = moment().format('YYYY-MM-DD')

    res.render('expense/index', {
      records,
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
    const categoryFilter = req.query.category
    let { startDate = '2021-01-01', endDate = moment().format('YYYY-MM-DD') } = req.query // set default value if undefined
    if (new Date(startDate) > new Date(endDate)) {
      ;[startDate, endDate] = [endDate, startDate]
    }
    const [filteredRecords, categories] = await Promise.all([
      Record.find({
        category: { $regex: categoryFilter },
        date: { $gte: startDate, $lte: endDate },
        userId,
        type: 'expense',
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
    // processing other data
    const totalAmount = getAccountingFormat(getTotalAmount(filteredRecords))

    res.render('expense/index', {
      records: filteredRecords,
      totalAmount,
      categoryFilter,
      startDate,
      endDate,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// render new page
router.get('/new', (req, res, next) => {
  const today = moment().format('YYYY-MM-DD')
  res.render('expense/new', { date: today })
})

// CREATE function
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const newRecord = Object.assign({ userId }, req.body)
    let validationError = false
    if (!inputValidation(newRecord)) {
      // display alert for validation error
      validationError = true
      res.render('expense/new', {
        record: newRecord,
        validationError,
        date: newRecord.date,
      })
    } else {
      await Record.create(newRecord)
      return res.redirect('/expense/records')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// render edit page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId }).lean()
    record.date = moment(record.date).format('YYYY-MM-DD')
    return res.render('expense/edit', { record })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// UPDATE function
router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const editedRecord = Object.assign({ _id, userId }, req.body) // return the id to view template for form if not passing validation
    let validationError = false
    if (!inputValidation(editedRecord)) {
      // display alert for validation error
      validationError = true
      res.render('expense/edit', { record: editedRecord, validationError })
    } else {
      const record = await Record.findOne({ _id, userId })
      Object.assign(record, editedRecord)
      await record.save()
      return res.redirect('/expense/records')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// DELETE function
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    await record.remove()
    return res.redirect('/expense/records')
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
