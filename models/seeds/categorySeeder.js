if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const { categorySeeds } = require('./seed.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categorySeeds)
    .then(() => {
      console.log('category seeder done!')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch((err) => console.log(err))
})
