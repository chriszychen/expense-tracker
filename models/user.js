const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  facebookId: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)
