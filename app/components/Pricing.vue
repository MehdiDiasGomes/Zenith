<template>
  <section
    id="pricing"
    class="relative bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
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
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="group relative flex flex-col overflow-hidden rounded-3xl border border-zenith-gold-bronze/30 bg-zenith-bg-light transition-all duration-300 hover:-translate-y-2 hover:border-zenith-gold-vivid dark:bg-zenith-bg-dark"
        >

          <div class="relative p-8">
            <h3
              class="mb-3 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t(plan.titleKey) }}
            </h3>

            <p
              class="mb-6 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(plan.descriptionKey) }}
            </p>

            <div class="mb-8">
              <template v-if="plan.basePrice === 0">
                <div class="flex items-end justify-start py-4">
                  <span class="text-5xl font-extrabold text-zenith-gold-vivid">
                    {{ $t('pricing.free') }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="mb-2 flex items-center gap-3">
                  <span class="text-lg text-zenith-text-secondary-light/50 dark:text-zenith-text-secondary-dark/50 line-through">
                    {{ plan.basePrice }}€
                  </span>
                  <span class="rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    -{{ DISCOUNT_PERCENTAGE }}%
                  </span>
                </div>
                <div class="flex items-end gap-2">
                  <span class="mb-2 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                    {{ $t('pricing.startingFrom') }}
                  </span>
                  <span class="text-5xl font-extrabold text-zenith-gold-vivid">
                    {{ Math.round(plan.basePrice * (1 - DISCOUNT_PERCENTAGE / 100)) }}€
                  </span>
                </div>
                <p
                  v-if="plan.monthlyFeeKey"
                  class="mt-3 text-xs font-medium text-zenith-gold-vivid"
                >
                  {{ $t(plan.monthlyFeeKey) }}
                </p>
              </template>
            </div>

            <div class="mb-6 h-px w-full bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent" />

            <ul class="space-y-4">
              <li
                v-for="(feature, featureIndex) in plan.features"
                :key="featureIndex"
                class="flex items-start gap-3 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zenith-gold-vivid/10">
                  <Icon
                    name="Check"
                    size="14"
                    class="text-zenith-gold-vivid"
                    aria-hidden="true"
                  />
                </div>
                <span>{{ $t(feature.textKey) }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-auto p-8 pt-0">
            <NuxtLink
              to="#contact"
              class="block rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
            >
              {{ plan.id === 'seo-audit' ? $t('pricing.requestAudit') : $t('pricing.getQuote') }}
            </NuxtLink>
          </div>
        </article>
      </div>

      <div
        class="mt-12 rounded-2xl border border-zenith-gold-bronze/30 bg-zenith-bg-secondary-light/50 p-6 dark:bg-zenith-bg-secondary-dark/50"
      >
        <div class="flex items-start gap-3">
          <Icon
            name="Info"
            size="20"
            class="mt-0.5 shrink-0 text-zenith-gold-vivid"
            aria-hidden="true"
          />
          <div>
            <h4 class="mb-2 font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              {{ $t('pricing.priceInfo.title') }}
            </h4>
            <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pricing.priceInfo.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricingPlans, DISCOUNT_PERCENTAGE } from '~/constants/pricing'
</script>
