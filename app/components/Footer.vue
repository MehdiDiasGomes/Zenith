<template>
  <footer
    class="border-t border-zenith-bronze-dark/10 bg-zenith-bg-light dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
    role="contentinfo"
  >
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-8">
        <div ref="_logoRef" :class="logoClasses">
          <NuxtLink :to="localePath('/')" :aria-label="$t('nav.logoAriaLabel')">
            <NuxtImg
              src="/images/brand/logo.webp"
              alt="Zenith Logo"
              class="h-16 w-auto"
              loading="lazy"
            />
          </NuxtLink>
        </div>

        <nav
          ref="_navRef"
          :class="navClasses"
          :aria-label="$t('footer.legalNavAriaLabel')"
          class="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <NuxtLink
            :to="localePath('/legal')"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.legal') }}
          </NuxtLink>
          <span class="hidden text-zenith-gold-vivid sm:inline" aria-hidden="true">•</span>
          <NuxtLink
            :to="localePath('/privacy')"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <span class="hidden text-zenith-gold-vivid sm:inline" aria-hidden="true">•</span>
          <NuxtLink
            :to="localePath('/faq')"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.faq') }}
          </NuxtLink>
        </nav>

        <p
          ref="_copyrightRef"
          :class="copyrightClasses"
          class="text-center text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const currentYear = computed<number>(() => new Date().getFullYear())

const { elementRef: _logoRef, classes: logoClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-100 animate-duration-700',
)
const { elementRef: _navRef, classes: navClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-300 animate-duration-700',
)
const { elementRef: _copyrightRef, classes: copyrightClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-500 animate-duration-700',
)
</script>
