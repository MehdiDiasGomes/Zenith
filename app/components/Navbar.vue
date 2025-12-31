<template>
  <div class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
    <nav
      :aria-label="$t('nav.ariaLabel')"
      class="max-w-7xl mx-auto bg-zenith-bg-light/90 dark:bg-zenith-bg-dark/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-zenith-bronze-dark/10 dark:border-zenith-gold-bronze/20"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group"
          :aria-label="$t('nav.logoAriaLabel')"
        >
          <NuxtImg
            src="/images/brand/z_logo.png"
            alt="Zenith Logo"
            class="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            loading="eager"
            width="40"
            height="40"
          />
          <span
            class="text-xl md:text-2xl font-bold bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
          >
            ZENITH
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative text-base font-medium text-zenith-text-primary-light dark:text-zenith-text-primary-dark transition-colors hover:text-zenith-gold-vivid group"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ $t(item.label) }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': isActive(item.to) }"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex items-center gap-1 bg-zenith-bg-secondary-light dark:bg-zenith-bg-secondary-dark rounded-lg p-1">
            <button
              v-for="locale in availableLocales"
              :key="locale.code"
              type="button"
              :aria-label="$t('nav.switchToLang', { lang: locale.name })"
              :aria-current="currentLocale === locale.code ? 'true' : 'false'"
              class="px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200"
              :class="
                currentLocale === locale.code
                  ? 'bg-zenith-gold-vivid text-white shadow-md'
                  : 'text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark hover:text-zenith-gold-vivid'
              "
              @click="switchLocale(locale.code)"
            >
              {{ locale.code.toUpperCase() }}
            </button>
          </div>

          <button
            type="button"
            :aria-label="$t('nav.toggleTheme')"
            :aria-pressed="colorMode.value === 'dark'"
            class="p-2.5 rounded-lg bg-zenith-bg-secondary-light dark:bg-zenith-bg-secondary-dark text-zenith-gold-bronze hover:text-zenith-gold-vivid transition-all duration-200 hover:shadow-lg hover:shadow-zenith-gold-vivid/20"
            @click="toggleColorMode"
          >
            <component
              :is="colorMode.value === 'dark' ? Sun : Moon"
              class="w-5 h-5"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            :aria-label="$t('nav.toggleMenu')"
            :aria-expanded="mobileMenuOpen"
            class="md:hidden p-2.5 rounded-lg bg-zenith-bg-secondary-light dark:bg-zenith-bg-secondary-dark text-zenith-gold-bronze hover:text-zenith-gold-vivid transition-all duration-200"
            @click="toggleMobileMenu"
          >
            <component :is="mobileMenuOpen ? X : Menu" class="w-5 h-5" aria-hidden="true" />
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
          class="md:hidden py-4 border-t border-zenith-bronze-dark/10 dark:border-zenith-gold-bronze/20"
        >
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
              :class="
                isActive(item.to)
                  ? 'bg-zenith-gold-vivid/10 text-zenith-gold-vivid'
                  : 'text-zenith-text-primary-light dark:text-zenith-text-primary-dark hover:bg-zenith-bg-secondary-light dark:hover:bg-zenith-bg-secondary-dark'
              "
              :aria-current="isActive(item.to) ? 'page' : undefined"
              @click="closeMobileMenu"
            >
              {{ $t(item.label) }}
            </NuxtLink>

            <div class="sm:hidden flex gap-2 px-4 pt-2">
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                type="button"
                :aria-label="$t('nav.switchToLang', { lang: locale.name })"
                class="flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200"
                :class="
                  currentLocale === locale.code
                    ? 'bg-zenith-gold-vivid text-white shadow-md'
                    : 'bg-zenith-bg-secondary-light dark:bg-zenith-bg-secondary-dark text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark'
                "
                @click="switchLocale(locale.code)"
              >
                {{ locale.name }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Menu, X, Sun, Moon } from 'lucide-vue-next'

interface NavItem {
  to: string
  label: string
}

interface Locale {
  code: 'fr' | 'en'
  name: string
}

const colorMode = useColorMode()

const toggleColorMode = (): void => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const { locale, setLocale } = useI18n()
const route = useRoute()

const currentLocale = computed<string>(() => locale.value)

const availableLocales: Locale[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' }
]

const switchLocale = (newLocale: 'fr' | 'en'): void => {
  setLocale(newLocale)
}

const navItems: NavItem[] = [
  { to: '/', label: 'nav.home' },
  { to: '/contact', label: 'nav.contact' }
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

watch(() => route.path, () => {
  closeMobileMenu()
})
</script>
