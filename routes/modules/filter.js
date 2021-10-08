const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountingFormat, getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')

// render filtered records
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryFilter = req.query.category
    const defaultStartDate = '2021-01-01'
    let { startDate = defaultStartDate, endDate = moment().format('YYYY-MM-DD') } = req.query // set default value if undefined
    if (new Date(startDate) > new Date(endDate)) {
      ;[startDate, endDate] = [endDate, startDate]
    }
    const [filteredRecords, categories] = await Promise.all([
      Record.find({
        category: { $regex: categoryFilter },
        date: { $gte: startDate, $lte: endDate },
        userId,
      })
        .lean()
        .sort('-date'),
      Category.find().lean(),
    ])
    const totalAmount = getAccountingFormat(getTotalAmount(filteredRecords))
    filteredRecords.forEach((record) => {
      record.iconClass = getIconClassName(record.category, categories)
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    res.render('index', {
      records: filteredRecords,
      totalAmount,
      categoryFilter,
      startDate,
      endDate,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
