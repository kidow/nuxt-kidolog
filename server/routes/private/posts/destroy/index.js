const router = require('express').Router()
const { isAdmin } = require('@middle')

router.delete('/:postId', isAdmin, require('./_postId'))

module.exports = router
