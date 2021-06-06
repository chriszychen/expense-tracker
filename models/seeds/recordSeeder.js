const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const { recordSeeds } = require('./seed.json')
const db = require('../../config/mongoose')
const { getUnixTime } = require('../../public/javascripts/functions')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: 'abc1234'
}

db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      recordSeeds.forEach(record => {
        record.date = getUnixTime(record.date)
        record.userId = userId
      })
      return Record.create(recordSeeds)
    })
    .then(() => {
      console.log('record seeder done!')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch(err => console.log(err))

  // recordSeeds.forEach(record => {
  //   record.date = getUnixTime(record.date)
  // })
  // Record.create(recordSeeds)
  //   .then(() => {
  //     console.log('record seeder done!')
  //     return db.close()
  //   })
  //   .then(() => {
  //     console.log('mongodb disconnected!')
  //   })
  //   .catch(err => console.log(err))
})
