require('dotenv').config()
const {
  MYSQL_HOST_SANDBOX,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
  NODE_ENV,
  SENTRY_NODE
} = process.env
const Raven = require('raven')

Raven.config(SENTRY_NODE).install(err => {
  if (err) console.log('Raven Err: ', err)
})

const connection = require('mysql').createConnection({
  host: NODE_ENV === 'development' ? MYSQL_HOST_SANDBOX : MYSQL_HOST,
  user: MYSQL_USER,
  password: NODE_ENV === 'development' ? MYSQL_PASSWORD : MYSQL_HOST_PASSWORD,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE
})

connection.connect(err => {
  if (err) return console.log('\nError connecting database ... \n' + err)
  console.log(`\nDatabase "${connection.config.database}" is connected ... \n`)
})

connection.on('error', err => {
  if (err) {
    console.log('MySQL Connection Err: ', err.code)
    Raven.captureException(err)
  }
})

module.exports = connection
