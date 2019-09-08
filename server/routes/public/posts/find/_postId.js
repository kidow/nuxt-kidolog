const Post = require('@models/posts')
const Comment = require('@models/comments')

// GET /posts/:postId
module.exports = async (req, res, next) => {
  const { postId } = req.params
  try {
    const [post, comments] = await Promise.all([
      Post.findById(postId),
      Comment.findByPostId(postId)
    ])
    res.status(200).json({ post, comments })
  } catch (err) {
    next(err)
  }
}
