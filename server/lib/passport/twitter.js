const TwitterStrategy = require('passport-twitter').Strategy
const passportOauth = require('@utils/passportOauth')
const { NODE_ENV, TWITTER_APP_ID, TWITTER_SECRET_KEY } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: TWITTER_APP_ID,
        consumerSecret: TWITTER_SECRET_KEY,
        callbackURL: `${BASE_URL}/auth/callback/twitter`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
