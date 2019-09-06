// DELETE /auth/logout
module.exports = (req, res) => {
  const options = {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.kidolog.com' : 'localhost'
  }
  req.logout()
  req.session.destroy()
  req.user = null
  res.clearCookie('access_token', options)
  res.status(200).json(true)
}
