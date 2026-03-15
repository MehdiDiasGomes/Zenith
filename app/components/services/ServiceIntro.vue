<template>
  <section
    class="bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8"
    :aria-labelledby="introId"
  >
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div class="flex-1">
          <div class="mb-6 flex items-center gap-3">
            <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
            <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
              {{ $t('pages.services.intro.eyebrow') }}
            </span>
          </div>
          <h2
            :id="introId"
            class="mb-6 text-2xl font-bold leading-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl lg:text-4xl"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h2>
          <p class="text-base leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark md:text-lg">
            {{ description }}
          </p>
        </div>

        <div class="shrink-0 lg:w-64 xl:w-72">
          <div class="photo-frame relative mb-4">
            <span class="bracket bracket-tl" aria-hidden="true" />
            <span class="bracket bracket-br" aria-hidden="true" />
            <NuxtImg
              src="/images/team/mehdi.jpg"
              :alt="$t('pages.services.intro.photoAlt')"
              width="288"
              height="384"
              class="block w-full object-cover object-top grayscale"
              style="aspect-ratio: 3/4"
              loading="lazy"
            />
          </div>

          <div class="caption-block">
            <span class="caption-line" aria-hidden="true" />
            <p class="mt-3 text-sm font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
              Mehdi Dias Gomes
            </p>
            <p class="mt-0.5 text-xs uppercase tracking-widest text-zenith-gold-bronze dark:text-zenith-champagne">
              {{ $t('pages.services.intro.photoRole') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceIntroProps {
  title?: string
  description: string
}

defineProps<ServiceIntroProps>()

const introId: string = 'service-intro'
</script>

<style scoped>
.photo-frame {
  position: relative;
}

.bracket {
  position: absolute;
  width: 18px;
  height: 18px;
  z-index: 1;
}

.bracket-tl {
  top: -6px;
  left: -6px;
  border-top: 2px solid theme('colors.zenith-gold-vivid');
  border-left: 2px solid theme('colors.zenith-gold-vivid');
}

.bracket-br {
  bottom: -6px;
  right: -6px;
  border-bottom: 2px solid theme('colors.zenith-gold-bronze');
  border-right: 2px solid theme('colors.zenith-gold-bronze');
}

.caption-line {
  display: block;
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    theme('colors.zenith-gold-vivid / 60%'),
    theme('colors.zenith-gold-bronze / 20%')
  );
}
</style>
