<template>
  <footer
    class="border-t border-zenith-bronze-dark/10 bg-zenith-bg-light dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
    role="contentinfo"
  >
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-8">
        <NuxtLink to="/" :aria-label="$t('nav.logoAriaLabel')">
          <NuxtImg
            src="/images/brand/z_logo.webp"
            alt="Zenith Logo"
            class="h-12 w-auto"
            loading="lazy"
          />
        </NuxtLink>

        <nav :aria-label="$t('footer.legalNavAriaLabel')" class="flex flex-wrap justify-center gap-6">
          <NuxtLink
            :to="localePath('/legal')"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.legal') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/privacy')"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.privacy') }}
          </NuxtLink>
        </nav>

        <p class="text-center text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const currentYear = computed<number>(() => new Date().getFullYear())
</script>
