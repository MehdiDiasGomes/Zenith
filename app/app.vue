<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <Analytics/>
  </div>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})
</script>
