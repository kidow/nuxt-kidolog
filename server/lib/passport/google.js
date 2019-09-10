const GoogleStrategy = require('passport-google-oauth20').Strategy
const { passportOauth } = require('@utils')
const { NODE_ENV, GOOGLE_APP_ID, GOOGLE_SECRET_KEY } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_SECRET_KEY,
        callbackURL: `${BASE_URL}/auth/callback/google`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
