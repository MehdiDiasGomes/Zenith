<template>
  <div class="min-h-screen bg-zenith-bg-light transition-colors dark:bg-zenith-bg-dark">
    <PromoBanner />
    <Navbar />
    <main class="w-full">
      <slot />
    </main>
    <Footer />
    <Settings />
  </div>
</template>

<script setup lang="ts"></script>
