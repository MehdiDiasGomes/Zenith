<template>
  <div>
    <ServicesServiceHero
      :title-white="$t('servicePages.uxDesign.hero.titleWhite')"
      :title-gradient="$t('servicePages.uxDesign.hero.titleGradient')"
      :subtitle="$t('servicePages.uxDesign.hero.subtitle')"
      icon="Layout"
      animation-path="/assets/animations/UxDesignServiceHero.json"
    />

    <ServicesServiceIntro
      :title="$t('servicePages.uxDesign.intro.title')"
      :description="$t('servicePages.uxDesign.intro.description')"
    />

    <ServicesServiceBenefits
      :title="$t('servicePages.uxDesign.benefits.title')"
      :benefits="benefits"
    />

    <ServicesServiceFeatures
      :title="$t('servicePages.uxDesign.features.title')"
      :features="features"
    />

    <ServicesServiceCTA
      :title="$t('servicePages.uxDesign.cta.title')"
      :description="$t('servicePages.uxDesign.cta.description')"
      :button-text="$t('servicePages.uxDesign.cta.button')"
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

useServiceSeo('uxDesign', 'ux-design')

const benefits: ServiceBenefit[] = [
  {
    key: 'navigation',
    icon: 'Navigation',
    title: t('servicePages.uxDesign.benefits.items.navigation.title'),
    description: t('servicePages.uxDesign.benefits.items.navigation.description'),
  },
  {
    key: 'conversion',
    icon: 'TrendingUp',
    title: t('servicePages.uxDesign.benefits.items.conversion.title'),
    description: t('servicePages.uxDesign.benefits.items.conversion.description'),
  },
  {
    key: 'trust',
    icon: 'Heart',
    title: t('servicePages.uxDesign.benefits.items.trust.title'),
    description: t('servicePages.uxDesign.benefits.items.trust.description'),
  },
  {
    key: 'retention',
    icon: 'RotateCcw',
    title: t('servicePages.uxDesign.benefits.items.retention.title'),
    description: t('servicePages.uxDesign.benefits.items.retention.description'),
  },
]

const features: ServiceFeature[] = [
  {
    key: 'userResearch',
    icon: 'Users',
    title: t('servicePages.uxDesign.features.items.userResearch.title'),
    description: t('servicePages.uxDesign.features.items.userResearch.description'),
  },
  {
    key: 'wireframes',
    icon: 'Layout',
    title: t('servicePages.uxDesign.features.items.wireframes.title'),
    description: t('servicePages.uxDesign.features.items.wireframes.description'),
  },
  {
    key: 'prototyping',
    icon: 'MousePointer',
    title: t('servicePages.uxDesign.features.items.prototyping.title'),
    description: t('servicePages.uxDesign.features.items.prototyping.description'),
  },
  {
    key: 'cta',
    icon: 'Target',
    title: t('servicePages.uxDesign.features.items.cta.title'),
    description: t('servicePages.uxDesign.features.items.cta.description'),
  },
  {
    key: 'testing',
    icon: 'CheckCircle',
    title: t('servicePages.uxDesign.features.items.testing.title'),
    description: t('servicePages.uxDesign.features.items.testing.description'),
  },
  {
    key: 'optimization',
    icon: 'BarChart',
    title: t('servicePages.uxDesign.features.items.optimization.title'),
    description: t('servicePages.uxDesign.features.items.optimization.description'),
  },
]
</script>
