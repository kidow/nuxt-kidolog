const router = require('express').Router()

router.get('/sitemaps', require('./sitemaps'))

router.use('/auth', require('./auth'))
router.use('/posts', require('./posts'))

module.exports = router
