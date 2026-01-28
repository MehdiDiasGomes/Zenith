export interface PricingFeature {
  textKey: string
}

export interface PricingPlan {
  id: string
  titleKey: string
  descriptionKey: string
  basePrice: number
  features: PricingFeature[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'showcase',
    titleKey: 'pricing.showcase.title',
    descriptionKey: 'pricing.showcase.description',
    basePrice: 800,
    features: [
      { textKey: 'pricing.showcase.features.0' },
      { textKey: 'pricing.showcase.features.1' },
      { textKey: 'pricing.showcase.features.2' },
      { textKey: 'pricing.showcase.features.3' },
      { textKey: 'pricing.showcase.features.4' },
      { textKey: 'pricing.showcase.features.5' },
    ],
  },
  {
    id: 'showcase-advanced',
    titleKey: 'pricing.showcaseAdvanced.title',
    descriptionKey: 'pricing.showcaseAdvanced.description',
    basePrice: 1200,
    features: [
      { textKey: 'pricing.showcaseAdvanced.features.0' },
      { textKey: 'pricing.showcaseAdvanced.features.1' },
      { textKey: 'pricing.showcaseAdvanced.features.2' },
      { textKey: 'pricing.showcaseAdvanced.features.3' },
      { textKey: 'pricing.showcaseAdvanced.features.4' },
      { textKey: 'pricing.showcaseAdvanced.features.5' },
      { textKey: 'pricing.showcaseAdvanced.features.6' },
      { textKey: 'pricing.showcaseAdvanced.features.7' },
      { textKey: 'pricing.showcaseAdvanced.features.8' },
      { textKey: 'pricing.showcaseAdvanced.features.9' },
      { textKey: 'pricing.showcaseAdvanced.features.10' },
      { textKey: 'pricing.showcaseAdvanced.features.11' },
    ],
  },
  {
    id: 'eshop',
    titleKey: 'pricing.eshop.title',
    descriptionKey: 'pricing.eshop.description',
    basePrice: 1500,
    features: [
      { textKey: 'pricing.eshop.features.0' },
      { textKey: 'pricing.eshop.features.1' },
      { textKey: 'pricing.eshop.features.2' },
      { textKey: 'pricing.eshop.features.3' },
      { textKey: 'pricing.eshop.features.4' },
      { textKey: 'pricing.eshop.features.5' },
      { textKey: 'pricing.eshop.features.6' },
      { textKey: 'pricing.eshop.features.7' },
      { textKey: 'pricing.eshop.features.8' },
      { textKey: 'pricing.eshop.features.9' },
    ],
  },
]

export const DISCOUNT_PERCENTAGE = 30
