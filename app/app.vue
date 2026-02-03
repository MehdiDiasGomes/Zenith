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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema),
    },
  ],
})
</script>
