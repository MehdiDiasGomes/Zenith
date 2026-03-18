export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('auto-animate', {
    getSSRProps() {
      return {}
    },
  })
})
