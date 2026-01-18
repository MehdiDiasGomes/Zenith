<template>
  <section
    id="pricing"
    class="relative bg-zenith-bg-light px-4 py-20 dark:bg-zenith-bg-dark sm:px-6 lg:px-8"
  >
    <div ref="_elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('pricing.title') }}
        </h2>
        <h3 class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('pricing.subtitle') }}
        </h3>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(plan, index) in pricingPlans"
          :key="plan.id"
          :ref="(el) => setCardRef(el, index)"
          class="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-dashed border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
          :class="getCardAnimationClass(index)"
        >
          <div class="p-6">
            <h3
              class="mb-4 text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t(plan.titleKey) }}
            </h3>

            <p
              class="mb-6 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(plan.descriptionKey) }}
            </p>

            <ul class="space-y-3">
              <li
                v-for="(feature, featureIndex) in plan.features"
                :key="featureIndex"
                class="flex items-start gap-2 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                <Icon
                  name="Check"
                  size="16"
                  class="mt-0.5 shrink-0 text-zenith-gold-vivid"
                  aria-hidden="true"
                />
                <span>{{ $t(feature.textKey) }}</span>
              </li>
            </ul>
          </div>

          <div
            class="mt-auto border-t border-zenith-bronze-dark/10 p-6 dark:border-zenith-gold-bronze/20"
          >
            <NuxtLink
              to="#contact"
              class="block rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-6 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
            >
              {{ $t('pricing.getQuote') }}
            </NuxtLink>
          </div>

          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricingPlans } from '~/constants/pricing'

const { elementRef: _elementRef, animationClasses } = useScrollAnimation('fade-up')

const cardRefs = ref<(HTMLElement | null)[]>([])
const visibleCards = ref<Set<number>>(new Set())

const setCardRef = (
  el: HTMLElement | Element | ComponentPublicInstance | null,
  index: number,
): void => {
  if (el && 'nodeType' in el) {
    cardRefs.value[index] = el as HTMLElement
  }
}

const getCardAnimationClass = (index: number): string => {
  const delays = ['animate-delay-100', 'animate-delay-300', 'animate-delay-500']
  const animations = ['animate-flip-up', 'animate-flip-up', 'animate-flip-up']

  if (visibleCards.value.has(index)) {
    return `${animations[index]} ${delays[index]} animate-duration-700`
  }
  return 'opacity-0'
}

onMounted(() => {
  if (!import.meta.client) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.value.findIndex((ref) => ref === entry.target)
          if (index !== -1) {
            visibleCards.value.add(index)
          }
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px',
    },
  )

  cardRefs.value.forEach((ref) => {
    if (ref && 'nodeType' in ref) {
      observer.observe(ref)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
