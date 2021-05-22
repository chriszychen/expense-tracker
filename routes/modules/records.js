const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getAccountFormat, getTotalAmount, getIconClass, getDefaultDate, inputValidation } = require('../../public/javascripts/functions')

// render filtered records
router.get('/filter', (req, res) => {
  const categoryFilter = req.query.filter
  Promise.all([Record.find().lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const categories = results[1]
      const filterRecords = records.filter(record => record.category === categoryFilter)
      const totalAmount = getAccountFormat(getTotalAmount(filterRecords))
      filterRecords.forEach(record => {
        record.iconClass = getIconClass(record.category, categories)
      })
      res.render('index', { records: filterRecords, totalAmount, categoryFilter })
    })
    .catch(err => console.log(err))
})

// render new page
router.get('/new', (req, res) => {
  const date = getDefaultDate()
  res.render('new', { date })
})

// CREATE function
router.post('', (req, res) => {
  const record = req.body
  let validationError = false
  if (!inputValidation(record)) {
    // 回傳輸入資料錯誤提示
    validationError = true
    res.render('new', { record, validationError, date: record.date })
  } else {
    return Record.create(record)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

// UPDATE function
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editedRecord = req.body
  let validationError = false
  if (!inputValidation(editedRecord)) {
    // 回傳輸入資料錯誤提示
    validationError = true
    res.render('edit', { record: editedRecord, validationError })
  } else {
    return Record.findById(id)
      .then(record => {
        Object.assign(record, editedRecord)
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }
})

// DELETE function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
