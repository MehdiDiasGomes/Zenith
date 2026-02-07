<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
  >
    <div>
      <NuxtImg
        src="/images/decorations/left_spotlight.webp"
        alt=""
        width="800"
        height="1200"
        class="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-50"
        loading="eager"
        :preload="true"
        fetchpriority="high"
      />
    </div>
    <div>
      <NuxtImg
        src="/images/decorations/right_spotlight.webp"
        alt=""
        width="800"
        height="1200"
        class="pointer-events-none absolute right-0 top-0 h-full w-auto"
        loading="eager"
        :preload="true"
        fetchpriority="high"
      />
    </div>
    <div class="relative z-10 mx-auto max-w-5xl text-center">
      <div class="mb-8 flex justify-center">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/20 bg-zenith-bg-secondary-light/50 px-4 py-2 backdrop-blur-sm dark:bg-zenith-bg-secondary-dark/50"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-75"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-zenith-gold-vivid" />
          </span>
          <span
            class="text-xs font-medium text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
          >
            {{ $t('hero.availability') }}
          </span>
        </div>
      </div>

      <h1 class="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
        <span class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('hero.title.part1') }}
        </span>
        <span
          class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
        >
          {{ $t('hero.title.part2') }}
        </span>
        <br />
        <span class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('hero.title.part3') }}
        </span>
        <span class="dark:text-zenith-text-secondary-dark">
          {{ $t('hero.title.part4') }}
        </span>
      </h1>

      <p
        class="mx-auto mb-6 max-w-2xl text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
      >
        {{ $t('hero.subtitle') }}
      </p>

      <div
        class="mb-12 flex items-center justify-center gap-2 text-sm text-zenith-gold-bronze dark:text-zenith-champagne"
      >
        <MapPin :size="16" :aria-hidden="true" />
        <span>{{ $t('hero.location') }}</span>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="#contact"
          class="inline-flex items-center gap-2 rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
          @click="scrollToContact"
        >
          {{ $t('hero.cta.primary') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'

const scrollToContact = (event: Event): void => {
  event.preventDefault()
  const contactSection = document.getElementById('contact')

  if (contactSection) {
    const navbarHeight = 100
    const elementPosition = contactSection.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>
