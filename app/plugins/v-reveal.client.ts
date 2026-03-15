import type { Directive, DirectiveBinding } from 'vue'

type RevealOptions = {
  delay?: number
  duration?: number
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

/**
 * Applies the initial hidden state to the element before it enters the viewport.
 */
function applyInitialState(el: HTMLElement, options: RevealOptions): void {
  const distance: number = options.distance ?? 32
  const direction: string = options.direction ?? 'up'

  const transformMap: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }

  el.style.opacity = '0'
  el.style.transform = transformMap[direction] ?? `translateY(${distance}px)`
  el.style.willChange = 'opacity, transform'
}

/**
 * Triggers the visible (revealed) state with a CSS transition.
 */
function applyRevealedState(el: HTMLElement, options: RevealOptions): void {
  const duration: number = options.duration ?? 600
  const delay: number = options.delay ?? 0

  el.style.transition = `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  el.style.opacity = '1'
  el.style.transform = 'none'
}

const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions | undefined>): void {
    const options: RevealOptions = binding.value ?? {}

    applyInitialState(el, options)

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            applyRevealedState(el, options)
            observer.unobserve(el)
          }
        })
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.08,
      },
    )

    observer.observe(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', vReveal)
})
