<template>
  <div class="legal-wrapper px-4 pb-20 pt-24 sm:px-6 md:pt-32 lg:px-8 lg:pt-40">
    <ContentRenderer
      v-if="privacy"
      class="prose-h1:font-montserrat prose-h2:font-montserrat prose-h3:font-montserrat prose prose-lg mx-auto max-w-6xl dark:prose-invert prose-h1:mb-4 prose-h1:text-[#FF9D00] prose-h2:mb-3 prose-h2:mt-12 prose-h2:text-[#B6771D] prose-h3:mb-2 prose-h3:text-[#FFCF71] prose-p:mb-3 prose-a:text-[#FF9D00] prose-a:no-underline hover:prose-a:text-[#FFCF71] prose-ul:my-3 prose-li:my-1"
      :value="privacy"
    />
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const privacy = await queryCollection('content').path(`/${locale.value}/privacy`).first()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
  ogTitle: () => t('seo.privacy.title'),
  ogDescription: () => t('seo.privacy.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.webp',
  ogUrl: 'https://www.dg-zenith.com/privacy',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.privacy.title'),
  twitterDescription: () => t('seo.privacy.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.webp',
  robots: 'noindex, follow',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com/privacy',
    },
  ],
})
</script>
