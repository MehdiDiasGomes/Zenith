<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <Analytics />
  </div>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'
import type { OrganizationSchema } from '@/types/seo'

const { locale } = useI18n()

const organizationSchema: OrganizationSchema = useOrganizationSchema()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0a0a0a' },
    { name: 'author', content: 'Zenith' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/brand/z_logo.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema),
    },
  ],
})
</script>
