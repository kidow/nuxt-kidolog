const passport = require('passport')
const { cookieOptions } = require('@utils')

// GET /auth/:provider
module.exports = (req, res, next) => {
  const { provider } = req.params
  const { redirect } = req.query
  let options
  switch (provider) {
    case 'google':
      options = { scope: ['email', 'profile'] }
      break
    case 'facebook':
      options = { scope: ['email'] }
      break
    case 'naver':
      options = { scope: ['email'] }
      break
    case 'twitter':
      options = { scope: ['email'] }
      break
    case 'twitter':
      options = { scope: ['email'] }
      break
    default:
      break
  }
  res.cookie('redirect', redirect, cookieOptions(1))
  passport.authenticate(provider, options)(req, res, next)
}
