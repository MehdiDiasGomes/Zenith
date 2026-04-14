<template>
  <div>
    <Hero />
    <SectionDivider />
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyServices />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyCallToAction />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyProjectsPreview />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyTestimonials />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyBlogPreview />
    </div>
    <div v-reveal="{ delay: 0, duration: 700, distance: 40 }">
      <LazyPricingTeaser />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/decorations/left_spotlight.webp',
      imagesrcset:
        '/_vercel/image?url=%2Fimages%2Fdecorations%2Fleft_spotlight.webp&w=640&q=75 640w, /_vercel/image?url=%2Fimages%2Fdecorations%2Fleft_spotlight.webp&w=1200&q=75 1200w',
      imagesizes: '100vw',
    },
  ],
})

const route = useRoute()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zenith',
  url: 'https://www.dg-zenith.com',
  description: t('seo.description'),
  inLanguage: ['fr-FR', 'en-US'],
  publisher: {
    '@type': 'Organization',
    name: 'Zenith',
    url: 'https://www.dg-zenith.com',
  },
})
</script>
