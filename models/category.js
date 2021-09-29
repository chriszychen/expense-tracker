const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { type: String, required: true },
  name_cn: { type: String, required: true },
  iconClass: { type: String, require: true },
})

module.exports = mongoose.model('Category', categorySchema)
