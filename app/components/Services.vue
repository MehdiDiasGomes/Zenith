<template>
  <section
    id="services"
    :aria-label="$t('services.ariaLabel')"
    class="relative px-4 py-20 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <h2
          id="services-heading"
          class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('services.title') }}
        </h2>
        <h3>
          {{ $t('services.subtitle') }}
        </h3>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        <article
          v-for="(service, index) in serviceList"
          :key="service.id"
          class="group relative overflow-hidden rounded-2xl border transition-all duration-500"
          :class="getCardClasses(index)"
        >
          <div
            class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            :style="{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }"
          />

          <div class="relative z-10 flex h-full flex-col">
            <div class="mb-6 flex items-start justify-between">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:bg-zenith-gold-vivid group-hover:shadow-lg group-hover:shadow-zenith-gold-vivid/25"
              >
                <Icon
                  :name="service.icon"
                  size="28"
                  class="text-zenith-gold-vivid transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
              </div>
              <span
                class="font-mono text-4xl font-bold text-zenith-gold-vivid/10 transition-colors duration-300 group-hover:text-zenith-gold-vivid/20"
              >
                0{{ index + 1 }}
              </span>
            </div>

            <div class="flex-1">
              <h3
                class="mb-3 text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
              >
                {{ $t(service.titleKey) }}
              </h3>

              <p
                class="text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                :class="index === 0 || index === 3 ? 'md:max-w-md' : ''"
              >
                {{ $t(service.descriptionKey) }}
              </p>
            </div>

          </div>

          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-br from-zenith-gold-vivid/0 via-transparent to-zenith-gold-vivid/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { services } from '~/constants/services'

const serviceList = services

/**
 * Returns the appropriate CSS classes for each card based on its position
 * @param index - The index of the card in the grid
 * @returns CSS class string for card styling
 */
const getCardClasses = (index: number): string => {
  const baseClasses =
    'border-zenith-bronze-dark/10 bg-zenith-bg-light hover:border-zenith-gold-vivid/30 hover:shadow-xl hover:shadow-zenith-gold-vivid/5 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-secondary-dark'

  if (index === 0 || index === 3) {
    return `${baseClasses} p-6 md:col-span-4 md:p-8`
  }
  return `${baseClasses} p-6 md:col-span-2`
}
</script>
