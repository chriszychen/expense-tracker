const Record = require('../record')
const { recordSeeds } = require('./seed.json')
const db = require('../../config/mongoose')
const { getUnixTime } = require('../../public/javascripts/functions')

db.once('open', () => {
  recordSeeds.forEach(record => {
    record.date = getUnixTime(record.date)
  })
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
