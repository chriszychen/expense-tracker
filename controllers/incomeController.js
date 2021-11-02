const moment = require('moment')
const Record = require('../models/record')
const Category = require('../models/category')
const { getIconClassName, getTotalAmount, getAccountingFormat, inputValidation } = require('../public/javascripts/helpers')

module.exports = {
  getIncomes: async (req, res, next) => {
    try {
      const userId = req.user._id
      const [records, categories] = await Promise.all([Record.find({ userId, type: 'income' }).lean().sort('-date'), Category.find().lean()])
      // processing records
      records.forEach((record) => {
        record.iconClass = getIconClassName(record.category, categories)
        record.date = moment(record.date).format('YYYY-MM-DD')
      })
      // processing other data
      const totalAmount = getAccountingFormat(getTotalAmount(records))
      const defaultStartDate = '2021-01-01'
      const today = moment().format('YYYY-MM-DD')
      res.render('income/index', {
        records,
        totalAmount,
        startDate: defaultStartDate,
        endDate: today,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  getFilteredIncomes: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categoryFilter = req.query.category
      const defaultStartDate = '2021-01-01'
      let { startDate = defaultStartDate, endDate = moment().format('YYYY-MM-DD') } = req.query // set default value if undefined
      if (new Date(startDate) > new Date(endDate)) {
        ;[startDate, endDate] = [endDate, startDate]
      }
      // processing records
      const [filteredRecords, categories] = await Promise.all([
        Record.find({
          category: { $regex: categoryFilter },
          date: { $gte: startDate, $lte: endDate },
          userId,
          type: 'income',
        })
          .lean()
          .sort('-date'),
        Category.find().lean(),
      ])
      filteredRecords.forEach((record) => {
        record.iconClass = getIconClassName(record.category, categories)
        record.date = moment(record.date).format('YYYY-MM-DD')
      })
      // processing other data
      const totalAmount = getAccountingFormat(getTotalAmount(filteredRecords))

      res.render('income/index', {
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
  },
  newPage: (req, res) => {
    const today = moment().format('YYYY-MM-DD')
    res.render('income/new', { date: today })
  },
  createIncome: async (req, res, next) => {
    try {
      const userId = req.user._id
      const newRecord = Object.assign({ userId }, req.body)
      let validationError = false
      if (!inputValidation(newRecord)) {
        // display alert for validation error
        validationError = true
        res.render('income/new', { record: newRecord, validationError, date: newRecord.date })
      } else {
        await Record.create(newRecord)
        return res.redirect('/income/records')
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  editPage: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const record = await Record.findOne({ _id, userId }).lean()
      record.date = moment(record.date).format('YYYY-MM-DD')
      return res.render('income/edit', { record })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  putIncome: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const editedRecord = Object.assign({ _id, userId }, req.body) // pass the id to view template for next submit route
      let validationError = false
      if (!inputValidation(editedRecord)) {
        // display alert for validation error
        validationError = true
        res.render('income/edit', { record: editedRecord, validationError })
      } else {
        const record = await Record.findOne({ _id, userId })
        Object.assign(record, editedRecord)
        await record.save()
        return res.redirect('/income/records')
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  deleteIncome: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const record = await Record.findOne({ _id, userId })
      await record.remove()
      return res.redirect('/income/records')
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
}
