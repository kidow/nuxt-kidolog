const router = require('express').Router()
const passport = require('passport')

router.get('/:provider', (req, res, next) => {
  const { provider } = req.params
  passport.authenticate(provider, (err, user, info) => {})(req, res, next)
})

module.exports = router
