<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    :aria-labelledby="heroId"
  >
    <div>
      <NuxtImg
        src="/images/decorations/left_spotlight.webp"
        alt=""
        width="800"
        height="1200"
        class="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-50"
        loading="eager"
        :preload="true"
        fetchpriority="high"
      />
    </div>
    <div>
      <NuxtImg
        src="/images/decorations/right_spotlight.webp"
        alt=""
        width="800"
        height="1200"
        class="pointer-events-none absolute right-0 top-0 h-full w-auto"
        loading="eager"
        :preload="true"
        fetchpriority="high"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-5xl text-center">
      <div class="flex justify-center">
        <div v-if="animationPath" class="h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
          <ClientOnly>
            <lottie-player
              :src="animationPath"
              background="transparent"
              speed="1"
              style="width: 100%; height: 100%"
              loop
              autoplay
            />
          </ClientOnly>
        </div>
        <div
          v-else
          class="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-zenith-gold-vivid/10 backdrop-blur-sm transition-all duration-300"
        >
          <Icon :name="icon" size="40" class="text-zenith-gold-vivid" aria-hidden="true" />
        </div>
      </div>

      <h1
        :id="heroId"
        class="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
      >
        <span class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ titleWhite }}
        </span>
        {{ ' ' }}
        <span
          class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
        >
          {{ titleGradient }}
        </span>
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg"
      >
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceHeroProps {
  titleWhite: string
  titleGradient: string
  subtitle: string
  icon: string
  animationPath?: string
}

defineProps<ServiceHeroProps>()

const heroId: string = 'service-hero'
</script>
