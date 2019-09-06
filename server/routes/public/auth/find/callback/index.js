const router = require('express').Router()

router.get(
  '/:provider(facebook|google|github|twitter|kakao|naver)',
  require('./provilder')
)

module.exports = router
