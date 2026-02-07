<template>
  <section
    class="relative px-4 py-16 sm:px-6 lg:px-8"
    :aria-labelledby="introId"
  >
    <div class="mx-auto max-w-4xl text-center">
      <h2
        :id="introId"
        class="mb-6 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
      >
        {{ title }}
      </h2>

      <p
        class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceIntroProps {
  title: string
  description: string
}

defineProps<ServiceIntroProps>()

const introId: string = 'service-intro'
</script>
