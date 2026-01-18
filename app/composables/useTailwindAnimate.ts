/**
 * Composable for Tailwind CSS animations with Intersection Observer
 * @param animationClasses - Tailwind animation classes to apply when visible
 * @returns Object containing element ref and computed classes
 */
export const useTailwindAnimate = (
  animationClasses: string,
): {
  elementRef: Ref<HTMLElement | null>
  classes: ComputedRef<string>
} => {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref<boolean>(false)

  onMounted(() => {
    if (!import.meta.client) return

    const element = elementRef.value

    if (!element || !('nodeType' in element)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
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

  const classes = computed(() => {
    if (isVisible.value) {
      return animationClasses
    }
    return 'opacity-0'
  })

  return {
    elementRef,
    classes,
  }
}
