const { Nuxt, Builder } = require('nuxt')
const config = require('../../../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const passport = require('passport')

module.exports = async app => {
  const nuxt = new Nuxt(config)

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  try {
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    app.use(require('@lib/session'))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(require('@middle/jwt'))
    app.use('/', require('../../routes'))
    app.use(require('@middle/error'))

    app.use(nuxt.render)
    app.listen(port, host)
    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    console.error(err, 'failed to start nuxt via node.')
  }
}
