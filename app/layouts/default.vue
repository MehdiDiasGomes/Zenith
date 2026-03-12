<template>
  <div class="min-h-screen bg-zenith-bg-light transition-colors dark:bg-zenith-bg-dark">
    <PromoBanner />
    <Navbar />
    <!-- Spacer to compensate for fixed navbar -->
    <div class="h-28 sm:h-32 md:h-36" aria-hidden="true" />
    <main>
      <slot />
    </main>
    <Footer />
    <Settings />
  </div>
</template>

<script setup lang="ts"></script>
