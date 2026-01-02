export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in'
  | 'scale-in'

interface UseScrollAnimationReturn {
  elementRef: Ref<HTMLElement | null>
  animationClasses: ComputedRef<string>
}

export const useScrollAnimation = (
  type: AnimationType = 'fade-up',
  delay: number = 0,
): UseScrollAnimationReturn => {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref<boolean>(false)

  onMounted(() => {
    if (!elementRef.value || !import.meta.client) return

    const element = elementRef.value

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            setTimeout(() => {
              isVisible.value = true
            }, delay)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px',
      },
    )

    observer.observe(element)

    onUnmounted(() => {
      observer.disconnect()
    })
  })

  const animationClasses = computed(() => {
    const baseClasses = 'transition-all duration-700 ease-out'
    const animations = {
      'fade-up': 'opacity-0 translate-y-12',
      'fade-down': 'opacity-0 -translate-y-12',
      'fade-left': 'opacity-0 translate-x-12',
      'fade-right': 'opacity-0 -translate-x-12',
      'fade-in': 'opacity-0',
      'scale-in': 'opacity-0 scale-95',
    }

    if (isVisible.value) {
      return `${baseClasses} opacity-100 translate-x-0 translate-y-0 scale-100`
    }

    return `${baseClasses} ${animations[type]}`
  })

  return {
    elementRef,
    animationClasses,
  }
}
