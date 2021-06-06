const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountFormat, getTotalAmount, getIconClass, getDefaultDate, getInputDateString, getUnixTime } = require('../../public/javascripts/functions')

// render filtered records
router.get('/filter', (req, res) => {
  const userId = req.user._id

  const categoryFilter = req.query.category
  let { startDate, endDate } = req.query
  startDate = startDate || '2021-01-01'
  endDate = endDate || getDefaultDate()
  if (getUnixTime(startDate) > getUnixTime(endDate)) {
    [startDate, endDate] = [endDate, startDate]
  }

  Promise.all([Record.find({ category: { $regex: categoryFilter }, date: { $gte: getUnixTime(startDate), $lt: getUnixTime(endDate) }, userId }).lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [filteredRecords, categories] = results
      const totalAmount = getAccountFormat(getTotalAmount(filteredRecords))
      filteredRecords.forEach(record => {
        record.iconClass = getIconClass(record.category, categories)
        record.date = getInputDateString(record.date)
      })
      res.render('index', { records: filteredRecords, totalAmount, categoryFilter, startDate, endDate })
    })
    .catch(err => console.log(err))
})

module.exports = router
