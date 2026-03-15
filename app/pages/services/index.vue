<template>
  <div>
    <ServiceHero
      :title-white="$t('pages.services.hero.titleWhite')"
      :title-gradient="$t('pages.services.hero.titleGradient')"
      :subtitle="$t('pages.services.hero.subtitle')"
    />

    <div v-reveal="{ duration: 700, distance: 40 }">
      <ServiceIntro :description="$t('pages.services.intro.description')">
        <template #title>
          {{ $t('pages.services.intro.title') }}
          <span class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent">
            {{ $t('pages.services.intro.titleGradient') }}
          </span>
        </template>
      </ServiceIntro>
    </div>

    <div v-reveal="{ duration: 700, distance: 40 }">
      <ServiceFeatures
        :title="$t('pages.services.features.title')"
        :features="[
          {
            key: 'web-dev',
            icon: 'Code2',
            title: $t('pages.services.features.webDev.title'),
            description: $t('pages.services.features.webDev.description'),
            illustration: '/assets/illustrations/programming.svg',
          },
          {
            key: 'ui-ux',
            icon: 'Palette',
            title: $t('pages.services.features.uiUx.title'),
            description: $t('pages.services.features.uiUx.description'),
            illustration: '/assets/illustrations/contact.svg',
          },
          {
            key: 'seo',
            icon: 'TrendingUp',
            title: $t('pages.services.features.seo.title'),
            description: $t('pages.services.features.seo.description'),
            illustration: '/assets/illustrations/seo.svg',
          },
          {
            key: 'maintenance',
            icon: 'ShieldCheck',
            title: $t('pages.services.features.maintenance.title'),
            description: $t('pages.services.features.maintenance.description'),
            illustration: '/assets/illustrations/maintenance.svg',
          },
        ]"
      />
    </div>

    <div v-reveal="{ duration: 700, distance: 40 }">
      <ServiceProcess
        :steps="[
          {
            key: 'discovery',
            title: $t('pages.services.process.steps.discovery.title'),
            description: $t('pages.services.process.steps.discovery.description'),
            badge: $t('pages.services.process.steps.discovery.badge'),
          },
          {
            key: 'proposal',
            title: $t('pages.services.process.steps.proposal.title'),
            description: $t('pages.services.process.steps.proposal.description'),
          },
          {
            key: 'build',
            title: $t('pages.services.process.steps.build.title'),
            description: $t('pages.services.process.steps.build.description'),
          },
          {
            key: 'launch',
            title: $t('pages.services.process.steps.launch.title'),
            description: $t('pages.services.process.steps.launch.description'),
          },
        ]"
      />
    </div>

    <div v-reveal="{ duration: 700, distance: 40 }">
      <ServiceBenefits
        :title="$t('pages.services.benefits.title')"
        :stats="[
          { key: 'delay', value: '2-4 sem.', label: $t('pages.services.benefits.stats.delay') },
          { key: 'price', value: '0 €', label: $t('pages.services.benefits.stats.price') },
          { key: 'commitment', value: '0', label: $t('pages.services.benefits.stats.commitment') },
        ]"
        :benefits="[
          { key: 'tailored', icon: 'Fingerprint', title: $t('pages.services.benefits.tailored.title'), description: $t('pages.services.benefits.tailored.description') },
          { key: 'fast', icon: 'Timer', title: $t('pages.services.benefits.fast.title'), description: $t('pages.services.benefits.fast.description') },
          { key: 'transparent', icon: 'BadgeCheck', title: $t('pages.services.benefits.transparent.title'), description: $t('pages.services.benefits.transparent.description') },
          { key: 'support', icon: 'Headphones', title: $t('pages.services.benefits.support.title'), description: $t('pages.services.benefits.support.description') },
        ]"
      />
    </div>

    <div v-reveal="{ duration: 700, distance: 40 }">
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceHero from '~/components/services/ServiceHero.vue'
import ServiceIntro from '~/components/services/ServiceIntro.vue'
import ServiceFeatures from '~/components/services/ServiceFeatures.vue'
import ServiceProcess from '~/components/services/ServiceProcess.vue'
import ServiceBenefits from '~/components/services/ServiceBenefits.vue'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('pages.services.seoTitle'),
  description: () => t('pages.services.description'),
  ogTitle: () => t('pages.services.seoTitle'),
  ogDescription: () => t('pages.services.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('pages.services.seoTitle'),
  twitterDescription: () => t('pages.services.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('pages.services.title'), url: localePath('/services') },
]))
</script>
