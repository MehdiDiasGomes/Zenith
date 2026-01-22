<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
  >
    <NuxtImg
      src="/images/decorations/left_spotlight.png"
      alt=""
      class="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-50"
      loading="eager"
    />
    <NuxtImg
      src="/images/decorations/right_spotlight.png"
      alt=""
      class="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-50"
      loading="eager"
    />
    <div class="relative z-10 mx-auto max-w-5xl text-center">
      <div class="mb-8 flex justify-center">
        <div
          ref="_badgeRef"
          :class="badgeClasses"
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

      <h1
        ref="_titleRef"
        :class="titleClasses"
        class="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
      >
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
        ref="_subtitleRef"
        :class="subtitleClasses"
        class="mx-auto mb-6 max-w-2xl text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
      >
        {{ $t('hero.subtitle') }}
      </p>

      <div
        ref="_locationRef"
        :class="locationClasses"
        class="mb-12 flex items-center justify-center gap-2 text-sm text-zenith-gold-bronze dark:text-zenith-champagne"
      >
        <MapPin :size="16" :aria-hidden="true" />
        <span>{{ $t('hero.location') }}</span>
      </div>

      <div
        ref="_ctaRef"
        :class="ctaClasses"
        class="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <a
          href="#contact"
          class="inline-flex items-center gap-2 rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
          @click="scrollToContact"
        >
          {{ $t('hero.cta.primary') }}
        </a>

        <!-- <a
          href="#projects"
          class="group relative text-sm font-semibold text-zenith-text-primary-light transition-all duration-200 dark:text-zenith-text-primary-dark"
          @click="scrollToProjects"
        >
          {{ $t('hero.cta.secondary') }}
          <span
            class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
          />
        </a> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'

const { elementRef: _badgeRef, classes: badgeClasses } = useTailwindAnimate(
  'animate-fade-down animate-delay-100 animate-duration-700',
)
const { elementRef: _titleRef, classes: titleClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-300 animate-duration-700',
)
const { elementRef: _subtitleRef, classes: subtitleClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-500 animate-duration-700',
)
const { elementRef: _locationRef, classes: locationClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-600 animate-duration-700',
)
const { elementRef: _ctaRef, classes: ctaClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-700 animate-duration-700',
)

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
