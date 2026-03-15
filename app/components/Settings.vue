<template>
  <!-- Click-outside backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[999]"
    aria-hidden="true"
    @click="closeSettings"
  />

  <!--
    When closed: right = -(panel_width) → only the trigger button sticks out
    When open:   right = 0              → button + panel fully visible
  -->
  <div
    class="fixed bottom-20 z-[1000] transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    :class="isOpen ? 'right-0' : '-right-64'"
  >
    <div class="flex items-center">

      <!-- ── Trigger button ─────────────────────────────────────────── -->
      <button
        type="button"
        :aria-label="$t('settings.ariaLabel')"
        :aria-expanded="isOpen"
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-l-full transition-all duration-500"
        :class="
          isOpen
            ? 'border-y border-l border-zenith-bronze-dark/10 bg-transparent text-zenith-gold-vivid shadow-none dark:border-zenith-gold-bronze/20'
            : 'bg-zenith-gold-vivid text-white shadow-lg shadow-zenith-gold-vivid/30 hover:shadow-xl hover:shadow-zenith-gold-vivid/40'
        "
        @click="toggleSettings"
      >
        <Icon
          name="Settings"
          size="22"
          aria-hidden="true"
          class="animate-spin"
          style="animation-duration: 3s"
        />
      </button>

      <!-- ── Settings panel ─────────────────────────────────────────── -->
      <div
        class="w-64 overflow-hidden rounded-l-2xl border-y border-l border-zenith-gold-bronze/20 bg-zenith-bg-light/95 shadow-2xl shadow-black/15 backdrop-blur-xl dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-dark/95 dark:shadow-black/40"
      >
        <!-- Top gold accent -->
        <div
          class="h-px bg-gradient-to-r from-zenith-gold-vivid/50 via-zenith-gold-bronze/30 to-transparent"
          aria-hidden="true"
        />

        <div class="divide-y divide-zenith-gold-bronze/10">

          <!-- Theme section -->
          <div class="px-5 py-4">
            <p class="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-zenith-text-secondary-light/40 dark:text-zenith-text-secondary-dark/40">
              {{ $t('settings.theme.title') }}
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="option in themeOptions"
                :key="option.value"
                type="button"
                class="group relative flex flex-col items-center gap-1.5 overflow-hidden rounded-xl border py-3.5 text-[11px] font-semibold tracking-wide transition-all duration-200"
                :class="
                  colorMode.value === option.value
                    ? 'border-zenith-gold-vivid/35 text-zenith-gold-vivid'
                    : 'border-zenith-gold-bronze/15 text-zenith-text-secondary-light hover:border-zenith-gold-bronze/30 hover:text-zenith-text-primary-light dark:border-zenith-gold-bronze/10 dark:text-zenith-text-secondary-dark dark:hover:border-zenith-gold-bronze/25 dark:hover:text-zenith-text-primary-dark'
                "
                @click="setTheme(option.value)"
              >
                <!-- Active background tint -->
                <span
                  class="absolute inset-0 bg-zenith-gold-vivid/[0.06] transition-opacity duration-200"
                  :class="colorMode.value === option.value ? 'opacity-100' : 'opacity-0'"
                  aria-hidden="true"
                />
                <!-- Active bottom bar -->
                <span
                  class="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  :class="colorMode.value === option.value ? 'bg-zenith-gold-vivid/70' : 'bg-transparent'"
                  aria-hidden="true"
                />
                <Icon :name="option.icon" size="14" class="relative" aria-hidden="true" />
                <span class="relative">{{ option.label }}</span>
              </button>
            </div>
          </div>

          <!-- Language section -->
          <div class="px-5 py-4">
            <p class="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-zenith-text-secondary-light/40 dark:text-zenith-text-secondary-dark/40">
              {{ $t('settings.language.title') }}
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="localeItem in availableLocales"
                :key="localeItem.code"
                type="button"
                class="relative flex flex-col items-center gap-1.5 overflow-hidden rounded-xl border py-3.5 text-[11px] font-semibold tracking-wide transition-all duration-200"
                :class="
                  currentLocale === localeItem.code
                    ? 'border-zenith-gold-vivid/35 text-zenith-gold-vivid'
                    : 'border-zenith-gold-bronze/15 text-zenith-text-secondary-light hover:border-zenith-gold-bronze/30 hover:text-zenith-text-primary-light dark:border-zenith-gold-bronze/10 dark:text-zenith-text-secondary-dark dark:hover:border-zenith-gold-bronze/25 dark:hover:text-zenith-text-primary-dark'
                "
                @click="switchLocale(localeItem.code)"
              >
                <!-- Active background tint -->
                <span
                  class="absolute inset-0 bg-zenith-gold-vivid/[0.06] transition-opacity duration-200"
                  :class="currentLocale === localeItem.code ? 'opacity-100' : 'opacity-0'"
                  aria-hidden="true"
                />
                <!-- Active bottom bar -->
                <span
                  class="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  :class="currentLocale === localeItem.code ? 'bg-zenith-gold-vivid/70' : 'bg-transparent'"
                  aria-hidden="true"
                />
                <span class="relative text-base leading-none" aria-hidden="true">{{ localeItem.flag }}</span>
                <span class="relative">{{ localeItem.name }}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
interface Locale {
  code: 'fr' | 'en'
  name: string
  flag: string
}

interface ThemeOption {
  value: 'light' | 'dark'
  label: string
  icon: string
}

const colorMode = useColorMode()
const { locale, setLocale, t } = useI18n()

const isOpen = ref<boolean>(false)
const currentLocale = computed<string>(() => locale.value)

const themeOptions = computed<ThemeOption[]>(() => [
  { value: 'light', label: t('settings.theme.light'), icon: 'Sun' },
  { value: 'dark', label: t('settings.theme.dark'), icon: 'Moon' },
])

const availableLocales: Locale[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

const toggleSettings = (): void => {
  isOpen.value = !isOpen.value
}

const closeSettings = (): void => {
  isOpen.value = false
}

const setTheme = (theme: 'light' | 'dark'): void => {
  colorMode.preference = theme
}

const switchLocale = (newLocale: 'fr' | 'en'): void => {
  setLocale(newLocale)
}

onMounted((): void => {
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && isOpen.value) {
      closeSettings()
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  onUnmounted((): void => document.removeEventListener('keydown', handleKeyDown))
})
</script>
