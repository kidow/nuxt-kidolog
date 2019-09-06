module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요' })
  next()
}
