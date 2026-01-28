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
      class="fixed bottom-0 left-0 right-0 z-50 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md"
      role="banner"
    >
      <div
        class="rounded-none bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid p-4 sm:rounded-2xl"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Icon name="Sparkles" size="20" class="text-white" aria-hidden="true" />
            </div>
            <div class="flex-1">
              <p class="mb-1 text-sm font-bold text-white">
                {{ $t('promo.discount') }}
              </p>
              <p class="mb-3 text-xs text-white/90">
                {{ $t('promo.description') }}
              </p>
              <a
                href="#pricing"
                class="inline-block rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zenith-gold-bronze transition-all duration-200 hover:bg-white/90"
                @click="closeBanner"
              >
                {{ $t('promo.cta') }}
              </a>
            </div>
          </div>
          <button
            type="button"
            :aria-label="$t('promo.close')"
            class="rounded-md p-1 text-white transition-colors duration-200 hover:bg-white/20"
            @click="closeBanner"
          >
            <Icon name="X" size="16" aria-hidden="true" />
          </button>
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
