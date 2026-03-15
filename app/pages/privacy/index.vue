<template>
  <LegalLayout
    :document="privacy"
    :category="$t('privacy.category')"
    :updated-at="$t('privacy.updatedAt.date')"
  />
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const privacy = await queryCollection('content').path(`/${locale.value}/privacy`).first()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
  ogTitle: () => t('seo.privacy.title'),
  ogDescription: () => t('seo.privacy.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: 'https://www.dg-zenith.com/privacy',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.privacy.title'),
  twitterDescription: () => t('seo.privacy.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
  robots: 'noindex, follow',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://www.dg-zenith.com/privacy' }],
})
</script>
