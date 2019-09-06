const NaverStrategy = require('passport-naver').Strategy
const passportOauth = require('@utils/passportOauth')
const { NODE_ENV, NAVER_APP_ID, NAVER_SECRET_KEY } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new NaverStrategy(
      {
        clientID: NAVER_APP_ID,
        clientSecret: NAVER_SECRET_KEY,
        callbackURL: `${BASE_URL}/auth/callback/naver`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
