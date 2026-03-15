<template>
  <LegalLayout
    :document="legal"
    :category="$t('legal.category')"
    :updated-at="$t('legal.updatedAt.date')"
  />
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
  link: [{ rel: 'canonical', href: 'https://www.dg-zenith.com/legal' }],
})
</script>
