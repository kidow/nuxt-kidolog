const Comment = require('@models/comments')
const Joi = require('@hapi/joi')

// POST /prt/comments
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    parentId: Joi.number(),
    postId: Joi.string().required(),
    userId: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  try {
    const { insertId } = await Comment.protected.create(req.body)
    res.status(200).json({ id: insertId, ...req.body })
  } catch (err) {
    next(err)
  }
}
