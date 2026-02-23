<template>
  <section
    class="relative overflow-visible bg-zenith-bg-secondary-light px-4 pb-20 pt-28 dark:bg-zenith-bg-secondary-dark sm:px-6 sm:pt-52 lg:px-8 lg:pt-52"
    :aria-labelledby="introId"
  >
    <div class="mx-auto max-w-6xl">
      <div
        v-if="$slots.mockups"
        class="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <slot name="mockups" />
      </div>

      <div class="mx-auto max-w-4xl text-center">
        <h2
          :id="introId"
          class="mb-6 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl lg:text-4xl"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <p
          class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
        >
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
