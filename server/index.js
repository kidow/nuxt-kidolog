const express = require('express')
const app = express()
const nuxt = require('./middleware/nuxt')
const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(cookieParser(process.env.COOKIE_SECRET))

nuxt(app)
