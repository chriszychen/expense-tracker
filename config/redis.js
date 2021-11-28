const redis = require('redis')

const redisClient = redis.createClient({
  url: process.env.REDIS_TLS_URL || process.env.REDIS_URL,
  legacyMode: true,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
})
;(async () => {
  try {
    await redisClient.connect()
  } catch (err) {
    console.log(err)
  }
})()

module.exports = redisClient
