const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  place: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, require: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)
