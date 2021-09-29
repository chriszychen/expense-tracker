const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const { inputValidation } = require('../../public/javascripts/helpers')

// render new page
router.get('/new', (req, res) => {
  const today = moment().format('YYYY-MM-DD')
  res.render('new', { date: today })
})

// CREATE function
router.post('/', (req, res) => {
  const userId = req.user._id
  const newRecord = Object.assign({ userId }, req.body)
  let validationError = false
  if (!inputValidation(newRecord)) {
    // display alert for validation error
    validationError = true
    res.render('new', { record: newRecord, validationError, date: newRecord.date })
  } else {
    return Record.create(newRecord)
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  }
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch((err) => console.log(err))
})

// UPDATE function
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const editedRecord = Object.assign({ _id, userId }, req.body) // pass the id to view template for next submit route
  let validationError = false
  if (!inputValidation(editedRecord)) {
    // display alert for validation error
    validationError = true
    res.render('edit', { record: editedRecord, validationError })
  } else {
    return Record.findOne({ _id, userId })
      .then((record) => {
        Object.assign(record, editedRecord)
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  }
})

// DELETE function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
