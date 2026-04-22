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
              class="mb-3 text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t(plan.titleKey) }}
            </h3>

            <p
              class="mb-6 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(plan.descriptionKey) }}
            </p>

            <div class="mb-8">
              <div class="flex items-end gap-2">
                <span
                  class="mb-2 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  {{ $t('pricing.startingFrom') }}
                </span>
                <span class="text-5xl font-extrabold text-zenith-gold-vivid">
                  {{ plan.basePrice }}€
                </span>
              </div>
            </div>

            <div
              class="mb-6 h-px w-full bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent"
            />

            <div class="space-y-5">
              <div v-for="(group, groupIndex) in plan.featureGroups" :key="groupIndex">
                <p
                  v-if="group.titleKey"
                  class="mb-3 text-xs font-semibold uppercase tracking-wider text-zenith-gold-bronze dark:text-zenith-champagne/70"
                >
                  {{ $t(group.titleKey) }}
                </p>
                <ul class="space-y-3">
                  <li
                    v-for="(feature, featureIndex) in group.features"
                    :key="featureIndex"
                    class="flex items-start gap-3 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                  >
                    <div
                      class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zenith-gold-vivid/10"
                    >
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
            </div>
          </div>

          <div class="mt-auto p-8 pt-0">
            <Button as-child variant="gold" class="w-full justify-center">
              <NuxtLink :to="localePath('/contact')">
                {{ $t('pricing.getQuote') }}
              </NuxtLink>
            </Button>
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
            <h4
              class="mb-2 font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t('pricing.priceInfo.title') }}
            </h4>
            <p
              class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t('pricing.priceInfo.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { pricingPlans } from '~/constants/pricing'

const localePath = useLocalePath()
</script>
