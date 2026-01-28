<template>
  <section
    id="pricing"
    class="relative bg-zenith-bg-light px-4 py-20 dark:bg-zenith-bg-dark sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
      <motion.div
        class="mb-12 text-center"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :in-view-options="{ once: true }"
      >
        <h2 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('pricing.title') }}
        </h2>
        <h3 class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('pricing.subtitle') }}
        </h3>
      </motion.div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.article
          v-for="(plan, index) in pricingPlans"
          :key="plan.id"
          class="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-dashed bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/10 border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: index * 0.1 }"
          :in-view-options="{ once: true }"
        >
          <div class="p-6">
            <h3
              class="mb-4 font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
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
        </motion.article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { pricingPlans } from '~/constants/pricing'
</script>
