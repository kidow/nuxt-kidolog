const router = require('express').Router()

router.use('/posts', require('./posts'))
router.use('/image', require('./image'))

module.exports = router
