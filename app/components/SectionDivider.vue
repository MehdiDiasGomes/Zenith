<template>
  <div class="relative overflow-hidden border-y border-zenith-gold-bronze/12 dark:border-zenith-gold-bronze/8">
    <!-- Subtle background fill -->
    <div
      class="absolute inset-0 bg-zenith-bg-secondary-light/60 dark:bg-zenith-bg-secondary-dark/40"
      aria-hidden="true"
    />
    <!-- Left/right edge fade to blend with adjacent sections -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zenith-bg-light to-transparent dark:from-zenith-bg-dark"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zenith-bg-light to-transparent dark:from-zenith-bg-dark"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col divide-y divide-zenith-gold-bronze/10 sm:flex-row sm:divide-x sm:divide-y-0 dark:divide-zenith-gold-bronze/8"
      >
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          class="divider-item flex items-center gap-3.5 py-5 sm:flex-1 sm:px-8 sm:py-6"
          :style="{ '--item-delay': `${index * 0.08}s` }"
        >
          <!-- Gold diamond accent -->
          <span
            class="shrink-0 text-[10px] leading-none text-zenith-gold-vivid/50"
            aria-hidden="true"
          >
            ◆
          </span>

          <div>
            <p class="text-sm font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              {{ $t(pillar.titleKey) }}
            </p>
            <p class="mt-0.5 text-xs leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t(pillar.subtitleKey) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Pillar {
  titleKey: string
  subtitleKey: string
}

const pillars: Pillar[] = [
  { titleKey: 'divider.custom.title', subtitleKey: 'divider.custom.subtitle' },
  { titleKey: 'divider.pricing.title', subtitleKey: 'divider.pricing.subtitle' },
  { titleKey: 'divider.support.title', subtitleKey: 'divider.support.subtitle' },
]
</script>

<style scoped>
.divider-item {
  animation: dividerIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--item-delay, 0s);
}

@keyframes dividerIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
