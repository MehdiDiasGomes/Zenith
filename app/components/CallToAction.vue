<template>
  <section
    class="relative overflow-hidden py-20 md:py-28"
    :aria-labelledby="ctaSectionId"
  >
    <!-- Background image with parallax effect (desktop only) -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
      style="background-image: url('/assets/backgrounds/cta-background.webp')"
      aria-hidden="true"
    />

    <!-- Dark overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-5xl px-4 text-center">
      <h2
        :id="ctaSectionId"
        ref="_titleRef"
        :class="titleClasses"
        class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
      >
        {{ $t('cta.title') }}
      </h2>

      <p
        ref="_subtitleRef"
        :class="subtitleClasses"
        class="mb-6 text-2xl font-semibold text-white/95 md:text-3xl"
      >
        {{ $t('cta.subtitle') }}
      </p>

      <p
        ref="_descriptionRef"
        :class="descriptionClasses"
        class="mx-auto mb-12 max-w-3xl text-base text-white/90 md:text-lg"
      >
        {{ $t('cta.description.part1') }}<strong class="font-bold text-zenith-gold-vivid">{{ $t('cta.description.part2Bold') }}</strong>
      </p>

      <div
        ref="_buttonsRef"
        :class="buttonsClasses"
        class="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button
          as-child
          class="rounded-lg border border-white bg-white px-6 py-3 font-semibold text-zenith-gold-vivid transition-all duration-200 hover:bg-transparent hover:text-white"
        >
          <a href="#contact" @click="scrollToContact">
            {{ $t('cta.button.primary') }}
          </a>
        </Button>

        <Button
          as-child
          class="rounded-lg border border-white bg-transparent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-zenith-gold-vivid"
        >
          <a
            :href="phoneHref"
            :aria-label="$t('cta.button.phoneAriaLabel', { phone: phoneNumber })"
          >
            <Phone :size="20" :aria-hidden="true" />
            <span>{{ phoneNumber }}</span>
          </a>
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Phone } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { contactInfo } from '~/constants/contact'

const ctaSectionId = 'cta-section'

const phoneContact = contactInfo.find((contact) => contact.id === 'phone')
const phoneNumber = phoneContact?.value || ''
const phoneHref = phoneContact?.href || ''

const { elementRef: _titleRef, classes: titleClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-100 animate-duration-700',
)
const { elementRef: _subtitleRef, classes: subtitleClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-300 animate-duration-700',
)
const { elementRef: _descriptionRef, classes: descriptionClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-500 animate-duration-700',
)
const { elementRef: _buttonsRef, classes: buttonsClasses } = useTailwindAnimate(
  'animate-fade-up animate-delay-700 animate-duration-700',
)

/**
 * Smoothly scrolls to the contact section
 * @param event - Click event to prevent default behavior
 */
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
