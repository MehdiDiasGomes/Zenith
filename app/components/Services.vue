<template>
  <section
    id="services"
    :aria-label="$t('services.ariaLabel')"
    class="relative px-4 py-20 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <motion.h2
          id="services-heading"
          :initial="{ opacity: 0, y: 20 }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('services.title') }}
        </motion.h2>
        <motion.h3
          :initial="{ opacity: 0, y: 20 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          :while-in-view="{ opacity: 1, y: 0 }"
        >
          {{ $t('services.subtitle') }}
        </motion.h3>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <motion.div
          v-for="(service, index) in serviceList"
          :key="service.id"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: index * 0.2 }"
          :viewport="{ once: true }"
          class="group relative col-span-1 overflow-clip rounded-3xl border border-zenith-gold-bronze/20 bg-gradient-to-br from-zenith-gold-vivid/5 to-zenith-gold-bronze/5 backdrop-blur-sm transition-all duration-500 hover:border-zenith-gold-vivid/50 hover:shadow-2xl hover:shadow-zenith-gold-vivid/20"
          :class="[
            index === 0 || index === 3
              ? 'p-6 md:col-span-2 md:row-span-2 md:p-8'
              : 'p-6 md:row-span-2',
          ]"
        >
          <NuxtImg
            :src="service.imagePath"
            :alt="$t(service.imageAltKey)"
            class="pointer-events-none absolute -bottom-4 -right-12 opacity-20 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-30"
            :class="getImageClass(index)"
            loading="lazy"
          />

          <div class="relative z-10 flex h-full flex-col justify-between">
            <div :class="index === 0 || index === 3 ? 'max-w-lg' : 'max-w-xs'">
              <div
                class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-zenith-gold-vivid/20"
              >
                <Icon
                  :name="service.icon"
                  size="32"
                  class="text-zenith-gold-vivid"
                  aria-hidden="true"
                />
              </div>

              <h3 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ $t(service.titleKey) }}
              </h3>

              <p
                class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                {{ $t(service.descriptionKey) }}
              </p>
            </div>

            <!-- <div
              class="mt-6 flex items-center gap-2 text-sm font-semibold text-zenith-gold-vivid opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <span>{{ $t('services.learnMore') }}</span>
              <Icon name="ArrowRight" size="16" aria-hidden="true" />
            </div> -->
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
import { services } from '~/constants/services'

const serviceList = services

const getImageClass = (index: number): string => {
  return index === 0 || index === 3
    ? 'h-48 w-48 translate-x-8 md:h-64 md:w-64'
    : 'h-32 w-32 translate-x-6'
}
</script>
