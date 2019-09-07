const FacebookStrategy = require('passport-facebook').Strategy
const { passportOauth } = require('@utils')
const { NODE_ENV, FACEBOOK_APP_ID, FACEBOOK_SECRET_KEY } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET_KEY,
        callbackURL: `${BASE_URL}/auth/callback/facebook`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
