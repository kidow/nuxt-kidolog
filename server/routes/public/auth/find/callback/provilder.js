const passport = require('passport')
const { cookieOptions } = require('@utils')
const { encodeToken } = require('@lib/jwt')

// GET /auth/callback/:provider
module.exports = (req, res, next) => {
  const { provider } = req.params
  passport.authenticate(provider, async (err, user, info) => {
    try {
      if (err) return next(err)
      const token = await encodeToken(Object.assign({}, user))
      req.login(user, err => {
        if (err) return next(err)
        res.cookie('access_token', token, cookieOptions(1))
        res.send(`<script>location.href = '/'</script>`)
      })
    } catch (err) {
      next(err)
    }
  })(req, res, next)
}
