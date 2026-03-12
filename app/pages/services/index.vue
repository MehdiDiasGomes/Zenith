<template>
  <div class="mp-home min-h-screen py-12">
    <h1>{{ $t('pages.services.title') }}</h1>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `${useI18n().t('pages.services.title')} | Zenith`,
  description: useI18n().t('pages.services.description'),
})
</script>
