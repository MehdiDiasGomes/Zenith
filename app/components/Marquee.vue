<template>
  <motion.div
    class="relative overflow-hidden border-y border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light py-6 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-secondary-dark"
    :initial="{ opacity: 0, y: 30 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3 }"
    :in-view-options="{ once: true }"
  >
    <div class="animate-marquee flex whitespace-nowrap">
      <div v-for="index in 2" :key="index" class="flex shrink-0">
        <span
          v-for="item in marqueeItems"
          :key="`${index}-${item.id}`"
          class="text-2xl font-bold text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-3xl"
        >
          {{ $t(item.textKey) }}
          <span class="mx-8 text-zenith-gold-vivid">•</span>
        </span>
      </div>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { marqueeItems } from '~/constants/marquee'
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
