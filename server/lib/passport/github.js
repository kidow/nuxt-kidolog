const GithubStrategy = require('passport-github').Strategy
const { passportOauth } = require('@utils')
const { NODE_ENV, GITHUB_APP_ID, GITHUB_SECRET_KEY } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_APP_ID,
        clientSecret: GITHUB_SECRET_KEY,
        callbackURL: `${BASE_URL}/auth/callback/github`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
