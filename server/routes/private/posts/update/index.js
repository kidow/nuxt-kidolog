const router = require('express').Router()
const { isAdmin } = require('@middle')

router.put('/:postId', isAdmin, require('./_postId'))

module.exports = router
