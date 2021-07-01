const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountingFormat, getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')

// render filtered records
router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryFilter = req.query.category
  let { startDate, endDate } = req.query
  startDate = startDate || '2021-01-01' // default start date
  endDate = endDate || moment().format('YYYY-MM-DD') // today as default end date
  if ((new Date(startDate)).valueOf() > new Date(endDate).valueOf()) {
    [startDate, endDate] = [endDate, startDate]
  }

  Promise.all([Record.find({ category: { $regex: categoryFilter }, date: { $gte: startDate, $lt: endDate }, userId }).lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [filteredRecords, categories] = results
      const totalAmount = getAccountingFormat(getTotalAmount(filteredRecords))
      filteredRecords.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        record.date = moment(record.date).format('YYYY-MM-DD')
      })
      res.render('index', { records: filteredRecords, totalAmount, categoryFilter, startDate, endDate })
    })
    .catch(err => console.log(err))
})

module.exports = router
