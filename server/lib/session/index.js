const session = require('express-session')
const client = require('redis').createClient()
const RedisStore = require('connect-redis')(session)
const {
  COOKIE_SECRET,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env

module.exports = session({
  resave: true,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    pass: REDIS_PASSWORD,
    logErrors: NODE_ENV === 'production',
    client
  })
})
