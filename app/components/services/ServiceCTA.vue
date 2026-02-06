<template>
  <section
    class="relative overflow-hidden py-20 md:py-28"
    :aria-labelledby="ctaId"
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
      <motion.h2
        :id="ctaId"
        class="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3 }"
        :in-view-options="{ once: true }"
      >
        {{ title }}
      </motion.h2>

      <motion.p
        class="mx-auto mb-12 max-w-3xl text-base text-white/90 md:text-lg"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.1 }"
        :in-view-options="{ once: true }"
      >
        {{ description }}
      </motion.p>

      <motion.div
        class="flex flex-col items-center justify-center gap-4 sm:flex-row"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.15 }"
        :in-view-options="{ once: true }"
      >
        <Button
          as-child
          class="w-full rounded-lg border border-white bg-white px-6 py-3 font-semibold text-zenith-gold-vivid transition-all duration-200 hover:bg-transparent hover:text-white sm:w-auto"
        >
          <a href="#contact" @click="scrollToContact">
            {{ buttonText }}
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { Button } from '@/components/ui/button'

interface ServiceCTAProps {
  title: string
  description: string
  buttonText: string
}

defineProps<ServiceCTAProps>()

const ctaId: string = 'service-cta'

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
