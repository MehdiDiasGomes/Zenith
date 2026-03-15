<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-0 pt-20 sm:px-6 lg:px-8">
      <!-- Grid background -->
      <div class="contact-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Fade edges -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <!-- Ambient glows -->
      <div
        class="pointer-events-none absolute right-1/4 top-10 h-80 w-80 rounded-full bg-zenith-gold-vivid/6 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative z-10 mx-auto max-w-6xl pb-16">
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('pages.contact.eyebrow') }}
          </span>
        </div>

        <!-- Two-column layout -->
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Left: text -->
          <div>
            <h1
              class="hero-fade hero-fade-delay-1 font-bold leading-[1.1] tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t('pages.contact.hero.titleWhite') }}
              <br />
              <span
                class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
              >
                {{ $t('pages.contact.hero.titleGradient') }}
              </span>
            </h1>

            <p
              class="hero-fade hero-fade-delay-2 mt-6 type-lead leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t('pages.contact.hero.subtitle') }}
            </p>

            <!-- Trust badges -->
            <div class="hero-fade hero-fade-delay-3 mt-8 flex flex-wrap gap-3">
              <span
                v-for="(item, key) in trustItems"
                :key="key"
                class="inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/25 bg-zenith-gold-vivid/5 px-3.5 py-1.5 text-xs font-medium text-zenith-text-secondary-light dark:border-zenith-gold-vivid/20 dark:text-zenith-text-secondary-dark"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-zenith-gold-vivid" aria-hidden="true" />
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Right: illustration -->
          <div class="illus-fade hidden lg:flex lg:items-center lg:justify-center" aria-hidden="true">
            <div class="relative h-72 w-72 xl:h-80 xl:w-80">

              <!-- Outer ring -->
              <div class="absolute inset-0 rounded-full border border-zenith-gold-bronze/10 dark:border-zenith-gold-vivid/8" />
              <!-- Middle ring -->
              <div class="absolute inset-8 rounded-full border border-zenith-gold-bronze/15 dark:border-zenith-gold-vivid/12" />

              <!-- Central orb -->
              <div class="absolute inset-16 rounded-full bg-gradient-to-br from-zenith-gold-bronze/20 via-zenith-gold-vivid/15 to-transparent backdrop-blur-sm dark:from-zenith-gold-bronze/15 dark:via-zenith-gold-vivid/10">
                <div class="flex h-full w-full items-center justify-center rounded-full border border-zenith-gold-bronze/20 dark:border-zenith-gold-vivid/15">
                  <NuxtImg
                    src="/images/brand/logo-icon.png"
                    alt="Zenith"
                    class="h-12 w-auto"
                    loading="eager"
                  />
                </div>
              </div>

              <!-- Floating card: response time -->
              <div class="card-float-1 absolute -right-4 top-8 flex items-center gap-2.5 rounded-xl border border-zenith-gold-bronze/20 bg-zenith-bg-light/90 px-3.5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-zenith-gold-vivid/15 dark:bg-zenith-bg-secondary-dark/90">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zenith-gold-vivid/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9d00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">{{ $t('pages.contact.floatingCards.response.label') }}</p>
                  <p class="text-sm font-bold text-zenith-gold-vivid">{{ $t('pages.contact.floatingCards.response.value') }}</p>
                </div>
              </div>

              <!-- Floating card: free quote -->
              <div class="card-float-2 absolute -left-6 bottom-14 flex items-center gap-2.5 rounded-xl border border-zenith-gold-bronze/20 bg-zenith-bg-light/90 px-3.5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-zenith-gold-vivid/15 dark:bg-zenith-bg-secondary-dark/90">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zenith-gold-vivid/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9d00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">{{ $t('pages.contact.floatingCards.quote.label') }}</p>
                  <p class="text-sm font-bold text-zenith-gold-vivid">{{ $t('pages.contact.floatingCards.quote.value') }}</p>
                </div>
              </div>

              <!-- Floating card: no commitment -->
              <div class="card-float-3 absolute -bottom-2 right-6 flex items-center gap-2.5 rounded-xl border border-zenith-gold-bronze/20 bg-zenith-bg-light/90 px-3.5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-zenith-gold-vivid/15 dark:bg-zenith-bg-secondary-dark/90">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zenith-gold-vivid/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9d00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">{{ $t('pages.contact.floatingCards.commitment.label') }}</p>
                  <p class="text-sm font-bold text-zenith-gold-vivid">{{ $t('pages.contact.floatingCards.commitment.value') }}</p>
                </div>
              </div>

              <!-- Orbiting dot -->
              <div class="orbit-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-zenith-gold-vivid" />
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Contact form section -->
    <section class="relative px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <div v-reveal="{ duration: 700, distance: 40 }" class="mx-auto max-w-6xl">
        <ContactForm />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

const trustItems = computed<Record<string, string>>(() => ({
  response: t('pages.contact.trustItems.response'),
  noCommitment: t('pages.contact.trustItems.noCommitment'),
}))

const route = useRoute()

useSeoMeta({
  title: () => t('pages.contact.title'),
  description: () => t('pages.contact.description'),
  ogTitle: () => t('pages.contact.title'),
  ogDescription: () => t('pages.contact.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('pages.contact.title'),
  twitterDescription: () => t('pages.contact.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

const localePath = useLocalePath()
useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('nav.contact'), url: localePath('/contact') },
]))

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: t('pages.contact.title'),
  description: t('pages.contact.description'),
  url: `https://www.dg-zenith.com${route.path}`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Zenith',
    url: 'https://www.dg-zenith.com',
  },
})
</script>

<style scoped>
.contact-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .contact-grid {
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
.hero-fade-delay-3 { animation-delay: 0.34s; }

.illus-fade {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
  animation: fadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}


/* Floating card animations — subtle levitation */
.card-float-1 {
  animation: float1 5s ease-in-out infinite;
}
.card-float-2 {
  animation: float2 6s ease-in-out infinite;
}
.card-float-3 {
  animation: float3 4.5s ease-in-out infinite;
}

/* Orbiting dot */
.orbit-dot {
  transform-origin: 50% 144px;
  animation: orbit 8s linear infinite;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(0) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(0) rotate(-360deg); }
}
</style>
