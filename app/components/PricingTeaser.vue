<template>
  <section
    id="pricing"
    class="relative overflow-hidden bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
    aria-labelledby="pricing-teaser-heading"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-zenith-gold-vivid/4 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
            <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
              {{ $t('pricing.eyebrow') }}
            </span>
          </div>
          <h2
            id="pricing-teaser-heading"
            class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t('pricing.teaserTitle') }}
          </h2>
          <p class="mt-3 max-w-md text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('pricing.teaserSubtitle') }}
          </p>
        </div>

        <!-- Installment badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-4 py-2 dark:border-zenith-gold-vivid/20">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" class="text-zenith-gold-vivid">
            <path d="M6.5 1L8.09 4.26L11.5 4.77L9 7.24L9.59 10.5L6.5 8.87L3.41 10.5L4 7.24L1.5 4.77L4.91 4.26L6.5 1Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" />
          </svg>
          <span class="text-xs font-semibold text-zenith-gold-vivid">
            {{ $t('pricing.installment') }}
          </span>
        </div>
      </div>

      <!-- Price anchors -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article
          v-for="(plan, index) in teaserPlans"
          :key="plan.id"
          class="group relative flex flex-col justify-between rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
          :class="plan.id === 'showcase-advanced'
            ? 'border-zenith-gold-vivid/40 bg-zenith-bg-light shadow-lg shadow-zenith-gold-vivid/8 dark:border-zenith-gold-vivid/30 dark:bg-zenith-bg-dark'
            : 'border-zenith-bronze-dark/10 bg-zenith-bg-light hover:border-zenith-gold-bronze/30 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-dark'"
        >
          <!-- Popular badge -->
          <span
            v-if="plan.id === 'showcase-advanced'"
            class="absolute right-4 top-4 rounded-full border border-zenith-gold-vivid/40 bg-zenith-gold-vivid/10 px-2.5 py-0.5 text-xs font-semibold text-zenith-gold-vivid"
          >
            {{ $t('pricing.popular') }}
          </span>

          <!-- Plan index -->
          <span class="mb-3 font-mono text-xs font-medium text-zenith-gold-vivid/40" aria-hidden="true">
            0{{ index + 1 }}
          </span>

          <!-- Plan name -->
          <h3 class="mb-1 text-base font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
            {{ $t(plan.titleKey) }}
          </h3>
          <p class="mb-5 text-xs leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t(plan.descriptionKey) }}
          </p>

          <!-- Price -->
          <div>
            <p class="mb-0.5 text-xs font-medium uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pricing.startingFrom') }}
            </p>
            <p
              class="text-3xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
              :class="{ 'text-zenith-gold-vivid': plan.id === 'showcase-advanced' }"
            >
              {{ discountedPrice(plan.basePrice) }}<span class="text-lg">€</span>
            </p>
            <p
              v-if="plan.monthlyFeeKey"
              class="mt-1 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(plan.monthlyFeeKey) }}
            </p>
          </div>
        </article>
      </div>

      <!-- CTA -->
      <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('pricing.teaserNote') }}
        </p>
        <Button as-child variant="gold" :aria-label="$t('pricing.teaserCta')">
          <NuxtLink :to="localePath('/pricing')">
            {{ $t('pricing.teaserCta') }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { pricingPlans, DISCOUNT_PERCENTAGE, type PricingPlan } from '~/constants/pricing'

const localePath = useLocalePath()

const teaserPlans: PricingPlan[] = pricingPlans.filter(
  (plan: PricingPlan) => plan.id !== 'seo-audit',
)

/**
 * Calculates the discounted price for a plan
 * @param basePrice - Original base price in euros
 * @returns Discounted price rounded to nearest integer
 */
const discountedPrice = (basePrice: number): number => {
  if (DISCOUNT_PERCENTAGE === 0) return basePrice
  return Math.round(basePrice * (1 - DISCOUNT_PERCENTAGE / 100))
}
</script>
