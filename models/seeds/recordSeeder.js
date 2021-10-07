const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const { userSeeds, recordSeeds } = require('./seed.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(userSeeds[0].password, salt)
    const user = await User.create({
      name: userSeeds[0].name,
      email: userSeeds[0].email,
      password: hash,
    })
    recordSeeds.forEach((record) => {
      record.userId = user._id
    })
    await Record.create(recordSeeds)
    console.log('record seeder done!')
    await db.close()
    console.log('mongodb disconnected!')
  } catch (err) {
    console.log(err)
    await db.close()
  }
})
