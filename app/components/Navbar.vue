<template>
  <div class="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
    <nav
      :aria-label="$t('nav.ariaLabel')"
      class="mx-auto max-w-7xl rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light/90 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark/90 dark:shadow-black/30"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between md:h-20">
          <NuxtLink
            to="/"
            class="group flex items-center gap-3"
            :aria-label="$t('nav.logoAriaLabel')"
          >
            <NuxtImg
              src="/images/brand/z_logo.png"
              alt="Zenith Logo"
              class="h-8 w-auto transition-transform group-hover:scale-105 md:h-10"
              loading="eager"
              width="40"
              height="40"
            />
            <span
              class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-xl font-bold text-transparent md:text-2xl"
            >
              ZENITH
            </span>
          </NuxtLink>

          <div class="hidden items-center gap-8 md:flex">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="group relative text-base font-medium text-zenith-text-primary-light transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              {{ $t(item.label) }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': isActive(item.to) }"
              />
            </NuxtLink>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="hidden items-center gap-1 rounded-lg bg-zenith-bg-secondary-light p-1 dark:bg-zenith-bg-secondary-dark sm:flex"
            >
              <button
                v-for="localeItem in availableLocales"
                :key="localeItem.code"
                type="button"
                :aria-label="$t('nav.switchToLang', { lang: localeItem.name })"
                :aria-current="currentLocale === localeItem.code ? 'true' : 'false'"
                class="rounded-md px-3 py-1.5 text-sm font-semibold transition-all duration-200"
                :class="
                  currentLocale === localeItem.code
                    ? 'bg-zenith-gold-vivid text-white shadow-md'
                    : 'text-zenith-text-secondary-light hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark'
                "
                @click="switchLocale(localeItem.code)"
              >
                {{ localeItem.code.toUpperCase() }}
              </button>
            </div>

            <button
              type="button"
              :aria-label="$t('nav.toggleTheme')"
              :aria-pressed="colorMode.value === 'dark'"
              class="rounded-lg bg-zenith-bg-secondary-light p-2.5 text-zenith-gold-bronze transition-all duration-200 hover:text-zenith-gold-vivid hover:shadow-lg hover:shadow-zenith-gold-vivid/20 dark:bg-zenith-bg-secondary-dark"
              @click="toggleColorMode"
            >
              <component
                :is="colorMode.value === 'dark' ? Sun : Moon"
                class="h-5 w-5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              :aria-label="$t('nav.toggleMenu')"
              :aria-expanded="mobileMenuOpen"
              class="rounded-lg bg-zenith-bg-secondary-light p-2.5 text-zenith-gold-bronze transition-all duration-200 hover:text-zenith-gold-vivid dark:bg-zenith-bg-secondary-dark md:hidden"
              @click="toggleMobileMenu"
            >
              <component :is="mobileMenuOpen ? X : Menu" class="h-5 w-5" aria-hidden="true" />
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
                class="rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                :class="
                  isActive(item.to)
                    ? 'bg-zenith-gold-vivid/10 text-zenith-gold-vivid'
                    : 'text-zenith-text-primary-light hover:bg-zenith-bg-secondary-light dark:text-zenith-text-primary-dark dark:hover:bg-zenith-bg-secondary-dark'
                "
                :aria-current="isActive(item.to) ? 'page' : undefined"
                @click="closeMobileMenu"
              >
                {{ $t(item.label) }}
              </NuxtLink>

              <div class="flex gap-2 px-4 pt-2 sm:hidden">
                <button
                  v-for="localeItem in availableLocales"
                  :key="localeItem.code"
                  type="button"
                  :aria-label="$t('nav.switchToLang', { lang: localeItem.name })"
                  class="flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200"
                  :class="
                    currentLocale === localeItem.code
                      ? 'bg-zenith-gold-vivid text-white shadow-md'
                      : 'bg-zenith-bg-secondary-light text-zenith-text-secondary-light dark:bg-zenith-bg-secondary-dark dark:text-zenith-text-secondary-dark'
                  "
                  @click="switchLocale(localeItem.code)"
                >
                  {{ localeItem.name }}
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
  { code: 'en', name: 'English' },
]

const switchLocale = (newLocale: 'fr' | 'en'): void => {
  setLocale(newLocale)
}

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
