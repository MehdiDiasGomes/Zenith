<template>
  <div>
    <ServicesServiceHero
      :title-white="$t('servicePages.webDev.hero.titleWhite')"
      :title-gradient="$t('servicePages.webDev.hero.titleGradient')"
      :subtitle="$t('servicePages.webDev.hero.subtitle')"
      icon="Code2"
      animation-path="/assets/animations/WebSiteServiceHero.json"
    />

    <ServicesServiceIntro
      :title="$t('servicePages.webDev.intro.title')"
      :description="$t('servicePages.webDev.intro.description')"
    />

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
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

// SEO Meta
useSeoMeta({
  title: () => t('servicePages.webDev.seo.title'),
  description: () => t('servicePages.webDev.seo.description'),
  ogTitle: () => t('servicePages.webDev.seo.title'),
  ogDescription: () => t('servicePages.webDev.seo.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: 'https://www.dg-zenith.com/services/web-dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('servicePages.webDev.seo.title'),
  twitterDescription: () => t('servicePages.webDev.seo.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.dg-zenith.com/services/web-dev',
    },
  ],
})

// Benefits data
interface Benefit {
  key: string
  icon: string
  title: string
  description: string
}

const benefits: Benefit[] = [
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

// Features data
interface Feature {
  key: string
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
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
