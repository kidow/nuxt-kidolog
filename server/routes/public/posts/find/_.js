const Post = require('@models/posts')

// GET /posts
module.exports = async (req, res, next) => {
  try {
    const [posts, nextPosts] = await Promise.all([
      Post.find(req.query),
      Post.findNext(req.query)
    ])
    res.status(200).json({ posts, nextPosts })
  } catch (err) {
    next(err)
  }
}
