const router = require('express').Router()

router.get('/:provider(facebook|google|github|twitter)', require('./provilder'))

module.exports = router
