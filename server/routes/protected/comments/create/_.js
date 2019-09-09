const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const { NODE_ENV } = process.env

// POST /prt/comments
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    parentId: Joi.number(),
    postId: Joi.string().required(),
    userId: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error)
    return NODE_ENV === 'production' ? next(error) : res.sendStatus(400)

  try {
    const { insertId } = await Comment.protected.create(req.body)
    const { displayName, profileUrl } = req.user
    const payload = {
      id: insertId,
      ...req.body,
      displayName,
      profileUrl,
      createdAt: Date.now(),
      isReply: false,
      isEdit: false,
      reply: '',
      loading: false
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
