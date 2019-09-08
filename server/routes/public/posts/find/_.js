const Post = require('@models/posts')

// GET /posts
module.exports = async (req, res, next) => {
  try {
    const posts = await Post.find(req.query)
    console.log('posts: ', posts)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}
