<template>
  <div class="legal-wrapper px-4 pb-20 pt-24 sm:px-6 md:pt-32 lg:px-8 lg:pt-40">
    <ContentRenderer
      v-if="legal"
      class="prose-h1:font-montserrat prose-h2:font-montserrat prose-h3:font-montserrat prose prose-lg mx-auto max-w-6xl dark:prose-invert prose-h1:mb-4 prose-h1:text-zenith-gold-vivid prose-h2:mb-3 prose-h2:mt-12 prose-h2:text-zenith-gold-bronze prose-h3:mb-2 prose-h3:text-zenith-champagne prose-p:mb-3 prose-a:text-zenith-gold-vivid prose-a:no-underline hover:prose-a:text-zenith-champagne prose-ul:my-3 prose-li:my-1"
      :value="legal"
    />
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const legal = await queryCollection('content').path(`/${locale.value}/legal`).first()

useSeoMeta({
  title: () => t('seo.legal.title'),
  description: () => t('seo.legal.description'),
  ogTitle: () => t('seo.legal.title'),
  ogDescription: () => t('seo.legal.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: 'https://www.dg-zenith.com/legal',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.legal.title'),
  twitterDescription: () => t('seo.legal.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
  robots: 'noindex, follow',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com/legal',
    },
  ],
})
</script>
