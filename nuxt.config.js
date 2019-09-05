const { NODE_ENV } = process.env
const TITLE = 'Kidolog'
const DESCRIPTION = "Kidow's Blog"
const IMAGE = ''
const PUBLIC_LINK = 'https://www.kidolog.com'
const COLOR = '#fd7e14'
const BASE_URL =
  NODE_ENV === 'production' ? PUBLIC_LINK : 'http://localhost:3000'

module.exports = {
  mode: 'universal',
  srcDir: 'app/',
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700&display=swap&subset=korean'
      }
    ]
  },
  env: { BASE_URL },
  loading: { color: COLOR },

  css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],

  plugins: ['@/plugins/element-ui'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {
    baseURL: BASE_URL,
    credentials: true,
    proxy: false,
    debug: false,
    retry: {
      retries: NODE_ENV === 'production' ? 3 : 0
    },
    requestInterceptor: config => {
      config.headers.common['Authorization'] = ''
      config.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded;application/json'
      return config
    }
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
