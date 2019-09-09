const Post = require('@models/posts')

// GET /sitemaps
module.exports = async (_, res, next) => {
  try {
    const sitemaps = await Post.findSitemaps()
    res.status(200).json(sitemaps)
  } catch (err) {
    next(err)
  }
}
