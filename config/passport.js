const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
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
          return done(null, false, { type: 'danger_msg', message: 'This email has not been registered!' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, { type: 'danger_msg', message: 'Wrong email or password!' })
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
        done(err, null)
      }
    })
  )
  // Facebook strategy
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
          const facebookId = profile.id
          const { name, email } = profile._json
          let user = await User.findOne({ facebookId })
          if (user) return done(null, user)
          user = await User.findOne({ email })
          if (user) {
            Object.assign(user, { facebookId })
            user = await user.save()
            return done(null, user)
          }
          const randomPassword = Math.random().toString(36).slice(-10)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          user = await User.create({ name, email, password: hash, facebookId })
          return done(null, user)
        } catch (err) {
          console.log(err)
          done(err, false)
        }
      }
    )
  )
  // Google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleId = profile.id
          const { name, email } = profile._json
          let user = await User.findOne({ googleId })
          if (user) return done(null, user)
          user = await User.findOne({ email })
          if (user) {
            Object.assign(user, { googleId })
            user = await user.save()
            return done(null, user)
          }
          const randomPassword = Math.random().toString(36).slice(-10)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          user = await User.create({ name, email, password: hash, googleId })
          return done(null, user)
        } catch (err) {
          console.log(err)
          done(err, false)
        }
      }
    )
  )
  // GitHub strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const githubId = profile.id
          const { name } = profile._json
          const email = profile.emails[0].value
          let user = await User.findOne({ githubId })
          if (user) return done(null, user)
          user = await User.findOne({ email })
          if (user) {
            Object.assign(user, { githubId })
            user = await user.save()
            return done(null, user)
          }
          const randomPassword = Math.random().toString(36).slice(-10)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          user = await User.create({ name, email, password: hash, githubId })
          return done(null, user)
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
