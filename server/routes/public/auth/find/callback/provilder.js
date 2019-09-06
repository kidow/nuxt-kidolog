const passport = require('passport')

// GET /auth/callback/:provider
module.exports = (req, res, next) => {
  const { provider } = req.params
  passport.authenticate(provider, (err, user, info) => {
    try {
      if (err) return next(err)
      res.status(200).json(true)
    } catch (err) {
      next(err)
    }
  })(req, res, next)
}
