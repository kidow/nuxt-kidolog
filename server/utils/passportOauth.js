const User = require('@models/users')

module.exports = async (profile, done) => {
  try {
    const user = await User.findByProviderId(profile.id)
    if (!user) {
      let profileUrl = ''
      switch (profile.provider) {
        case 'facebook':
          profileUrl = profile.profileUrl
          break
        case 'google':
          profileUrl = profile._json.picture
          break
        case 'kakao':
          profileUrl = profile._json.properties.profile_image
          break
        case 'naver':
          profileUrl = profile._json.profile_image
          break
        case 'twitter':
          profileUrl = profile._json.profile_image_url
          break
        case 'github':
          profileUrl = profile._json.avatar_url
          break
        default:
          break
      }
      let payload = {
        status: 1,
        provider: profile.provider,
        providerId: profile.id,
        displayName: profile.displayName,
        profileUrl
      }
      const { insertId } = await User.create(payload)
      payload.id = insertId
      done(null, payload)
    } else done(null, user)
  } catch (err) {
    done(err)
  }
}
