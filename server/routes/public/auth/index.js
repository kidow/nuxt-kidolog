const router = require('express').Router()

router.use(require('./find'))
router.use(require('./destroy'))

module.exports = router
