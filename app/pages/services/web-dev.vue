<template>
  <div>
    <ServicesServiceHero
      :title-white="$t('servicePages.webDev.hero.titleWhite')"
      :title-gradient="$t('servicePages.webDev.hero.titleGradient')"
      :subtitle="$t('servicePages.webDev.hero.subtitle')"
      icon="Code2"
      animation-path="/assets/animations/WebSiteServiceHero.json"
    />

    <ServicesServiceIntro :description="$t('servicePages.webDev.intro.description')">
      <template #title>
        <span v-if="$i18n.locale === 'fr'">
          Votre entreprise mérite un
          <span
            class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
          >
            site web
          </span>
          à la hauteur de vos
          <span
            class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
          >
            ambitions
          </span>
        </span>
        <span v-else>
          Your business deserves a
          <span
            class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
          >
            website
          </span>
          that matches your
          <span
            class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent"
          >
            ambitions
          </span>
        </span>
      </template>

      <template #mockups>
        <NuxtImg
          src="/images/mockups/web-dev-mockup.png"
          alt=""
          width="1200"
          class="-mx-4 w-[calc(100%+2rem)] max-w-none rounded-xl transition-transform duration-500 hover:scale-[1.02] sm:mx-0 sm:w-full sm:max-w-4xl"
          loading="lazy"
        />
      </template>
    </ServicesServiceIntro>

    <ServicesServiceBenefits
      :title="$t('servicePages.webDev.benefits.title')"
      :benefits="benefits"
    />

    <ServicesServiceFeatures
      :title="$t('servicePages.webDev.features.title')"
      :features="features"
    />

    <ServicesServiceCTA
      :title="$t('servicePages.webDev.cta.title')"
      :description="$t('servicePages.webDev.cta.description')"
      :button-text="$t('servicePages.webDev.cta.button')"
    />

    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import type { ServiceBenefit, ServiceFeature } from '~/types/services'

const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useServiceSeo('webDev', 'web-dev')

const benefits: ServiceBenefit[] = [
  {
    key: 'credibility',
    icon: 'Shield',
    title: t('servicePages.webDev.benefits.items.credibility.title'),
    description: t('servicePages.webDev.benefits.items.credibility.description'),
  },
  {
    key: 'availability',
    icon: 'Clock',
    title: t('servicePages.webDev.benefits.items.availability.title'),
    description: t('servicePages.webDev.benefits.items.availability.description'),
  },
  {
    key: 'conversion',
    icon: 'TrendingUp',
    title: t('servicePages.webDev.benefits.items.conversion.title'),
    description: t('servicePages.webDev.benefits.items.conversion.description'),
  },
  {
    key: 'competition',
    icon: 'Target',
    title: t('servicePages.webDev.benefits.items.competition.title'),
    description: t('servicePages.webDev.benefits.items.competition.description'),
  },
]

const features: ServiceFeature[] = [
  {
    key: 'responsive',
    icon: 'Smartphone',
    title: t('servicePages.webDev.features.items.responsive.title'),
    description: t('servicePages.webDev.features.items.responsive.description'),
  },
  {
    key: 'modern',
    icon: 'Sparkles',
    title: t('servicePages.webDev.features.items.modern.title'),
    description: t('servicePages.webDev.features.items.modern.description'),
  },
  {
    key: 'performance',
    icon: 'Zap',
    title: t('servicePages.webDev.features.items.performance.title'),
    description: t('servicePages.webDev.features.items.performance.description'),
  },
  {
    key: 'seo',
    icon: 'Search',
    title: t('servicePages.webDev.features.items.seo.title'),
    description: t('servicePages.webDev.features.items.seo.description'),
  },
  {
    key: 'forms',
    icon: 'Mail',
    title: t('servicePages.webDev.features.items.forms.title'),
    description: t('servicePages.webDev.features.items.forms.description'),
  },
  {
    key: 'maintenance',
    icon: 'Settings',
    title: t('servicePages.webDev.features.items.maintenance.title'),
    description: t('servicePages.webDev.features.items.maintenance.description'),
  },
]
</script>
