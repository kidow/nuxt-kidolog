const Post = require('@models/posts')
const Joi = require('@hapi/joi')

// POST /prv/posts
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string().required(),
    thumbnail: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  try {
    const { insertId } = await Post.private.create(req.body)
    res.status(200).json({ postId: insertId })
  } catch (err) {
    next(err)
  }
}
