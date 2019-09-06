const router = require('express').Router()

router.use('/callback', require('./callback'))

router.get('/me', require('./me'))
router.get(
  '/:provider(facebook|twitter|github|google|kakao|naver)',
  require('./provider')
)

module.exports = router
