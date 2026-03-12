<template>
  <div class="mp-home min-h-screen py-12">
    <h1>{{ $t('pages.contact.title') }}</h1>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `${useI18n().t('pages.contact.title')} | Zenith`,
  description: useI18n().t('pages.contact.description'),
})
</script>
