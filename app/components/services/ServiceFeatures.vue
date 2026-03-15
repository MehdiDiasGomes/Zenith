<template>
  <section
    class="px-4 pb-0 pt-20 sm:px-6 lg:px-8"
    :aria-labelledby="featuresId"
  >
    <div class="mx-auto max-w-6xl">
      <!-- Section header -->
      <div class="mb-20">
        <h2
          :id="featuresId"
          class="font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ title }}
        </h2>
        <div class="mt-4 h-px bg-zenith-bronze-dark/10 dark:bg-zenith-gold-bronze/15" aria-hidden="true" />
      </div>

      <!-- Alternating feature rows -->
      <div class="space-y-24">
        <div
          v-for="(feature, index) in features"
          :key="feature.key"
          class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
          :class="index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''"
        >
          <!-- Text side -->
          <div>
            <div class="mb-4 flex items-center gap-3">
              <span class="font-mono text-xs font-medium text-zenith-gold-bronze/60">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="h-px w-6 bg-zenith-gold-bronze/30" aria-hidden="true" />
            </div>
            <h3 class="mb-4 font-bold leading-snug text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              {{ feature.title }}
            </h3>
            <p class="leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ feature.description }}
            </p>
          </div>

          <!-- Illustration side -->
          <div class="flex justify-center">
            <div class="relative w-full max-w-xs">
              <div class="absolute -inset-4 rounded-3xl bg-zenith-gold-vivid/4 blur-xl" aria-hidden="true" />
              <NuxtImg
                :src="feature.illustration"
                :alt="feature.title"
                class="relative w-full opacity-90 dark:opacity-80"
                loading="lazy"
                width="400"
                height="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave divider → ServiceProcess (bg-secondary) -->
    <div class="-mx-4 -mb-px mt-16 sm:-mx-6 lg:-mx-8" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        class="block w-full text-zenith-bg-secondary-light dark:text-zenith-bg-secondary-dark"
      >
        <path
          fill="currentColor"
          d="M0,0 C240,80 480,80 720,40 C960,0 1200,0 1440,60 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  key: string
  icon: string
  title: string
  description: string
  illustration?: string
}

interface ServiceFeaturesProps {
  title: string
  features: Feature[]
}

defineProps<ServiceFeaturesProps>()

const featuresId: string = 'service-features'
</script>
