const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  // initialization
  app.use(passport.initialize())
  app.use(passport.session())
  // login strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { type: 'danger_msg', message: '這個 Email 尚未註冊！' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, { type: 'danger_msg', message: 'Email 或 密碼 輸入錯誤！' })
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
        done(err, null)
      }
    })
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json
          let user = await User.findOne({ email })
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-10)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          user = await User.create({ name, email, password: hash })
          done(null, user)
        } catch (err) {
          console.log(err)
          done(err, false)
        }
      }
    )
  )

  // serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (err) {
      console.log(err)
      done(err, null)
    }
  })
}
