// POST /prv/posts/thumbnail
module.exports = (req, res, next) => {
  try {
    res.status(200).json({ thumbnail: req.file.location })
  } catch (err) {
    next(err)
  }
}
