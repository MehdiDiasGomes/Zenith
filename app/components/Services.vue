<template>
  <section id="services" class="relative px-4 py-20 sm:px-6 lg:px-8">
    <div ref="elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <h2
          class="mb-4 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
        >
          {{ $t('services.title') }}
        </h2>
        <p
          class="mx-auto max-w-2xl text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('services.subtitle') }}
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service.id"
          class="group relative overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light p-6 transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-secondary-dark"
        >
          <div
            class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:bg-zenith-gold-vivid/20"
          >
            <Icon
              :name="service.icon"
              size="24"
              class="text-zenith-gold-vivid"
              aria-hidden="true"
            />
          </div>

          <h3
            class="mb-2 text-lg font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t(service.titleKey) }}
          </h3>

          <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t(service.descriptionKey) }}
          </p>

          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { services } from '~/constants/services'

const { elementRef, animationClasses } = useScrollAnimation('fade-up')
</script>
