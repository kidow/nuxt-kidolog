const KakaoStartegy = require('passport-kakao').Strategy
const passportOauth = require('@utils/passportOauth')

module.exports = passport => {
  passport.use(
    new KakaoStartegy(
      {
        clientID: process.env.KAKAO_APP_ID,
        callbackURL: '/auth/callback/kakao'
      },
      (accessToken, refreshToken, profile, done) => passportOauth(profile, done)
    )
  )
}
