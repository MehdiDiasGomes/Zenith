const PROMO_END_DATE = new Date('2026-04-30T23:59:59')
const STORAGE_KEY = 'zenith-promo-banner-dismissed'

const isPromoBannerVisible = ref<boolean>(false)

interface UsePromoBannerReturn {
  isPromoBannerVisible: Readonly<Ref<boolean>>
  initializeBanner: () => void
  closeBanner: () => void
}

export const usePromoBanner = (): UsePromoBannerReturn => {
  const checkPromoValidity = (): boolean => {
    const now = new Date()
    return now < PROMO_END_DATE
  }

  const checkBannerDismissed = (): boolean => {
    if (!import.meta.client) return false
    const dismissed = localStorage.getItem(STORAGE_KEY)
    return dismissed === 'true'
  }

  const initializeBanner = (): void => {
    if (import.meta.client && checkPromoValidity() && !checkBannerDismissed()) {
      isPromoBannerVisible.value = true
    }
  }

  const closeBanner = (): void => {
    isPromoBannerVisible.value = false
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
  }

  return {
    isPromoBannerVisible: readonly(isPromoBannerVisible),
    initializeBanner,
    closeBanner,
  }
}
