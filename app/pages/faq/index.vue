<template>
  <main class="faq-wrapper px-4 pb-20 pt-24 sm:px-6 md:pt-32 lg:px-8 lg:pt-40">
    <div class="mx-auto max-w-4xl">
      <header class="mb-12 text-center">
        <motion.h1
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          :in-view-options="{ once: true }"
          class="mb-4 text-zenith-gold-vivid"
        >
          {{ $t('faq.title') }}
        </motion.h1>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          :in-view-options="{ once: true }"
          class="mx-auto max-w-2xl text-lg text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('faq.subtitle') }}
        </motion.p>
      </header>

      <Accordion type="single" collapsible class="w-full space-y-4">
        <motion.div
          v-for="(item, index) in faqItems"
          :key="item.id"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.2 + index * 0.1 }"
          :in-view-options="{ once: true }"
        >
          <AccordionItem
            :value="item.id"
            class="rounded-lg border border-zenith-gold-bronze/30 bg-white/5 px-6 backdrop-blur-sm transition-all hover:border-zenith-gold-vivid/50 dark:bg-black/20"
          >
            <AccordionTrigger class="text-left hover:no-underline">
              <h2 class="text-lg font-semibold text-zenith-text-primary-light transition-colors hover:text-zenith-gold-vivid group-data-[state=open]:text-zenith-gold-vivid dark:text-zenith-text-primary-dark">
                {{ $t(item.questionKey) }}
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <p class="pb-4 text-base leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t(item.answerKey) }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      </Accordion>

      <motion.section
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        :in-view-options="{ once: true }"
        class="mt-16 flex flex-col items-center gap-8 rounded-2xl bg-white/5 p-8 backdrop-blur-sm md:flex-row md:gap-12 md:p-12 dark:bg-black/20"
        aria-labelledby="cta-heading"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0.9 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          :in-view-options="{ once: true }"
          class="flex w-full justify-center md:w-1/2"
        >
          <NuxtImg
            src="/assets/illustrations/faq.svg"
            alt="Illustration FAQ"
            class="h-auto w-full max-w-xs md:max-w-sm"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, x: 20 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          :in-view-options="{ once: true }"
          class="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left"
        >
          <h2 id="cta-heading" class="mb-4 text-zenith-gold-vivid">
            {{ $t('faq.cta.text') }}
          </h2>
          <p class="mb-6 text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('faq.cta.description') }}
          </p>
          <NuxtLink
            :to="localePath('/') + '#contact'"
            class="inline-flex items-center gap-2 rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
          >
            {{ $t('faq.cta.button') }}
          </NuxtLink>
        </motion.div>
      </motion.section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v'
import { faqItems } from '@/constants/faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.faq.title'),
  description: () => t('seo.faq.description'),
  ogTitle: () => t('seo.faq.title'),
  ogDescription: () => t('seo.faq.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.webp',
  ogUrl: 'https://www.dg-zenith.com/faq',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.faq.title'),
  twitterDescription: () => t('seo.faq.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.webp',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com/faq',
    },
  ],
})
</script>
