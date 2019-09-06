const User = require('@models/users')

module.exports = async (profile, done) => {
  console.log('profile: ', profile)
  try {
    const user = await User.findById(profile.id)
    console.log('user: ', user)
    done(null, false)
  } catch (err) {
    done(err)
  }
}