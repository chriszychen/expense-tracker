const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

module.exports = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  }),
  registerPage: (req, res) => {
    res.render('register')
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const errors = []
      if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填。' })
      }
      if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
      }
      if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      const user = await User.findOne({ email })
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        await User.create({ name, email, password: hash })
        return res.redirect('/users/login')
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', 'Success to log out!')
    res.redirect('/users/login')
  },
}
