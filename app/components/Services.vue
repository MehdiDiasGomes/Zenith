<template>
  <section
    id="services"
    :aria-label="$t('services.ariaLabel')"
    class="relative px-4 py-20 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <h2
          id="services-heading"
          class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('services.title') }}
        </h2>
        <h3>
          {{ $t('services.subtitle') }}
        </h3>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div
          v-for="(service, index) in serviceList"
          :key="service.id"
          class="group relative col-span-1 overflow-clip rounded-3xl border border-zenith-gold-bronze/20 bg-gradient-to-br from-zenith-gold-vivid/5 to-zenith-gold-bronze/5 transition-all duration-500 hover:border-zenith-gold-vivid/50 hover:shadow-zenith-gold-vivid/20"
          :class="[
            index === 0 || index === 3
              ? 'p-6 md:col-span-2 md:row-span-2 md:p-8'
              : 'p-6 md:row-span-2',
          ]"
        >
          <NuxtImg
            :src="service.imagePath"
            :alt="$t(service.imageAltKey)"
            class="pointer-events-none absolute -bottom-4 -right-12 opacity-20 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-30"
            :class="getImageClass(index)"
            loading="lazy"
          />

          <div class="relative z-10 flex h-full flex-col justify-between">
            <div :class="index === 0 || index === 3 ? 'max-w-lg' : 'max-w-xs'">
              <div
                class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-zenith-gold-vivid/20"
              >
                <Icon
                  :name="service.icon"
                  size="32"
                  class="text-zenith-gold-vivid"
                  aria-hidden="true"
                />
              </div>

              <h3 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ $t(service.titleKey) }}
              </h3>

              <p
                class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
              >
                {{ $t(service.descriptionKey) }}
              </p>
            </div>

            <NuxtLink
              :to="getServiceLink(service.id)"
              class="group/link mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-zenith-gold-vivid opacity-70 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
              :aria-label="`${$t('services.learnMore')} - ${$t(service.titleKey)}`"
            >
              <span>{{ $t('services.learnMore') }}</span>
              <Icon
                name="ArrowRight"
                size="16"
                aria-hidden="true"
                class="stroke-[2.5] transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </NuxtLink>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-br from-zenith-gold-vivid/0 to-zenith-gold-vivid/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { services } from '~/constants/services'

const localePath = useLocalePath()
const serviceList = services

const getImageClass = (index: number): string => {
  return index === 0 || index === 3
    ? 'h-48 w-48 translate-x-8 md:h-64 md:w-64'
    : 'h-32 w-32 translate-x-6'
}

/**
 * Maps service IDs to their respective page URLs with locale prefix
 * @param serviceId - The ID of the service
 * @returns The localized URL path for the service page
 */
const getServiceLink = (serviceId: string): string => {
  const serviceLinks: Record<string, string> = {
    'web-dev': localePath('/services/web-dev'),
    'ui-ux': localePath('/services/ux-design'),
    'performance': localePath('/contact'),
    'maintenance': localePath('/contact'),
  }

  return serviceLinks[serviceId] || localePath('/contact')
}
</script>
