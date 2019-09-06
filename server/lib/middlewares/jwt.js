const { encodeToken, decodeToken } = require('@lib/jwt')
const cookieOptions = require('@utils/cookie')

module.exports = async (req, res, next) => {
  const token = req.cookies['access_token']
  if (!token) return next()

  try {
    const decoded = await decodeToken(token)
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const refreshToken = await encodeToken(decoded, 'user')
      res.cookie('access_token', refreshToken, cookieOptions(1))
    }
    req.user = decoded
  } catch (e) {
    req.user = null
  }

  next()
}
