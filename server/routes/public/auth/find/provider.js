const passport = require('passport')

// GET /auth/:provider
module.exports = (req, res, next) => {
  const { provider } = req.params
  let options
  if (provider !== 'kakao') options = { scope: ['email'] }
  passport.authenticate(provider, options)(req, res, next)
}
