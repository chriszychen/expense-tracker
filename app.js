// include modules and related variable
const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const methodOverride = require('method-override')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { eq: function (v1, v2) { return v1 === v2 } } }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// --- routes setting ---

// render index page
app.get('/', (req, res) => {
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

// render filtered records
app.get('/records/filter', (req, res) => {
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
app.get('/records/new', (req, res) => {
  const date = getDefaultDate()
  res.render('new', { date })
})

// CREATE function
app.post('/records', (req, res) => {
  const record = req.body
  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// render edit page
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

// UPDATE function
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const editedRecord = req.body
  Record.findById(id)
    .then(record => {
      Object.assign(record, editedRecord)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// DELETE function
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// listen to the server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

// function
function getIconClass(categoryName, categories) {
  const category = categories.find(category => category.name === categoryName)
  return category.iconClass
}

function getTotalAmount(records) {
  const amounts = records.map(record => record.amount)
  return amounts.reduce((sum, current) => sum + current, 0)
}

function getDefaultDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const date = ('0' + today.getDate()).slice(-2)
  return `${year}-${month}-${date}`
}

function getAccountFormat(amount) {
  return amount.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
}