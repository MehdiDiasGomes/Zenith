<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-0 pt-20 sm:px-6 lg:px-8">
      <!-- Grid background -->
      <div class="portfolio-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Fade edges -->
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-6xl pb-16">
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('pages.portfolio.eyebrow') }}
          </span>
        </div>

        <!-- Two-column layout -->
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <h1
              id="portfolio-hero"
              class="hero-fade hero-fade-delay-1 font-bold leading-[1.1] tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t('pages.portfolio.hero.titleWhite') }}
              <br />
              <span class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent">
                {{ $t('pages.portfolio.hero.titleGradient') }}
              </span>
            </h1>
          </div>

          <div class="hero-fade hero-fade-delay-2">
            <p class="type-lead leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pages.portfolio.hero.subtitle') }}
            </p>
            <!-- "More coming soon" badge -->
            <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-4 py-2 dark:border-zenith-gold-vivid/20">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-60" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-zenith-gold-vivid" />
              </span>
              <span class="text-xs font-semibold text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('pages.portfolio.hero.badge') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bottom divider -->
        <div class="mt-16 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent" aria-hidden="true" />
      </div>
    </section>

    <!-- Projects grid (existing component) -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <Projects />
    </div>

    <!-- Testimonials -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <Testimonials />
    </div>

    <!-- CTA -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('pages.portfolio.seoTitle'),
  description: () => t('pages.portfolio.description'),
  ogTitle: () => t('pages.portfolio.seoTitle'),
  ogDescription: () => t('pages.portfolio.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('pages.portfolio.seoTitle'),
  twitterDescription: () => t('pages.portfolio.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('pages.portfolio.title'), url: localePath('/portfolio') },
]))

useJsonLd(useProjectsListSchema())
</script>

<style scoped>
.portfolio-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .portfolio-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
}

.hero-fade {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-fade-delay-1 { animation-delay: 0.1s; }
.hero-fade-delay-2 { animation-delay: 0.22s; }

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}
</style>
