const { NODE_ENV, SENTRY_DSN } = process.env
const TITLE = 'Kidolog'
const DESCRIPTION = 'Kidow Blog'
const IMAGE =
  'https://kidolog-v2.s3.ap-northeast-2.amazonaws.com/kidolog-icon.png'
const PUBLIC_LINK = 'https://www.kidolog.com'
const COLOR = '#e8590c'
const BASE_URL =
  NODE_ENV === 'production' ? PUBLIC_LINK : 'http://localhost:3000'

module.exports = {
  mode: 'universal',
  srcDir: 'app/',
  head: {
    title: TITLE,
    meta: [
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      },
      { hid: 'canonical', rel: 'canonical', href: PUBLIC_LINK },
      {
        'http-equiv': 'cache-control',
        content: 'no-cache, no-store, must-revalidate'
      },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'mostpeople' },
      { hid: 'keywords', name: 'keywords', content: 'social' },
      { hid: 'image', name: 'image', content: IMAGE },
      {
        name: 'msapplication-TileColor',
        content: COLOR
      },
      {
        name: 'theme-color',
        content: COLOR
      },

      // Open Graph
      { hid: 'og-site_name', property: 'og:site_name', content: TITLE },
      { hid: 'og-title', property: 'og:title', content: TITLE },
      {
        hid: 'og-description',
        property: 'og:description',
        content: DESCRIPTION
      },
      { hid: 'og-image', property: 'og:image', content: IMAGE },
      { hid: 'og-type', property: 'og:type', content: 'article' },
      { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
      { hid: 'og-image-width', property: 'og:image:width', content: '1200' },
      { hid: 'og-image-height', property: 'og:image:height', content: '630' },
      {
        hid: 'og-image-alt',
        property: 'og:image:alt',
        content: '###Kidolog###'
      },
      { hid: 'og-url', property: 'og:url', content: PUBLIC_LINK },

      // Twiiter
      { hid: 'twitter-site', property: 'twitter:site', content: '@mostpeople' },
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-title', property: 'twitter:title', content: TITLE },
      {
        hid: 'twitter-description',
        property: 'twitter:description',
        content: DESCRIPTION
      },
      { hid: 'twitter-image', property: 'twitter:image', content: IMAGE },
      {
        hid: 'twitter-domain',
        property: 'twitter:domain',
        content: PUBLIC_LINK
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Serif+KR:500,700&subset=korean'
      }
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.11.2/js/all.js'
      }
    ]
  },
  env: { BASE_URL },
  loading: { color: COLOR },

  css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],

  plugins: [
    '@/plugins/element-ui',
    { src: '~/plugins/vue-clipboard2', ssr: false },
    { src: '~/plugins/vue-custom', ssr: true },
    { src: '~/plugins/vue-affix', ssr: false }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: PUBLIC_LINK,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    routes: async () => {
      // const axios = require('axios')
      const api = `${BASE_URL}/sitemaps`

      try {
        // const { data } = await axios.get(api)
        // return data
      } catch (err) {
        console.error('failed to generate sitemap.', err)
      }
    }
  },
  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/sentry',
    '@nuxtjs/pwa',
    '@nuxtjs/device',
    ['@nuxtjs/moment', { locales: ['ko'], defaultLocales: 'ko' }],
    ['@nuxtjs/sitemap'],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-152828817-1'
      }
    ]
  ],
  sentry: {
    dsn: SENTRY_DSN,
    config: {}
  },
  manifest: {
    name: DESCRIPTION,
    short_name: TITLE,
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: COLOR,
    background_color: COLOR,
    display: 'standalone',
    start_url: '/?utm_source=homescreen'
  },
  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
