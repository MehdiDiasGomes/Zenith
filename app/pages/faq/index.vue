<template>
  <main class="relative overflow-hidden">

    <!-- ── Hero ──────────────────────────────────────────────────── -->
    <section class="relative px-4 pb-16 pt-24 sm:px-6 md:pt-32 lg:px-8 lg:pt-40">
      <!-- Grid background -->
      <div class="faq-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Edge fades -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <!-- Ambient glow -->
      <div
        class="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/3 -translate-y-1/4 rounded-full bg-zenith-gold-vivid/5 blur-3xl"
        aria-hidden="true"
      />

      <!-- Large decorative "?" -->
      <div
        class="pointer-events-none absolute right-0 top-0 select-none font-mono text-[22rem] font-black leading-none text-zenith-gold-vivid/[0.03] dark:text-zenith-gold-vivid/[0.04]"
        aria-hidden="true"
      >
        ?
      </div>

      <div class="relative mx-auto max-w-4xl">
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('faq.eyebrow') }}
          </span>
        </div>

        <!-- Title row + count badge -->
        <div class="flex items-end justify-between gap-8">
          <h1
            class="hero-fade hero-fade-delay-1 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark sm:text-5xl lg:text-6xl"
          >
            {{ $t('faq.title') }}
          </h1>

          <!-- Item count -->
          <div class="hero-fade hero-fade-delay-2 hidden shrink-0 flex-col items-center gap-1 pb-2 md:flex">
            <span
              class="font-mono text-5xl font-black tabular-nums leading-none text-zenith-gold-vivid/15 dark:text-zenith-gold-vivid/12"
              aria-hidden="true"
            >
              {{ String(faqItems.length).padStart(2, '0') }}
            </span>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('faq.itemsLabel') }}
            </span>
          </div>
        </div>

        <p
          class="hero-fade hero-fade-delay-2 mt-5 max-w-xl text-base leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('faq.subtitle') }}
        </p>

        <!-- Bottom divider -->
        <div
          class="mt-14 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>

    <!-- ── FAQ Accordion ─────────────────────────────────────────── -->
    <section v-reveal="{ duration: 700, distance: 40 }" class="px-4 pb-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="(item, index) in faqItems"
            :key="item.id"
            :value="item.id"
            class="faq-item group relative border-b border-zenith-gold-bronze/12 dark:border-zenith-gold-bronze/8"
            :style="{ '--item-delay': `${index * 0.06}s` }"
          >
            <!-- Left accent bar -->
            <span
              class="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-zenith-gold-bronze to-zenith-gold-vivid transition-transform duration-400 group-data-[state=open]:scale-y-100"
              aria-hidden="true"
            />

            <AccordionTrigger class="py-7 pl-7 pr-1 hover:no-underline [&>svg]:hidden">
              <div class="flex items-start gap-5 text-left">
                <!-- Index number -->
                <span
                  class="mt-1 shrink-0 font-mono text-xs font-bold tabular-nums leading-none text-zenith-gold-vivid/20 transition-colors duration-300 group-data-[state=open]:text-zenith-gold-vivid/55"
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <!-- Question text -->
                <span
                  class="text-base font-semibold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-data-[state=open]:text-zenith-gold-vivid dark:text-zenith-text-primary-dark"
                >
                  {{ $t(item.questionKey) }}
                </span>
              </div>

              <!-- Custom chevron -->
              <ChevronDown
                class="ml-4 h-4 w-4 shrink-0 text-zenith-text-secondary-light/40 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark/30"
                aria-hidden="true"
              />
            </AccordionTrigger>

            <AccordionContent>
              <p
                class="pb-7 pl-16 pr-6 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                {{ $t(item.answerKey) }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section v-reveal="{ duration: 700, distance: 40 }" class="px-4 pb-24 sm:px-6 lg:px-8" aria-labelledby="faq-cta-heading">
      <div class="mx-auto max-w-4xl">
        <div
          class="relative overflow-hidden rounded-2xl border border-zenith-gold-bronze/20 bg-zenith-bg-secondary-light px-8 py-10 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-secondary-dark md:px-12 md:py-12"
        >
          <!-- Top border accent -->
          <div
            class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zenith-gold-vivid/50 to-transparent"
            aria-hidden="true"
          />
          <!-- Corner ambient glow -->
          <div
            class="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-zenith-gold-vivid/8 blur-2xl"
            aria-hidden="true"
          />

          <div class="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div class="max-w-md">
              <!-- Eyebrow -->
              <div class="mb-4 flex items-center gap-2">
                <span class="h-px w-5 bg-zenith-gold-vivid/60" aria-hidden="true" />
                <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
                  {{ $t('faq.cta.eyebrow') }}
                </span>
              </div>
              <h2
                id="faq-cta-heading"
                class="mb-3 text-2xl font-bold leading-snug text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
              >
                {{ $t('faq.cta.text') }}
              </h2>
              <p class="text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('faq.cta.description') }}
              </p>
            </div>

            <div class="shrink-0">
              <Button as-child variant="gold">
                <NuxtLink :to="localePath('/contact')">
                  {{ $t('faq.cta.button') }}
                  <ArrowRight :size="16" aria-hidden="true" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script lang="ts" setup>
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { faqItems } from '@/constants/faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqPageSchema } from '@/types/seo'

const { t } = useI18n()
const localePath = useLocalePath()

const faqPageSchema: FaqPageSchema = useFaqPageSchema(faqItems)

useSeoMeta({
  title: () => t('seo.faq.title'),
  description: () => t('seo.faq.description'),
  ogTitle: () => t('seo.faq.title'),
  ogDescription: () => t('seo.faq.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: 'https://www.dg-zenith.com/faq',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.faq.title'),
  twitterDescription: () => t('seo.faq.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com/faq',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqPageSchema),
    },
  ],
})
</script>

<style scoped>
/* Subtle grid background */
.faq-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
}

:global(.dark) .faq-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.08) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Hero entrance animations */
.hero-fade {
  opacity: 0;
  transform: translateY(20px);
  animation: heroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-fade-delay-1 { animation-delay: 0.1s; }
.hero-fade-delay-2 { animation-delay: 0.2s; }

/* FAQ items slide in from left, staggered */
.faq-item {
  animation: itemIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--item-delay, 0s);
}

@keyframes heroIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes itemIn {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
