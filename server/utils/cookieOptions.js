module.exports = state => {
  let options = {
    domain:
      process.env.NODE_ENV === 'production' ? '.kidolog.com' : 'localhost',
    path: '/'
  }
  if (state === 1) {
    options.maxAge = 1000 * 60 * 60 * 24 * 7
    options.httpOnly = true
  }
  return options
}
