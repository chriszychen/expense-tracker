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
router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const newRecord = Object.assign({ userId }, req.body)
    let validationError = false
    if (!inputValidation(newRecord)) {
      // display alert for validation error
      validationError = true
      res.render('new', { record: newRecord, validationError, date: newRecord.date })
    } else {
      await Record.create(newRecord)
      return res.redirect('/')
    }
  } catch (err) {
    console.log(err)
  }
})

// render edit page
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId }).lean()
    record.date = moment(record.date).format('YYYY-MM-DD')
    return res.render('edit', { record })
  } catch (err) {
    console.log(err)
  }
})

// UPDATE function
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const editedRecord = Object.assign({ _id, userId }, req.body) // pass the id to view template for next submit route
    let validationError = false
    if (!inputValidation(editedRecord)) {
      // display alert for validation error
      validationError = true
      res.render('edit', { record: editedRecord, validationError })
    } else {
      const record = await Record.findOne({ _id, userId })
      Object.assign(record, editedRecord)
      await record.save()
      return res.redirect('/')
    }
  } catch (err) {
    console.log(err)
  }
})

// DELETE function
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    await record.remove()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
