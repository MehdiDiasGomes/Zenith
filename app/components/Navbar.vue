<template>
  <div class="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
    <nav
      :aria-label="$t('nav.ariaLabel')"
      class="mx-auto max-w-4xl rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light/90 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark/90 dark:shadow-black/30"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between md:h-20">
          <NuxtLink to="/" class="group flex items-center" :aria-label="$t('nav.logoAriaLabel')">
            <NuxtImg
              src="/images/brand/z_logo.webp"
              alt="Zenith Logo"
              class="h-8 w-auto md:h-12"
              loading="eager"
            />
          </NuxtLink>

          <div class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="group relative text-base font-medium text-zenith-text-primary-light transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :aria-label="item.to === '/' ? $t('nav.home') : undefined"
            >
              <Icon v-if="item.to === '/'" name="Home" size="20" aria-hidden="true" />
              <template v-else>{{ $t(item.label) }}</template>
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300"
                :class="isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'"
              />
            </NuxtLink>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              :aria-label="$t('nav.toggleMenu')"
              :aria-expanded="mobileMenuOpen"
              class="rounded-lg bg-zenith-bg-secondary-light p-2.5 text-zenith-gold-bronze transition-all duration-200 hover:text-zenith-gold-vivid dark:bg-zenith-bg-secondary-dark md:hidden"
              @click="toggleMobileMenu"
            >
              <Icon :name="mobileMenuOpen ? 'X' : 'Menu'" size="20" aria-hidden="true" />
            </button>
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="mobileMenuOpen"
            class="border-t border-zenith-bronze-dark/10 py-4 dark:border-zenith-gold-bronze/20 md:hidden"
          >
            <div class="flex flex-col gap-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                :class="
                  isActive(item.to)
                    ? 'bg-zenith-gold-vivid/10 text-zenith-gold-vivid'
                    : 'text-zenith-text-primary-light hover:bg-zenith-bg-secondary-light dark:text-zenith-text-primary-dark dark:hover:bg-zenith-bg-secondary-dark'
                "
                :aria-current="isActive(item.to) ? 'page' : undefined"
                :aria-label="item.to === '/' ? $t('nav.home') : undefined"
                @click="closeMobileMenu"
              >
                <Icon v-if="item.to === '/'" name="Home" size="20" aria-hidden="true" />
                <template v-else>{{ $t(item.label) }}</template>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface NavItem {
  to: string
  label: string
}

const route = useRoute()

const navItems: NavItem[] = [
  { to: '/', label: 'nav.home' },
  { to: '/contact', label: 'nav.contact' },
]

const mobileMenuOpen = ref<boolean>(false)

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

watch(
  () => route.path,
  () => {
    closeMobileMenu()
  },
)
</script>
