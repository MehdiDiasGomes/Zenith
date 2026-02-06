<template>
  <section
    class="relative px-4 py-16 sm:px-6 lg:px-8"
    :aria-labelledby="featuresId"
  >
    <div class="mx-auto max-w-6xl">
      <motion.h2
        :id="featuresId"
        class="mb-12 text-center text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3 }"
        :in-view-options="{ once: true }"
      >
        {{ title }}
      </motion.h2>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <motion.div
          v-for="(feature, index) in features"
          :key="feature.key"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: index * 0.1 }"
          :in-view-options="{ once: true }"
          class="group relative overflow-clip rounded-3xl border border-zenith-gold-bronze/20 bg-gradient-to-br from-zenith-gold-vivid/5 to-zenith-gold-bronze/5 p-6 transition-all duration-500 hover:border-zenith-gold-vivid/50 hover:shadow-lg hover:shadow-zenith-gold-vivid/20"
          :class="[
            index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : 'md:row-span-2',
          ]"
        >
          <div class="relative z-10 flex h-full flex-col">
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-zenith-gold-vivid/20"
            >
              <Icon
                :name="feature.icon"
                size="24"
                class="text-zenith-gold-vivid"
                aria-hidden="true"
              />
            </div>

            <h3
              class="mb-3 text-xl font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ feature.title }}
            </h3>

            <p
              class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ feature.description }}
            </p>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-br from-zenith-gold-vivid/0 to-zenith-gold-vivid/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

interface Feature {
  key: string
  icon: string
  title: string
  description: string
}

interface ServiceFeaturesProps {
  title: string
  features: Feature[]
}

defineProps<ServiceFeaturesProps>()

const featuresId: string = 'service-features'
</script>
