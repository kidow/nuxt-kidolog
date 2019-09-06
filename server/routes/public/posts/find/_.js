const Post = require('@models/posts')

// GET /posts
module.exports = async (req, res, next) => {
  try {
    const posts = Post.find(req.query)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}
