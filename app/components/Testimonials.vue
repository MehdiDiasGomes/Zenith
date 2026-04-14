<template>
  <section
    id="testimonials"
    class="relative overflow-hidden bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
    aria-labelledby="testimonials-heading"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-zenith-gold-vivid/4 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-12">
        <div class="mb-4 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('testimonials.eyebrow') }}
          </span>
        </div>
        <h2
          id="testimonials-heading"
          class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('testimonials.title') }}
        </h2>
        <p class="mt-3 max-w-md text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Cards -->
      <ul
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        :aria-label="$t('testimonials.listAriaLabel')"
      >
        <li
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="group relative flex flex-col rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-light p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zenith-gold-bronze/30 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-dark"
        >
          <!-- Google source badge -->
          <div class="mb-4 flex items-center justify-between">
            <div
              class="flex items-center gap-1.5"
              :aria-label="$t('testimonials.sourceAriaLabel', { source: 'Google' })"
            >
              <GoogleIcon
                class="h-4 w-4"
                aria-hidden="true"
              />
              <span class="text-xs font-medium text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                Google
              </span>
            </div>

            <!-- Stars -->
            <div
              class="flex items-center gap-0.5"
              :aria-label="$t('testimonials.ratingAriaLabel', { rating: testimonial.rating })"
            >
              <Star
                v-for="star in testimonial.rating"
                :key="star"
                :size="14"
                class="fill-zenith-gold-vivid text-zenith-gold-vivid"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Text -->
          <blockquote class="flex-1">
            <p class="text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t(testimonial.textKey) }}
            </p>
          </blockquote>

          <!-- Author -->
          <footer class="mt-5 flex items-center justify-between border-t border-zenith-bronze-dark/10 pt-4 dark:border-zenith-gold-bronze/10">
            <div>
              <p class="text-sm font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ $t(testimonial.nameKey) }}
              </p>
              <p class="mt-0.5 text-xs text-zenith-gold-vivid">
                {{ $t(testimonial.companyKey) }}
              </p>
            </div>
            <time
              :datetime="testimonial.date"
              class="text-xs text-zenith-text-secondary-light/60 dark:text-zenith-text-secondary-dark/60"
            >
              {{ formatDate(testimonial.date) }}
            </time>
          </footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { testimonials, type Testimonial } from '~/constants/testimonials'
import GoogleIcon from '~/components/icons/GoogleIcon.vue'

const { locale } = useI18n()

/**
 * Formats an ISO date string into a locale-aware short date
 * @param isoDate - ISO 8601 date string (e.g. "2026-04-14")
 * @returns Formatted date string based on current locale
 */
const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString(
    locale.value === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  )
}
</script>
