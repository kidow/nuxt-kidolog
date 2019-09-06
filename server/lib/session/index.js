const session = require('express-session')
const { COOKIE_SECRET, NODE_ENV } = process.env

module.exports = session({
  resave: true,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
})
