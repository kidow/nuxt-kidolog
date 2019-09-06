const User 

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, done)
  })
  passport.deserializeUser((user, done) => {
    User.findById(user.id).then(user => done(null, user)).catch(err => done(err))
  })

  require('./facebook')(passport)
  require('./twitter')(passport)
  require('./github')(passport)
  require('./google')(passport)
}