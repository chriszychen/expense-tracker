// include modules and related variable
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const helmet = require('helmet')
const RedisStore = require('connect-redis')(session)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')
const redisClient = require('./config/redis')

const app = express()
const PORT = process.env.PORT

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      eq: function (v1, v2) {
        return v1 === v2
      },
      lt: function (v1, v2) {
        return v1 < v2
      },
    },
  })
)
app.set('view engine', 'hbs')
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: process.env.DEFAULT_SRC,
      scriptSrc: process.env.SCRIPT_SRC,
    },
  })
)

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.danger_msg = req.flash('danger_msg')
  next()
})
// --- routes setting ---
app.use(routes)

// listen to the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
