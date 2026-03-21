<template>
  <div class="relative flex min-h-dvh items-center justify-center overflow-hidden bg-zenith-bg-dark font-montserrat">
    <!-- Ambient particles -->
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <span
        v-for="i in 20"
        :key="i"
        class="particle absolute bottom-0 h-1 w-1 rounded-full bg-zenith-gold-bronze"
        :style="particleStyle(i)"
      />
    </div>

    <!-- Soft glow behind 404 -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zenith-gold-vivid/5 blur-[120px]"
      aria-hidden="true"
    />

    <!-- Content card -->
    <div class="relative z-10 flex flex-col items-center px-6 py-12 text-center animate-fade-in-up">

      <!-- Brand label -->
      <div class="mb-8 flex items-center gap-3" aria-hidden="true">
        <span class="h-px w-10 bg-gradient-to-r from-transparent to-zenith-gold-bronze/60" />
        <span class="text-[0.6rem] font-bold tracking-[0.4em] text-zenith-gold-bronze">ZENITH</span>
        <span class="h-px w-10 bg-gradient-to-l from-transparent to-zenith-gold-bronze/60" />
      </div>

      <!-- Error badge -->
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-bronze/8 px-4 py-1.5 backdrop-blur-sm">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-zenith-gold-vivid" aria-hidden="true" />
        <span class="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zenith-gold-vivid">
          {{ $t('error.label') }}
        </span>
      </div>

      <!-- Monumental 404 -->
      <div class="relative mb-2 leading-none" aria-hidden="true">
        <!-- Ghost layer -->
        <span
          class="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-[clamp(9rem,26vw,17rem)] font-extrabold tracking-tight text-transparent opacity-10"
          style="-webkit-text-stroke: 1px #b6771d; transform: scale(1.06);"
        >404</span>
        <!-- Main gradient text -->
        <span
          class="relative block select-none bg-gradient-to-br from-zenith-bronze-dark via-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-[clamp(9rem,26vw,17rem)] font-extrabold tracking-tight text-transparent drop-shadow-[0_0_60px_rgba(218,165,32,0.3)]"
        >404</span>
      </div>

      <!-- Art deco divider -->
      <div class="mb-8 flex w-56 items-center gap-3 text-zenith-gold-bronze/60" aria-hidden="true">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-zenith-gold-bronze/60 to-transparent" />
        <svg class="h-4 w-4 shrink-0 text-zenith-gold-vivid" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" stroke-width="1.5" />
          <path d="M12 6L18 12L12 18L6 12L12 6Z" fill="currentColor" opacity="0.4" />
        </svg>
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-zenith-gold-bronze/60 to-transparent" />
      </div>

      <!-- Heading -->
      <h1 class="mb-3 text-[clamp(1.4rem,4vw,2.25rem)] font-bold tracking-tight text-zenith-text-primary-dark">
        {{ $t('error.title') }}
      </h1>

      <!-- Subtitle -->
      <p class="mb-2 text-[clamp(0.875rem,2vw,1rem)] font-medium text-zenith-gold-vivid">
        {{ $t('error.subtitle') }}
      </p>

      <!-- Description -->
      <p class="mb-10 max-w-sm text-[clamp(0.8rem,1.5vw,0.9rem)] leading-relaxed text-zenith-text-secondary-dark">
        {{ $t('error.description') }}
      </p>

      <!-- CTA -->
      <button
        class="group inline-flex items-center gap-2.5 rounded-lg border border-zenith-gold-vivid/50 bg-zenith-gold-vivid/8 px-7 py-3.5 text-sm font-semibold text-zenith-gold-vivid backdrop-blur-sm transition-all duration-300 hover:border-zenith-gold-vivid hover:bg-zenith-gold-vivid/15 hover:text-zenith-champagne hover:shadow-[0_8px_32px_rgba(218,165,32,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-zenith-gold-vivid focus-visible:outline-offset-4 active:scale-95"
        @click="handleReturn"
      >
        <svg
          class="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
        </svg>
        {{ $t('error.cta') }}
      </button>

      <!-- Corner ornaments -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <span class="absolute left-0 top-0 h-6 w-6 border-l border-t border-zenith-gold-bronze/25" />
        <span class="absolute right-0 top-0 h-6 w-6 border-r border-t border-zenith-gold-bronze/25" />
        <span class="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-zenith-gold-bronze/25" />
        <span class="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-zenith-gold-bronze/25" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NuxtError {
  statusCode?: number
  statusMessage?: string
  message?: string
}

interface ErrorPageProps {
  error: NuxtError | null
}

defineProps<ErrorPageProps>()

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('error.code')} — ${t('error.title')} | Zenith`,
  robots: 'noindex',
})

/**
 * Returns inline style for a floating particle element.
 * @param index - 1-based index used to derive deterministic position and timing
 * @returns CSS style object with position, size and animation properties
 */
function particleStyle(index: number): Record<string, string> {
  const x: number = (index * 137.508) % 100
  const delay: number = (index * 0.35) % 7
  const duration: number = 9 + (index % 6) * 1.5
  const size: number = 1 + (index % 3)

  return {
    left: `${x}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity: `${0.1 + (index % 4) * 0.07}`,
    animation: `driftUp ${duration}s ${delay}s linear infinite`,
  }
}

/**
 * Clears the current Nuxt error and redirects to the home page.
 */
function handleReturn(): void {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
@keyframes driftUp {
  from { transform: translateY(0) scale(1); }
  to   { transform: translateY(-100vh) scale(0.2); opacity: 0; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.particle {
  animation: driftUp 10s linear infinite;
}
</style>
