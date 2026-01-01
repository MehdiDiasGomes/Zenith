<template>
  <section id="pricing" class="relative bg-zenith-bg-light px-4 py-20 dark:bg-zenith-bg-dark sm:px-6 lg:px-8">
    <div ref="elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <h2
          class="mb-4 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
        >
          {{ $t('pricing.title') }}
        </h2>
        <p class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('pricing.subtitle') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="group relative flex flex-col overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
        >
          <div class="p-6">
            <h3 class="mb-4 text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              {{ $t(plan.titleKey) }}
            </h3>

            <p class="mb-6 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t(plan.descriptionKey) }}
            </p>

            <div class="mb-6">
              <div class="flex items-baseline gap-2">
                <span
                  class="text-lg text-zenith-text-secondary-light line-through dark:text-zenith-text-secondary-dark"
                >
                  {{ formatPrice(plan.basePrice) }}
                </span>
                <span class="text-3xl font-bold text-zenith-gold-vivid">
                  {{ formatPrice(calculateDiscountedPrice(plan.basePrice)) }}
                </span>
              </div>
              <p class="mt-1 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('pricing.startingFrom') }}
              </p>
            </div>

            <ul class="space-y-3">
              <li
                v-for="(feature, index) in plan.features"
                :key="index"
                class="flex items-start gap-2 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                <Icon name="Check" size="16" class="mt-0.5 shrink-0 text-zenith-gold-vivid" aria-hidden="true" />
                <span>{{ $t(feature.textKey) }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-auto border-t border-zenith-bronze-dark/10 p-6 dark:border-zenith-gold-bronze/20">
            <NuxtLink
              to="/contact"
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

      <div
        class="mx-auto mt-12 max-w-3xl rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light p-6 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-secondary-dark"
      >
        <div class="flex items-start gap-3">
          <Icon name="Info" size="20" class="mt-0.5 shrink-0 text-zenith-gold-vivid" aria-hidden="true" />
          <div>
            <h4 class="mb-2 font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              {{ $t('pricing.info.title') }}
            </h4>
            <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pricing.info.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricingPlans, DISCOUNT_PERCENTAGE } from '~/constants/pricing'

const calculateDiscountedPrice = (basePrice: number): number => {
  return basePrice * (1 - DISCOUNT_PERCENTAGE / 100)
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

const { elementRef, animationClasses } = useScrollAnimation('fade-up')
</script>
