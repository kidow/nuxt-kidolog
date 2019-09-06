const { Nuxt, Builder } = require('nuxt')
const config = require('../../../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

module.exports = async app => {
  const nuxt = new Nuxt(config)

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  try {
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    app.use(nuxt.render)
    app.listen(port, host)
    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    console.error(err, 'failed to start nuxt via node.')
  }
}
