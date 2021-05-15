// include modules and related variable
const express = require('express')
const app = express()

// routes setting
app.get('/', (req, res) => {
  res.send('Hello world')
})

// listen to the server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
