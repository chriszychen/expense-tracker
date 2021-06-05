const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountFormat, getTotalAmount, getInputDateString, getIconClass, getDefaultDate } = require('../../public/javascripts/functions')

// render index page
router.get('/', (req, res) => {
  Promise.all([Record.find().lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      const totalAmount = getAccountFormat(getTotalAmount(records))
      const today = getDefaultDate()
      records.forEach(record => {
        record.iconClass = getIconClass(record.category, categories)
        record.date = getInputDateString(record.date)
      })
      res.render('index', { records, totalAmount, startDate: '2018-01-01', endDate: today })
    })
    .catch(err => console.log(err))
})

module.exports = router
