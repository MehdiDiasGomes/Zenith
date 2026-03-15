<template>
  <section
    class="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
    :aria-labelledby="ctaId"
  >
    <!-- Background photo -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/assets/backgrounds/cta-background.webp')"
      aria-hidden="true"
    />
    <!-- Overlay -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/75" aria-hidden="true" />
    <!-- Gold tint -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-zenith-gold-bronze/10 to-transparent" aria-hidden="true" />

    <!-- Top border accent -->
    <div class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zenith-gold-vivid/50 to-transparent" aria-hidden="true" />

    <div class="relative z-10 mx-auto max-w-3xl text-center">
      <h2
        :id="ctaId"
        class="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
      >
        {{ title }}
      </h2>

      <p class="mb-10 text-base leading-relaxed text-white/80 md:text-lg">
        {{ description }}
      </p>

      <!-- CTA Button -->
      <div class="flex flex-col items-center gap-4">
        <NuxtLink
          :to="localePath('/contact')"
          class="group inline-flex items-center gap-3 rounded-lg bg-zenith-gold-vivid px-8 py-4 text-sm font-semibold text-zenith-bg-dark shadow-lg shadow-zenith-gold-vivid/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zenith-gold-vivid/40"
        >
          {{ buttonText }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>

        <!-- Reassurance text -->
        <p class="flex items-center gap-2 text-xs text-white/50">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1L11 3V7C11 9.5 8.8 11.7 6 12C3.2 11.7 1 9.5 1 7V3L6 1Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
          </svg>
          {{ $t('pages.services.cta.reassurance') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceCTAProps {
  title: string
  description: string
  buttonText: string
}

defineProps<ServiceCTAProps>()

const ctaId: string = 'service-cta'
const localePath = useLocalePath()
</script>
