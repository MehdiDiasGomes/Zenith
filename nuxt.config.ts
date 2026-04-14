// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  sourcemap: {
    server: false,
    client: false,
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'author', content: 'Zenith' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  runtimeConfig: {
    resendApiKey: '',
    contactEmail: '',
    recaptchaSecretKey: '',
    public: {
      recaptchaSiteKey: '',
    },
  },
  critters: {
    config: {
      preload: 'swap',
    },
  },
  modules: [
    '@nuxtjs/critters',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],
  site: {
    url: 'https://www.dg-zenith.com',
    name: 'Zenith',
  },
  sitemap: {
    urls: [
      { loc: '/' },
      { loc: '/services' },
      { loc: '/portfolio' },
      { loc: '/pricing' },
      { loc: '/contact' },
      { loc: '/faq' },
      { loc: '/legal' },
      { loc: '/privacy' },
    ],
  },
  fonts: {
    families: [{ name: 'Montserrat', provider: 'google' }],
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
  },
  i18n: {
    locales: [
      {
        name: 'Français',
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.json',
      },
      {
        name: 'English',
        code: 'en',
        language: 'en-US',
        file: 'en.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    baseUrl: 'https://www.dg-zenith.com',
  },
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-XSS-Protection': '1; mode=block',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
})
