const router = require('express').Router()
const upload = require('@lib/multer')
const { isAdmin } = require('@middle')

router.post('/', isAdmin, require('./_'))
router.post('/image', isAdmin, upload.single('image'), require('./image'))
router.post(
  '/thumbnail',
  isAdmin,
  upload.single('thumb'),
  require('./thumbnail')
)

module.exports = router
