<template>
  <section
    class="bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
    :aria-labelledby="introId"
  >
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <div class="mb-6 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('pages.services.intro.eyebrow') }}
          </span>
        </div>
        <h2
          :id="introId"
          class="mb-6 text-2xl font-bold leading-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl lg:text-4xl"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>
        <p class="text-base leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceIntroProps {
  title?: string
  description: string
}

defineProps<ServiceIntroProps>()

const introId: string = 'service-intro'
</script>
