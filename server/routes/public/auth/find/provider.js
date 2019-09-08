const passport = require('passport')

// GET /auth/:provider
module.exports = (req, res, next) => {
  const { provider } = req.params
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
  passport.authenticate(provider, options)(req, res, next)
}
