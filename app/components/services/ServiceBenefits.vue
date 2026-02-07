<template>
  <section
    class="relative px-4 py-16 sm:px-6 lg:px-8"
    :aria-labelledby="benefitsId"
  >
    <div class="mx-auto max-w-6xl">
      <h2
        :id="benefitsId"
        class="mb-12 text-center text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
      >
        {{ title }}
      </h2>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.key"
          class="group relative overflow-clip rounded-3xl border border-zenith-gold-bronze/20 bg-gradient-to-br from-zenith-gold-vivid/5 to-zenith-gold-bronze/5 p-6 transition-all duration-500 hover:border-zenith-gold-vivid/50 hover:shadow-lg hover:shadow-zenith-gold-vivid/20"
          :class="[
            index === 0 ? 'md:col-span-2' : '',
          ]"
        >
          <div class="relative z-10">
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zenith-gold-vivid/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-zenith-gold-vivid/20"
            >
              <Icon
                :name="benefit.icon"
                size="24"
                class="text-zenith-gold-vivid"
                aria-hidden="true"
              />
            </div>

            <h3
              class="mb-3 text-xl font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ benefit.title }}
            </h3>

            <p
              class="text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ benefit.description }}
            </p>
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
interface Benefit {
  key: string
  icon: string
  title: string
  description: string
}

interface ServiceBenefitsProps {
  title: string
  benefits: Benefit[]
}

defineProps<ServiceBenefitsProps>()

const benefitsId: string = 'service-benefits'
</script>
