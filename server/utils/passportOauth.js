const User = require('@models/users')

module.exports = async (profile, done) => {
  console.log('profile: ', profile)
  try {
    const user = await User.findByProviderId(profile.id)[0]
    if (!user) {
      let payload = {
        status: 1,
        provider: profile.provider,
        providerId: profile.id,
        email: profile._json.email || '',
        displayName: profile.displayName,
        profileUrl: profile.profileUrl
      }
      const { insertId } = await User.create(payload)
      payload.id = insertId
      done(null, payload)
    } else done(null, user)
  } catch (err) {
    done(err)
  }
}
