const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountFormat, getTotalAmount, getIconClass } = require('../../public/javascripts/functions')

// render index page
router.get('/', (req, res) => {
  Promise.all([Record.find().lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const categories = results[1]
      const totalAmount = getAccountFormat(getTotalAmount(records))
      records.forEach(record => {
        record.iconClass = getIconClass(record.category, categories)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router
