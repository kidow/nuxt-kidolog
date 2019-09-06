const passport = require('passport')
const cookieOptions = require('@utils/cookie')

// GET /auth/:provider
module.exports = (req, res, next) => {
  const { redirect } = req.query
  const { provider } = req.params
  res.cookie('redirect', redirect, cookieOptions(1))
  passport.authenticate(provider, { scope: ['email'] })(req, res, next)
}
