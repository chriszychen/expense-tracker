// include modules and related variable
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { eq: function (v1, v2) { return v1 === v2 } } }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'JustOneSecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// --- routes setting ---
app.use(routes)

// listen to the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
