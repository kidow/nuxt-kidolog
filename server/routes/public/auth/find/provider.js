// GET /auth/:provider
module.exports = (req, res, next) => {
  try {
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
