<template>
  <div class="min-h-screen bg-zenith-bg-light transition-colors dark:bg-zenith-bg-dark">
    <Navbar />
    <main class="pt-28 md:pt-32">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
