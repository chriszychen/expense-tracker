// include modules and related variable
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { eq: function (v1, v2) { return v1 === v2 } } }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// --- routes setting ---
app.use(routes)

// listen to the server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
