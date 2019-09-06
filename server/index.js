const express = require('express')
const app = express()
const nuxt = require('./middleware/nuxt')
const cookieParser = require('cookie-parser')

require('dotenv').config()
require('./lib/moduleAlias')

app.use(require('morgan')('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

nuxt(app)
