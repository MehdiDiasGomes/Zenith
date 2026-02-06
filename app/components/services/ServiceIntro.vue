<template>
  <section
    class="relative px-4 py-16 sm:px-6 lg:px-8"
    :aria-labelledby="introId"
  >
    <div class="mx-auto max-w-4xl text-center">
      <motion.h2
        :id="introId"
        class="mb-6 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3 }"
        :in-view-options="{ once: true }"
      >
        {{ title }}
      </motion.h2>

      <motion.p
        class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.1 }"
        :in-view-options="{ once: true }"
      >
        {{ description }}
      </motion.p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

interface ServiceIntroProps {
  title: string
  description: string
}

defineProps<ServiceIntroProps>()

const introId: string = 'service-intro'
</script>
