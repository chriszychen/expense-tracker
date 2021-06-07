const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountFormat, getTotalAmount, getIconClass, getDefaultDate, getInputDateString } = require('../../public/javascripts/functions')

// render filtered records
router.get('/', (req, res) => {
  const userId = req.user._id

  const categoryFilter = req.query.category
  let { startDate, endDate } = req.query
  startDate = startDate || '2021-01-01'
  endDate = endDate || getDefaultDate()
  if ((new Date(startDate)).valueOf() > new Date(endDate).valueOf()) {
    [startDate, endDate] = [endDate, startDate]
  }

  Promise.all([Record.find({ category: { $regex: categoryFilter }, date: { $gte: startDate, $lt: endDate }, userId }).lean().sort('-date'), Category.find().lean()])
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
