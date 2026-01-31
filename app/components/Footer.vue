<template>
  <footer
    class="border-t border-zenith-bronze-dark/10 bg-zenith-bg-light dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
    role="contentinfo"
  >
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-8">
        <div ref="_logoRef" :class="logoClasses">
          <NuxtLink to="/" :aria-label="$t('nav.logoAriaLabel')">
            <NuxtImg
              src="/images/brand/logo.png"
              alt="Zenith Logo"
              class="h-12 w-auto"
              loading="lazy"
            />
          </NuxtLink>
        </div>

        <nav
          ref="_navRef"
          :class="navClasses"
          :aria-label="$t('footer.legalNavAriaLabel')"
          class="flex flex-wrap items-center justify-center gap-4"
        >
          <NuxtLink
            to="legal"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.legal') }}
          </NuxtLink>
          <span class="text-zenith-gold-vivid" aria-hidden="true">•</span>
          <NuxtLink
            to="privacy"
            class="text-sm text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
          >
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <span class="text-zenith-gold-vivid" aria-hidden="true">•</span>
          <NuxtLink
            to="faq"
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
