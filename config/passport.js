const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // initialization
  app.use(passport.initialize())
  app.use(passport.session())
  // login strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { type: 'danger_msg', message: '這個 Email 尚未註冊！' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { type: 'danger_msg', message: 'Email 或 密碼 輸入錯誤！' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, null))
  }))

  // serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
