const Record = require('../record')
const recordSeeds = require('./seed.json').records
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(recordSeeds)
    .then(() => {
      console.log('record seeder done!')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch(err => console.log(err))
})
