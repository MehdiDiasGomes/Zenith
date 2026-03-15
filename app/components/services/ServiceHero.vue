<template>
  <section
    class="relative flex min-h-[80vh] items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    :aria-labelledby="heroId"
  >
    <!-- Grid background -->
    <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Fade edges over the grid (top, bottom, sides) -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark" aria-hidden="true" />

    <!-- Ambient glows -->
    <div class="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-zenith-gold-vivid/5 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-zenith-gold-bronze/6 blur-3xl" aria-hidden="true" />

    <div class="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- Left: text -->
      <div>
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('nav.services') }}
          </span>
        </div>

        <!-- Heading -->
        <h1
          :id="heroId"
          class="hero-fade hero-fade-delay-1 mb-6 font-bold leading-[1.1] tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ titleWhite }}
          <br />
          <span class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent">
            {{ titleGradient }}
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-fade hero-fade-delay-2 mb-10 max-w-xl type-lead leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ subtitle }}
        </p>

        <!-- Trust badge -->
        <div class="hero-fade hero-fade-delay-3 inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-4 py-2 dark:border-zenith-gold-vivid/20">
          <span class="text-xs font-semibold text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('pages.services.hero.badge') }}
          </span>
        </div>
      </div>

      <!-- Right: Lottie animation -->
      <div class="hero-fade hero-fade-delay-2 flex justify-center lg:justify-end">
        <div class="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
          <!-- Glow behind animation -->
          <div class="absolute inset-0 rounded-full bg-zenith-gold-vivid/5 blur-2xl" aria-hidden="true" />
          <ClientOnly>
            <lottie-player
              src="/assets/animations/WebSiteServiceHero.json"
              background="transparent"
              speed="1"
              style="width: 100%; height: 100%"
              loop
              autoplay
            />
            <template #fallback>
              <div class="flex h-full w-full items-center justify-center rounded-2xl border border-zenith-gold-bronze/20">
                <Icon name="Globe" size="64" class="text-zenith-gold-vivid/40" aria-hidden="true" />
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceHeroProps {
  titleWhite: string
  titleGradient: string
  subtitle: string
  icon?: string
  animationPath?: string
}

defineProps<ServiceHeroProps>()

const heroId: string = 'service-hero'
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .hero-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
}

.hero-fade {
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-fade-delay-1 { animation-delay: 0.1s; }
.hero-fade-delay-2 { animation-delay: 0.22s; }
.hero-fade-delay-3 { animation-delay: 0.34s; }

@keyframes heroFadeIn {
  to { opacity: 1; transform: translateY(0); }
}
</style>
