const KakaoStartegy = require('passport-kakao').Strategy
const { passportOauth } = require('@utils')
const { NODE_ENV, KAKAO_APP_ID } = process.env
const BASE_URL =
  NODE_ENV === 'production'
    ? 'https://www.kidolog.com'
    : 'http://localhost:3000'

module.exports = passport => {
  passport.use(
    new KakaoStartegy(
      {
        clientID: KAKAO_APP_ID,
        callbackURL: `${BASE_URL}/auth/callback/kakao`
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
