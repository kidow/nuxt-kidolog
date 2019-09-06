const Post = require('@models/posts')
const Joi = require('@hapi/joi')

// PUT /prv/posts/:postId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string().required(),
    thumbnail: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  const { postId } = req.params
  try {
    await Post.private.update([req.body, postId])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
