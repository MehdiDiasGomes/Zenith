<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="isPromoBannerVisible"
      class="fixed left-0 right-0 top-0 z-[100] bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid"
      role="banner"
    >
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <div class="flex flex-1 items-center justify-center gap-2">
          <p class="text-center text-sm font-semibold text-white sm:text-base">
            {{ $t('promo.discount') }}
          </p>
        </div>
        <button
          type="button"
          :aria-label="$t('promo.close')"
          class="rounded-md p-1 text-white transition-colors duration-200 hover:bg-white/20"
          @click="closeBanner"
        >
          <Icon name="X" size="18" aria-hidden="true" />
        </button>
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
