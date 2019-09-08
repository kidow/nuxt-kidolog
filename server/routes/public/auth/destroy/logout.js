const { cookieOptions } = require('@utils')

// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.clearCookie('access_token', cookieOptions())
  res.status(200).json(true)
}
