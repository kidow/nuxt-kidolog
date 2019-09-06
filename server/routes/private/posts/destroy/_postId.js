const Post = require('@models/posts')

// DELETE /prv/posts/:postId
module.exports = async (req, res, next) => {
  const { postId } = req.params
  try {
    await Post.private.destory(postId)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
