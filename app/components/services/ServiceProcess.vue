<template>
  <section
    class="bg-zenith-bg-secondary-light px-4 pb-20 pt-10 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
    :aria-labelledby="processId"
  >
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-16">
        <div class="mb-4 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('pages.services.process.eyebrow') }}
          </span>
        </div>
        <h2
          :id="processId"
          class="font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('pages.services.process.title') }}
        </h2>
        <p class="mt-4 max-w-2xl text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('pages.services.process.subtitle') }}
        </p>
      </div>

      <!-- Steps -->
      <ol class="relative space-y-0" role="list">
        <!-- Vertical line -->
        <div class="absolute left-[1.75rem] top-0 hidden h-full w-px bg-zenith-bronze-dark/10 dark:bg-zenith-gold-bronze/10 sm:block" aria-hidden="true" />

        <li
          v-for="(step, index) in steps"
          :key="step.key"
          class="relative pl-0 pb-12 last:pb-0 sm:pl-16"
        >
          <!-- Step number bubble -->
          <div
            class="absolute left-0 top-0 hidden h-14 w-14 items-center justify-center rounded-full border border-zenith-gold-bronze/30 bg-zenith-bg-secondary-light text-sm font-bold text-zenith-gold-vivid dark:border-zenith-gold-vivid/20 dark:bg-zenith-bg-secondary-dark sm:flex"
            aria-hidden="true"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <!-- Step content -->
          <div class="flex items-start gap-5 sm:block">
            <!-- Mobile number -->
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zenith-gold-bronze/30 text-xs font-bold text-zenith-gold-vivid dark:border-zenith-gold-vivid/20 sm:hidden">
              {{ index + 1 }}
            </div>
            <div>
              <div class="mb-1 flex items-center gap-3">
                <h3 class="font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                  {{ step.title }}
                </h3>
                <span
                  v-if="step.badge"
                  class="rounded-full border border-zenith-gold-vivid/30 bg-zenith-gold-vivid/10 px-2 py-0.5 text-xs font-medium text-zenith-gold-vivid"
                >
                  {{ step.badge }}
                </span>
              </div>
              <p class="leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ step.description }}
              </p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProcessStep {
  key: string
  title: string
  description: string
  badge?: string
}

interface ServiceProcessProps {
  steps: ProcessStep[]
}

defineProps<ServiceProcessProps>()

const processId: string = 'service-process'
</script>
