const passport = require('passport')
const cookieOptions = require('@utils/cookie')

// GET /auth/:provider
module.exports = (req, res, next) => {
  const { redirect } = req.query
  const { provider } = req.params
  let options
  if (provider !== 'kakao') options = { scope: ['email'] }
  res.cookie('redirect', redirect, cookieOptions(1))
  passport.authenticate(provider, options)(req, res, next)
}
