require('dotenv').config()
const express = require('express')
const app = express()
const nuxt = require('./middleware/nuxt')
const cookieParser = require('cookie-parser')
const passport = require('passport')
// const Sentry = require('@sentry/node')

// Sentry.init({ dsn: process.env.SENTRY_DSN })

require('./lib/moduleAlias')
require('@lib/passport')(passport)

// app.use(Sentry.Handlers.requestHandler())
app.use(
  require('morgan')('dev', {
    skip: (req, res) => {
      const isJs = req.url.indexOf('.js') > -1
      const isJson = req.url.indexOf('.json') > -1
      const isImage = req.url.indexOf('.png') > -1
      const isMap = req.url.indexOf('.map') > -1
      const isFavicon = req.url.indexOf('favicon') > -1
      if (isJs || isJson || isImage || isMap || isFavicon) return true
      return false
    }
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(
//   Sentry.Handlers.errorHandler({
//     shouldHandleError(error) {
//       if (error.status === 500) return true
//       return false
//     }
//   })
// )

nuxt(app)
