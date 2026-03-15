<template>
  <div class="min-h-screen bg-zenith-bg-light transition-colors dark:bg-zenith-bg-dark">
    <PromoBanner />
    <Navbar />
    <main class="w-full pt-16 md:pt-20">
      <slot />
    </main>
    <Footer />
    <Settings />
  </div>
</template>

<script setup lang="ts"></script>
