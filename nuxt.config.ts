// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  plugins: [{ src: '~/plugins/vue-recaptcha-v3.ts', mode: 'client' }],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/image',
    'motion-v/nuxt',
    '@nuxtjs/sitemap',
  ],
  site: {
    url: 'https://www.dg-zenith.com',
    name: 'Zenith',
  },
  sitemap: {
    urls: [
      { loc: '/', changefreq: 'weekly', priority: 1.0 },
      { loc: '/faq', changefreq: 'monthly', priority: 0.8 },
      { loc: '/legal', changefreq: 'yearly', priority: 0.3 },
      { loc: '/privacy', changefreq: 'yearly', priority: 0.3 },
    ],
  },
  fonts: {
    families: [{ name: 'Trirong', provider: 'google' }],
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
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
})
