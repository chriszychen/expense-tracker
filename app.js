// include modules and related variable
const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const app = express()
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// routes setting
app.get('/', (req, res) => {
  Promise.all([Record.find().lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const categories = results[1]
      const totalAmount = getTotalAmount(records)
      records.forEach(record => {
        record.iconClass = getIconClass(record.category, categories)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

// listen to the server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

function getIconClass(categoryName, categories) {
  const category = categories.find(category => category.name === categoryName)
  return category.iconClass
}

function getTotalAmount(records) {
  const amounts = records.map(record => record.amount)
  return amounts.reduce((sum, current) => sum + current, 0)
}