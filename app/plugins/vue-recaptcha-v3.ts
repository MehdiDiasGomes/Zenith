import { VueReCaptcha } from 'vue-recaptcha-v3'

/**
 * Registers reCAPTCHA v3 only on the contact page to avoid loading
 * the ~500KB Google script on every route.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()

  const isContactPage = (path: string): boolean =>
    path === '/contact' || path === '/en/contact'

  let installed: boolean = false

  const install = (): void => {
    if (installed) return
    installed = true
    nuxtApp.vueApp.use(VueReCaptcha, {
      siteKey: config.public.recaptchaSiteKey as string,
      loaderOptions: {
        autoHideBadge: true,
        useRecaptchaNet: true,
      },
    })
  }

  if (isContactPage(router.currentRoute.value.path)) {
    install()
    return
  }

  router.afterEach((to) => {
    if (isContactPage(to.path)) {
      install()
    }
  })
})
