<template>
  <div>
    <Hero />
    <Marquee />
    <Services />
    <Projects />
    <Pricing />
    <ContactForm />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.webp',
  ogUrl: 'https://www.dg-zenith.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.webp',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com',
    },
  ],
})
</script>
