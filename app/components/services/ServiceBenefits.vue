<template>
  <section
    class="px-4 py-20 sm:px-6 lg:px-8"
    :aria-labelledby="benefitsId"
  >
    <div class="mx-auto max-w-5xl">
      <!-- Stats bar -->
      <div class="mb-20 grid grid-cols-3 gap-4 border-b border-t border-zenith-bronze-dark/10 py-8 dark:border-zenith-gold-bronze/10">
        <div
          v-for="stat in stats"
          :key="stat.key"
          class="text-center"
        >
          <p class="text-2xl font-bold text-zenith-gold-vivid md:text-3xl">
            {{ stat.value }}
          </p>
          <p class="mt-1 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-sm">
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- Two-column layout -->
      <div class="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <!-- Left: editorial text block -->
        <div class="flex flex-col justify-center">
          <div class="mb-6 flex items-center gap-3">
            <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
            <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
              {{ $t('pages.services.benefits.eyebrow') }}
            </span>
          </div>
          <h2
            :id="benefitsId"
            class="font-bold leading-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ title }}
          </h2>
          <p class="mt-6 leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('pages.services.benefits.description') }}
          </p>
        </div>

        <!-- Right: clean list -->
        <ul class="space-y-8" role="list">
          <li
            v-for="benefit in benefits"
            :key="benefit.key"
            class="group flex items-start gap-4"
          >
            <div class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-zenith-gold-bronze/20 text-zenith-gold-vivid/70 transition-all duration-300 group-hover:border-zenith-gold-vivid/60 group-hover:bg-zenith-gold-vivid/8 group-hover:text-zenith-gold-vivid dark:border-zenith-gold-bronze/20">
              <Icon :name="benefit.icon" size="16" aria-hidden="true" />
            </div>
            <div>
              <h3 class="mb-1 text-base font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ benefit.title }}
              </h3>
              <p class="text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ benefit.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Benefit {
  key: string
  icon: string
  title: string
  description: string
}

interface Stat {
  key: string
  value: string
  label: string
}

interface ServiceBenefitsProps {
  title: string
  benefits: Benefit[]
  stats: Stat[]
}

defineProps<ServiceBenefitsProps>()

const benefitsId: string = 'service-benefits'
</script>
