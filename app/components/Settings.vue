<template>
  <div class="fixed bottom-20 right-0 z-50">
    <div
      class="flex items-center transition-transform duration-500 ease-out"
      :class="isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-3.5rem)]'"
    >
      <button
        type="button"
        aria-label="Paramètres"
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-l-full bg-zenith-gold-vivid text-white shadow-lg shadow-zenith-gold-vivid/30 transition-shadow duration-200 hover:shadow-xl hover:shadow-zenith-gold-vivid/40"
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

      <div
        class="h-auto rounded-l-2xl border-y border-l border-zenith-bronze-dark/10 bg-zenith-bg-light/95 p-6 pl-4 shadow-2xl backdrop-blur-xl dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark/95"
      >
        <div class="w-64 space-y-6">
          <div>
            <h3 class="mb-3 text-sm font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              Thème
            </h3>
            <div class="flex gap-2">
              <button
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                :class="
                  colorMode.value === 'light'
                    ? 'bg-zenith-gold-vivid text-white shadow-md'
                    : 'bg-zenith-bg-secondary-light text-zenith-text-secondary-light hover:bg-zenith-gold-vivid/10 dark:bg-zenith-bg-secondary-dark dark:text-zenith-text-secondary-dark'
                "
                @click="setTheme('light')"
              >
                <Icon name="Sun" size="16" aria-hidden="true" />
                Clair
              </button>
              <button
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-zenith-gold-vivid text-white shadow-md'
                    : 'bg-zenith-bg-secondary-light text-zenith-text-secondary-light hover:bg-zenith-gold-vivid/10 dark:bg-zenith-bg-secondary-dark dark:text-zenith-text-secondary-dark'
                "
                @click="setTheme('dark')"
              >
                <Icon name="Moon" size="16" aria-hidden="true" />
                Sombre
              </button>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-sm font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              Langue
            </h3>
            <div class="flex gap-2">
              <button
                v-for="localeItem in availableLocales"
                :key="localeItem.code"
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                :class="
                  currentLocale === localeItem.code
                    ? 'bg-zenith-gold-vivid text-white shadow-md'
                    : 'bg-zenith-bg-secondary-light text-zenith-text-secondary-light hover:bg-zenith-gold-vivid/10 dark:bg-zenith-bg-secondary-dark dark:text-zenith-text-secondary-dark'
                "
                @click="switchLocale(localeItem.code)"
              >
                {{ localeItem.name }}
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
}

const colorMode = useColorMode()
const { locale, setLocale } = useI18n()

const isOpen = ref<boolean>(false)
const currentLocale = computed<string>(() => locale.value)

const availableLocales: Locale[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
]

const toggleSettings = (): void => {
  isOpen.value = !isOpen.value
}

const setTheme = (theme: 'light' | 'dark'): void => {
  colorMode.preference = theme
}

const switchLocale = (newLocale: 'fr' | 'en'): void => {
  setLocale(newLocale)
}
</script>
