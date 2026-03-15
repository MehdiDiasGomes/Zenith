<template>
  <!-- Mobile overlay backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm md:hidden"
      aria-hidden="true"
      @click="closeMobileMenu"
    />
  </Transition>

  <!-- Sticky Navbar -->
  <nav
    :aria-label="$t('nav.ariaLabel')"
    class="sticky top-0 z-[999] bg-zenith-bg-light/95 backdrop-blur-md transition-shadow duration-300 dark:bg-zenith-bg-dark/95"
    :class="isScrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/40' : ''"
  >
    <!-- Gold gradient bottom border -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/60 to-transparent dark:via-zenith-gold-vivid/40" />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between md:h-20">

        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="group relative z-10 flex flex-shrink-0 items-center"
          :aria-label="$t('nav.logoAriaLabel')"
        >
          <NuxtImg
            src="/images/brand/logo.webp"
            alt="Zenith Logo"
            class="h-9 w-auto transition-all duration-300 group-hover:brightness-110 md:h-12"
            loading="eager"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-0 md:flex lg:gap-1">
          <NuxtLink
            v-for="item in desktopNavItems"
            :key="item.to"
            :to="localePath(item.to)"
            class="group relative px-4 py-2 text-sm font-medium transition-colors duration-200 lg:px-5"
            :class="
              isActive(item.to)
                ? 'text-zenith-gold-vivid'
                : 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark'
            "
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ $t(item.label) }}

            <!-- Active underline -->
            <span
              v-if="isActive(item.to)"
              class="absolute bottom-0 left-4 right-4 h-px bg-zenith-gold-vivid lg:left-5 lg:right-5"
            />
          </NuxtLink>
        </div>

        <!-- Right: CTA + Hamburger -->
        <div class="flex items-center gap-3">
          <!-- Desktop CTA -->
          <NuxtLink
            :to="localePath('/contact')"
            class="group hidden items-center gap-2 overflow-hidden rounded-lg border border-zenith-gold-bronze/60 px-5 py-2.5 text-sm font-semibold text-zenith-gold-bronze transition-all duration-300 hover:bg-zenith-gold-vivid hover:border-zenith-gold-vivid hover:text-zenith-bg-dark hover:shadow-md hover:shadow-zenith-gold-vivid/30 md:inline-flex dark:border-zenith-gold-vivid/50 dark:text-zenith-gold-vivid dark:hover:bg-zenith-gold-vivid dark:hover:text-zenith-bg-dark"
          >
            {{ $t('nav.contact') }}
          </NuxtLink>

          <!-- Mobile Hamburger -->
          <button
            type="button"
            :aria-label="$t('nav.toggleMenu')"
            :aria-expanded="mobileMenuOpen"
            class="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-zenith-gold-bronze/30 transition-all duration-200 hover:border-zenith-gold-vivid/60 hover:bg-zenith-gold-vivid/5 dark:border-zenith-gold-vivid/20 md:hidden"
            @click="toggleMobileMenu"
          >
            <!-- Hamburger lines animating into X -->
            <span
              class="h-px w-5 origin-center bg-zenith-gold-bronze transition-all duration-300 dark:bg-zenith-gold-vivid"
              :class="mobileMenuOpen ? 'translate-y-[5px] rotate-45' : ''"
            />
            <span
              class="h-px w-5 bg-zenith-gold-bronze transition-all duration-300 dark:bg-zenith-gold-vivid"
              :class="mobileMenuOpen ? 'w-0 opacity-0' : ''"
            />
            <span
              class="h-px w-5 origin-center bg-zenith-gold-bronze transition-all duration-300 dark:bg-zenith-gold-vivid"
              :class="mobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''"
            />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Drawer (fixed, slides from right) -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="mobileMenuOpen"
      class="fixed inset-y-0 right-0 z-[999] flex w-72 flex-col bg-zenith-bg-light shadow-2xl shadow-black/30 dark:bg-zenith-bg-dark md:hidden"
      role="dialog"
      :aria-label="$t('nav.ariaLabel')"
      aria-modal="true"
    >
      <!-- Drawer top border accent -->
      <div class="h-0.5 w-full bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne" />

      <!-- Drawer Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-zenith-gold-bronze/10 dark:border-zenith-gold-vivid/10">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="$t('nav.logoAriaLabel')"
          @click="closeMobileMenu"
        >
          <NuxtImg
            src="/images/brand/logo.webp"
            alt="Zenith Logo"
            class="h-8 w-auto"
            loading="eager"
          />
        </NuxtLink>

        <button
          type="button"
          :aria-label="$t('nav.toggleMenu')"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          @click="closeMobileMenu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <!-- Drawer Nav Links -->
      <nav class="flex-1 overflow-y-auto px-4 py-6">
        <ul class="space-y-1" role="list">
          <li v-for="item in navItems" :key="item.to" role="listitem">
            <NuxtLink
              :to="localePath(item.to)"
              class="group relative flex items-center gap-4 rounded-lg px-4 py-4 text-sm font-medium transition-all duration-200"
              :class="
                isActive(item.to)
                  ? 'bg-zenith-gold-vivid/10 text-zenith-gold-vivid dark:bg-zenith-gold-vivid/15'
                  : 'text-zenith-text-secondary-light hover:bg-zenith-bg-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:bg-zenith-bg-secondary-dark dark:hover:text-zenith-text-primary-dark'
              "
              :aria-current="isActive(item.to) ? 'page' : undefined"
              @click="closeMobileMenu"
            >
              <!-- Active indicator bar -->
              <span
                class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-200"
                :class="isActive(item.to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'"
              />
              {{ $t(item.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Drawer CTA -->
      <div class="border-t border-zenith-gold-bronze/10 p-6 dark:border-zenith-gold-vivid/10">
        <NuxtLink
          :to="localePath('/contact')"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid py-3.5 text-sm font-semibold text-zenith-bg-dark shadow-md shadow-zenith-gold-vivid/20 transition-all duration-300 hover:shadow-lg hover:shadow-zenith-gold-vivid/30"
          @click="closeMobileMenu"
        >
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { navItems } from '~/constants/navigation'

const route = useRoute()
const localePath = useLocalePath()

const mobileMenuOpen = ref<boolean>(false)
const isScrolled = ref<boolean>(false)

/** Nav items without contact (shown separately as CTA on desktop) */
const desktopNavItems = computed(() =>
  navItems.filter((item) => item.to !== '/contact'),
)

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

const isActive = (path: string): boolean => {
  return route.path === localePath(path)
}

const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>
