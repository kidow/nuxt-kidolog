const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const { NODE_ENV } = process.env

// PUT /prt/comments/:commentId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    userId: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error)
    return NODE_ENV === 'development' ? next(error) : res.sendStatus(400)

  const { commentId } = req.params
  const { userId } = req.body

  if (req.user.id !== userId)
    return res.status(401).json({ message: '남의 댓글을 지우려 하지 마세요' })

  try {
    await Comment.protected.update([req.body, commentId])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
