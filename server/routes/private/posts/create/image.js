// POST /prv/image
module.exports = (req, res, next) => {
  try {
    res
      .status(200)
      .json({ image: `\n![${req.file.originalname}](${req.file.location})` })
  } catch (err) {
    next(err)
  }
}
