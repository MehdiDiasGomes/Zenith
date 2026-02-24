<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isPromoBannerVisible"
      class="fixed bottom-4 left-4 right-4 z-50 sm:left-6 sm:right-auto sm:max-w-sm"
      role="banner"
    >
      <div
        class="overflow-hidden rounded-2xl border border-zenith-gold-vivid/30 bg-zenith-bg-dark/95 p-4 shadow-xl shadow-black/20 backdrop-blur-xl"
      >
        <!-- Gold accent line -->
        <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne" />

        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zenith-gold-vivid/15">
            <Icon name="Percent" size="18" class="text-zenith-gold-vivid" aria-hidden="true" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white">
              {{ $t('promo.discount') }}
            </p>
            <p class="mt-0.5 text-xs text-white/60">
              {{ $t('promo.description') }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <a
              href="#pricing"
              class="rounded-lg bg-zenith-gold-vivid px-3 py-1.5 text-xs font-semibold text-zenith-bg-dark transition-all duration-200 hover:bg-zenith-champagne"
              @click="closeBanner"
            >
              {{ $t('promo.cta') }}
            </a>
            <button
              type="button"
              :aria-label="$t('promo.close')"
              class="rounded-lg p-1.5 text-white/40 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              @click="closeBanner"
            >
              <Icon name="X" size="14" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isPromoBannerVisible, initializeBanner, closeBanner } = usePromoBanner()

onMounted(() => {
  initializeBanner()
})
</script>
