<template>
  <div>
    <Hero />
    <SectionDivider />
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <Services />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <CallToAction />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <Projects />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <PricingTeaser />
    </div>
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
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: 'https://www.dg-zenith.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
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
