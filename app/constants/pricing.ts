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
    id: 'portfolio',
    titleKey: 'pricing.portfolio.title',
    descriptionKey: 'pricing.portfolio.description',
    basePrice: 690,
    features: [
      { textKey: 'pricing.portfolio.features.0' },
      { textKey: 'pricing.portfolio.features.1' },
      { textKey: 'pricing.portfolio.features.2' },
      { textKey: 'pricing.portfolio.features.3' },
      { textKey: 'pricing.portfolio.features.4' },
      { textKey: 'pricing.portfolio.features.5' },
      { textKey: 'pricing.portfolio.features.6' },
      { textKey: 'pricing.portfolio.features.7' },
      { textKey: 'pricing.portfolio.features.8' },
      { textKey: 'pricing.portfolio.features.9' },
    ],
  },
  {
    id: 'showcase',
    titleKey: 'pricing.showcase.title',
    descriptionKey: 'pricing.showcase.description',
    basePrice: 1190,
    features: [
      { textKey: 'pricing.showcase.features.0' },
      { textKey: 'pricing.showcase.features.1' },
      { textKey: 'pricing.showcase.features.2' },
      { textKey: 'pricing.showcase.features.3' },
      { textKey: 'pricing.showcase.features.4' },
      { textKey: 'pricing.showcase.features.5' },
      { textKey: 'pricing.showcase.features.6' },
      { textKey: 'pricing.showcase.features.7' },
      { textKey: 'pricing.showcase.features.8' },
      { textKey: 'pricing.showcase.features.9' },
      { textKey: 'pricing.showcase.features.10' },
    ],
  },
  {
    id: 'eshop',
    titleKey: 'pricing.eshop.title',
    descriptionKey: 'pricing.eshop.description',
    basePrice: 2490,
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
      { textKey: 'pricing.eshop.features.10' },
      { textKey: 'pricing.eshop.features.11' },
      { textKey: 'pricing.eshop.features.12' },
    ],
  },
]

export const DISCOUNT_PERCENTAGE = 15
