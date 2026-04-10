<template>
  <section
    id="services"
    class="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    aria-labelledby="services-heading"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-zenith-gold-vivid/4 blur-3xl"
      aria-hidden="true"
    />

    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="service-fade mb-14">
        <div class="mb-5 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('services.eyebrow') }}
          </span>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2
            id="services-heading"
            class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t('services.title') }}
          </h2>
          <p class="max-w-sm text-base leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark sm:text-right">
            {{ $t('services.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Editorial service rows -->
      <div class="relative">
        <div
          class="h-px bg-gradient-to-r from-zenith-gold-vivid/40 via-zenith-gold-bronze/20 to-transparent"
          aria-hidden="true"
        />

        <article
          v-for="(service, index) in serviceList"
          :key="service.id"
          class="service-item group relative flex items-center gap-6 py-8 pl-4 md:gap-10 md:py-10"
          :style="{ animationDelay: `${0.15 + index * 0.13}s` }"
        >
          <!-- Hover: gold left bar -->
          <div
            class="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-zenith-gold-vivid via-zenith-gold-bronze to-transparent transition-transform duration-500 group-hover:scale-y-100"
            aria-hidden="true"
          />

          <!-- Icon -->
          <div
            class="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-zenith-bronze-dark/15 bg-zenith-bg-secondary-light transition-all duration-500 group-hover:border-zenith-gold-vivid/40 group-hover:bg-zenith-gold-vivid/8 group-hover:shadow-lg group-hover:shadow-zenith-gold-vivid/15 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-secondary-dark dark:group-hover:border-zenith-gold-vivid/40 dark:group-hover:bg-zenith-gold-vivid/10"
          >
            <Icon
              :name="service.icon"
              size="22"
              class="text-zenith-gold-vivid transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            />
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3
              class="mb-2 text-lg font-bold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark md:text-xl"
            >
              {{ $t(service.titleKey) }}
            </h3>
            <p class="line-clamp-2 max-w-lg text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t(service.descriptionKey) }}
            </p>
          </div>

          <!-- Row separator -->
          <div
            class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-zenith-gold-bronze/20 via-zenith-bronze-dark/10 to-transparent"
            aria-hidden="true"
          />
        </article>
      </div>

      <!-- Teaser + CTA strip -->
      <div
        class="mt-3 flex flex-col items-start justify-between gap-4 rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light px-6 py-4 sm:flex-row sm:items-center dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-secondary-dark"
      >
        <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('services.moreServices') }}
        </p>
        <Button as-child variant="gold" :aria-label="$t('services.ctaButton')">
          <NuxtLink :to="localePath('/services')">
            {{ $t('services.ctaButton') }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { services } from '~/constants/services'

const localePath = useLocalePath()

const serviceList = services.slice(0, 2)
</script>

<style scoped>
.service-fade {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
}

.service-item {
  opacity: 0;
  transform: translateX(-10px);
  animation: slideRight 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
