const Post = require('@models/posts')
const Joi = require('@hapi/joi')

// POST /prv/posts
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string().allow(''),
    thumbnail: Joi.string().allow(''),
    intro: Joi.string().allow('')
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  const { title } = req.body

  try {
    const { insertId } = await Post.private.create(req.body)
    res.status(200).json({ postId: insertId, title })
  } catch (err) {
    next(err)
  }
}
