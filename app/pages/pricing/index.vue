<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-0 pt-20 sm:px-6 lg:px-8">
      <!-- Grid background -->
      <div class="pricing-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Fade edges -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <!-- Ambient glow -->
      <div
        class="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-zenith-gold-vivid/5 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative z-10 mx-auto max-w-6xl pb-16">
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('pages.pricing.eyebrow') }}
          </span>
        </div>

        <!-- Two-column layout -->
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <h1
              class="hero-fade hero-fade-delay-1 font-bold leading-[1.1] tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t('pages.pricing.hero.titleWhite') }}
              <br />
              <span class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent">
                {{ $t('pages.pricing.hero.titleGradient') }}
              </span>
            </h1>
          </div>

          <div class="hero-fade hero-fade-delay-2">
            <p class="type-lead leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pages.pricing.hero.subtitle') }}
            </p>
            <!-- Discount badge -->
            <div
              v-if="isDiscountActive"
              class="mt-6 inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-4 py-2 dark:border-zenith-gold-vivid/20"
            >
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-60" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-zenith-gold-vivid" />
              </span>
              <span class="text-xs font-semibold text-zenith-gold-vivid">
                {{ $t('pages.pricing.hero.discountBadge') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bottom divider -->
        <div
          class="mt-16 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>

    <!-- Pricing plans -->
    <section v-reveal="{ duration: 700, distance: 40 }" class="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" class="sr-only">{{ $t('pricing.title') }}</h2>
      <div class="mx-auto max-w-6xl">
        <!-- 3 main plans -->
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article
            v-for="(plan, index) in mainPlans"
            :key="plan.id"
            class="plan-card relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500"
            :class="getPlanClasses(plan.id)"
            :style="{ animationDelay: `${0.1 + index * 0.1}s` }"
          >
            <!-- Popular glow effect -->
            <div
              v-if="plan.id === 'showcase-advanced'"
              class="pointer-events-none absolute -inset-px rounded-2xl"
              style="background: linear-gradient(135deg, rgba(218,165,32,0.15) 0%, transparent 50%, rgba(182,119,29,0.1) 100%)"
              aria-hidden="true"
            />

            <div class="relative flex flex-1 flex-col p-6 lg:p-7">
              <!-- Card header -->
              <div class="mb-6 flex items-start justify-between">
                <span
                  class="font-mono text-xs font-medium text-zenith-gold-vivid/50"
                  aria-hidden="true"
                >
                  0{{ index + 1 }}
                </span>
                <span
                  v-if="plan.id === 'showcase-advanced'"
                  class="rounded-full border border-zenith-gold-vivid/40 bg-zenith-gold-vivid/10 px-3 py-1 text-xs font-semibold text-zenith-gold-vivid"
                >
                  {{ $t('pricing.popular') }}
                </span>
                <span
                  v-else-if="isDiscountActive"
                  class="rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-3 py-1 text-xs font-medium text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  {{ $t('pricing.discountLabel') }}
                </span>
              </div>

              <!-- Plan name & description -->
              <h3 class="mb-1 text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ $t(plan.titleKey) }}
              </h3>
              <p class="mb-6 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t(plan.descriptionKey) }}
              </p>

              <!-- Price block -->
              <div class="mb-6 border-b border-zenith-bronze-dark/10 pb-6 dark:border-zenith-gold-bronze/10">
                <div v-if="isDiscountActive" class="mb-1 flex items-center gap-2">
                  <span class="text-sm text-zenith-text-secondary-light line-through dark:text-zenith-text-secondary-dark">
                    {{ plan.basePrice }}€
                  </span>
                  <span class="text-xs font-medium text-zenith-gold-vivid/70">
                    {{ $t('pricing.originalPrice') }}
                  </span>
                </div>
                <p class="mb-1 text-xs font-medium uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  {{ $t('pricing.startingFrom') }}
                </p>
                <div class="flex items-baseline gap-1">
                  <span
                    class="text-5xl font-bold tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
                    :class="{ 'text-zenith-gold-vivid': plan.id === 'showcase-advanced' }"
                  >
                    {{ discountedPrice(plan.basePrice) }}
                  </span>
                  <span class="text-xl font-semibold text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">€</span>
                </div>
                <p class="mt-1.5 text-xs font-medium text-zenith-gold-vivid/80">
                  {{ $t('pricing.installment') }}
                </p>
                <p
                  v-if="plan.monthlyFeeKey"
                  class="mt-1 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  {{ $t(plan.monthlyFeeKey) }}
                </p>
              </div>

              <!-- Features -->
              <ul class="mb-8 flex-1 space-y-3" :aria-label="$t(plan.titleKey)">
                <li
                  v-for="feature in plan.features"
                  :key="feature.textKey"
                  class="flex items-start gap-2.5 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    class="mt-0.5 flex-shrink-0 text-zenith-gold-vivid"
                    aria-hidden="true"
                  >
                    <path
                      d="M12.5 3.5L6 10L2.5 6.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ $t(feature.textKey) }}
                </li>
              </ul>

              <!-- CTA -->
              <Button
                as-child
                variant="gold"
                class="w-full justify-center"
              >
                <NuxtLink :to="localePath('/contact')">
                  {{ $t('pricing.getQuote') }}
                  <ArrowRight :size="14" aria-hidden="true" />
                </NuxtLink>
              </Button>
            </div>
          </article>
        </div>

        <!-- Free audit card -->
        <div
          class="plan-card mt-5 overflow-hidden rounded-2xl border border-dashed border-zenith-gold-bronze/40 dark:border-zenith-gold-bronze/25"
          style="animation-delay: 0.4s"
        >
          <div class="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center lg:p-8">
            <!-- Left: content -->
            <div class="flex-1">
              <div class="mb-3 flex items-center gap-2">
                <span class="h-px w-5 bg-zenith-gold-vivid/60" aria-hidden="true" />
                <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
                  {{ $t('pricing.auditEyebrow') }}
                </span>
              </div>
              <h3 class="mb-2 text-lg font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark lg:text-xl">
                {{ $t('pricing.auditTitle') }}
              </h3>
              <p class="max-w-lg text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('pricing.auditSubtitle') }}
              </p>
              <!-- Features inline -->
              <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <li
                  v-for="feature in auditPlan?.features"
                  :key="feature.textKey"
                  class="flex items-center gap-1.5 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    class="flex-shrink-0 text-zenith-gold-vivid"
                    aria-hidden="true"
                  >
                    <path
                      d="M12.5 3.5L6 10L2.5 6.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ $t(feature.textKey) }}
                </li>
              </ul>
            </div>

            <!-- Right: price + CTA -->
            <div class="flex flex-col items-start gap-4 sm:items-end">
              <div class="text-right">
                <p class="text-4xl font-bold text-zenith-gold-vivid">{{ $t('pricing.free') }}</p>
                <p class="mt-0.5 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  {{ $t('pricing.noCard') }}
                </p>
              </div>
              <Button as-child variant="gold">
                <NuxtLink :to="localePath('/contact')">
                  {{ $t('pricing.requestAudit') }}
                  <ArrowRight :size="14" aria-hidden="true" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>

        <!-- Price disclaimer -->
        <p class="mt-8 text-center text-xs leading-relaxed text-zenith-text-secondary-light/70 dark:text-zenith-text-secondary-dark/60">
          {{ $t('pricing.priceInfo.description') }}
        </p>
      </div>
    </section>

    <!-- Payment milestones -->
    <section v-reveal="{ duration: 700, distance: 40 }" class="px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="payment-heading">
      <div class="mx-auto max-w-6xl">
        <div class="rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light px-6 py-10 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-secondary-dark md:px-10">
          <!-- Header -->
          <div class="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="payment-heading"
                class="text-xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-2xl"
              >
                {{ $t('pricing.paymentTitle') }}
              </h2>
              <p class="mt-1 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('pricing.paymentSubtitle') }}
              </p>
            </div>
          </div>

          <!-- Steps -->
          <div class="relative">
            <!-- Desktop: horizontal line -->
            <div
              class="pointer-events-none absolute left-5 right-0 top-5 hidden h-px bg-gradient-to-r from-zenith-gold-vivid/30 via-zenith-gold-vivid/50 to-zenith-gold-vivid/20 md:block"
              aria-hidden="true"
            />

            <div class="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-6">
              <div
                v-for="(step, index) in paymentSteps"
                :key="step.key"
                class="relative flex gap-5 md:flex-col md:gap-3"
              >
                <!-- Mobile: vertical line between steps -->
                <div
                  v-if="index < paymentSteps.length - 1"
                  class="absolute left-5 top-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-zenith-gold-vivid/40 to-zenith-gold-vivid/10 md:hidden"
                  aria-hidden="true"
                />

                <!-- Circle -->
                <div class="relative flex-shrink-0">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zenith-gold-vivid/40 bg-zenith-bg-secondary-light dark:bg-zenith-bg-dark">
                    <span class="text-sm font-bold text-zenith-gold-vivid">{{ index + 1 }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="pb-8 md:pb-0">
                  <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                    {{ $t(`pricing.paymentSteps.${step.key}.label`) }}
                  </span>
                  <p class="mb-2 text-3xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                    {{ $t(`pricing.paymentSteps.${step.key}.percent`) }}
                  </p>
                  <p class="text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                    {{ $t(`pricing.paymentSteps.${step.key}.description`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Note -->
          <div class="mt-8 flex items-center gap-2 border-t border-zenith-bronze-dark/10 pt-6 dark:border-zenith-gold-bronze/10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 text-zenith-gold-vivid/60" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
              <path d="M7 6.5V10M7 4.5V5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            <p class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('pricing.paymentNote') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { pricingPlans, DISCOUNT_PERCENTAGE, type PricingPlan } from '~/constants/pricing'

const { t } = useI18n()
const localePath = useLocalePath()

const isDiscountActive: boolean = DISCOUNT_PERCENTAGE > 0

interface PaymentStep {
  key: string
}

const paymentSteps: PaymentStep[] = [
  { key: 'start' },
  { key: 'mockup' },
  { key: 'delivery' },
]

const mainPlans: PricingPlan[] = pricingPlans.filter((plan: PricingPlan) => plan.id !== 'seo-audit')
const auditPlan: PricingPlan | undefined = pricingPlans.find((plan: PricingPlan) => plan.id === 'seo-audit')

/**
 * Calculates the discounted price for a plan
 * @param basePrice - Original base price in euros
 * @returns Discounted price rounded to nearest integer
 */
const discountedPrice = (basePrice: number): number => {
  if (!isDiscountActive) return basePrice
  return Math.round(basePrice * (1 - DISCOUNT_PERCENTAGE / 100))
}


/**
 * Returns CSS classes for a pricing card based on its plan type
 * @param planId - The unique plan identifier
 * @returns Tailwind CSS class string
 */
const getPlanClasses = (planId: string): string => {
  if (planId === 'showcase-advanced') {
    return 'border-zenith-gold-vivid/40 bg-zenith-bg-light shadow-xl shadow-zenith-gold-vivid/8 dark:border-zenith-gold-vivid/30 dark:bg-zenith-bg-secondary-dark lg:scale-[1.02]'
  }
  return 'border-zenith-bronze-dark/10 bg-zenith-bg-light hover:border-zenith-gold-bronze/30 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-secondary-dark dark:hover:border-zenith-gold-bronze/30'
}


const route = useRoute()

useSeoMeta({
  title: () => t('pages.pricing.seoTitle'),
  description: () => t('pages.pricing.description'),
  ogTitle: () => t('pages.pricing.seoTitle'),
  ogDescription: () => t('pages.pricing.description'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('pages.pricing.seoTitle'),
  twitterDescription: () => t('pages.pricing.description'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('pages.pricing.title'), url: localePath('/pricing') },
]))
</script>

<style scoped>
.pricing-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .pricing-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
}

.hero-fade {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-fade-delay-1 { animation-delay: 0.1s; }
.hero-fade-delay-2 { animation-delay: 0.22s; }

.plan-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
