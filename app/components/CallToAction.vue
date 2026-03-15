<template>
  <section
    class="relative overflow-hidden py-24 md:py-32"
    :aria-labelledby="ctaSectionId"
  >
    <!-- Background photo -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
      style="background-image: url('/assets/backgrounds/cta-background.webp')"
      aria-hidden="true"
    />

    <!-- Layered overlays for depth -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/75" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-zenith-gold-bronze/15 via-transparent to-transparent" aria-hidden="true" />

    <!-- Top gold accent line -->
    <div class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zenith-gold-vivid/60 to-transparent" aria-hidden="true" />

    <div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <!-- Eyebrow -->
      <div class="mb-6 flex items-center justify-center gap-3">
        <span class="h-px w-8 bg-zenith-gold-vivid/60" aria-hidden="true" />
        <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
          {{ $t('cta.eyebrow') }}
        </span>
        <span class="h-px w-8 bg-zenith-gold-vivid/60" aria-hidden="true" />
      </div>

      <!-- Main title -->
      <h2
        :id="ctaSectionId"
        class="mb-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
      >
        {{ $t('cta.title') }}
      </h2>

      <!-- Subtitle -->
      <p class="mb-8 text-xl font-medium text-zenith-champagne md:text-2xl">
        {{ $t('cta.subtitle') }}
      </p>

      <!-- Description -->
      <p class="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
        {{ $t('cta.description.part1') }}<strong class="font-semibold text-white/90">{{ $t('cta.description.part2Bold') }}</strong>
      </p>

      <!-- Actions -->
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <!-- Primary CTA -->
        <Button
          as-child
          class="group relative w-full overflow-hidden rounded-lg border border-zenith-gold-vivid/70 bg-zenith-gold-vivid/10 px-7 py-3.5 font-semibold text-zenith-gold-vivid backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zenith-gold-vivid hover:bg-zenith-gold-vivid/20 hover:shadow-lg hover:shadow-zenith-gold-vivid/20 sm:w-auto"
        >
          <a href="#contact" @click="scrollToContact">
            <span class="relative flex items-center gap-2">
              {{ $t('cta.button.primary') }}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                class="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
        </Button>

        <!-- Secondary CTA -->
        <Button
          as-child
          class="w-full rounded-lg border border-white/30 bg-transparent px-7 py-3.5 font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white sm:w-auto"
        >
          <NuxtLink :to="localePath('/faq')">
            {{ $t('cta.button.faq') }}
          </NuxtLink>
        </Button>
      </div>

      <!-- Reassurance badges -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <span
          v-for="badge in reassuranceBadges"
          :key="badge"
          class="flex items-center gap-1.5 text-xs text-white/50"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ badge }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { t } = useI18n()
const localePath = useLocalePath()
const ctaSectionId: string = 'cta-section'

const reassuranceBadges = computed<string[]>(() => [
  t('cta.badges.free'),
  t('cta.badges.noCommitment'),
  t('cta.badges.replyTime'),
])

/**
 * Smoothly scrolls to the contact section
 * @param event - Click event to prevent default behavior
 */
const scrollToContact = (event: Event): void => {
  event.preventDefault()
  const contactSection: HTMLElement | null = document.getElementById('contact')

  if (contactSection) {
    const navbarHeight: number = 100
    const elementPosition: number = contactSection.getBoundingClientRect().top
    const offsetPosition: number = elementPosition + window.scrollY - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>
