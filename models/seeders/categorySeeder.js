const Record = require('../record')
const categorySeeds = require('./seed.json').categories
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(categorySeeds)
    .then(() => {
      console.log('category seeder done!')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch(err => console.log(err))
})
