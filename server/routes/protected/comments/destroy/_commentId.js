const Comment = require('@models/comments')

// DELETE /prt/comments/:commentId
module.exports = async (req, res, next) => {
  const { commentId } = req.params

  try {
    await Comment.protected.destroy(commentId)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
