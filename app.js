// include modules and related variable
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// routes setting
app.get('/', (req, res) => {
  res.send('Hello world')
})

// listen to the server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
