export interface PricingFeature {
  textKey: string
}

export interface PricingFeatureGroup {
  titleKey?: string
  features: PricingFeature[]
}

export interface PricingPlan {
  id: string
  titleKey: string
  descriptionKey: string
  basePrice: number
  featureGroups: PricingFeatureGroup[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'showcase',
    titleKey: 'pricing.showcase.title',
    descriptionKey: 'pricing.showcase.description',
    basePrice: 950,
    featureGroups: [
      {
        titleKey: 'pricing.showcase.groups.0.title',
        features: [
          { textKey: 'pricing.showcase.groups.0.features.0' },
          { textKey: 'pricing.showcase.groups.0.features.1' },
          { textKey: 'pricing.showcase.groups.0.features.2' },
          { textKey: 'pricing.showcase.groups.0.features.3' },
        ],
      },
      {
        titleKey: 'pricing.showcase.groups.1.title',
        features: [
          { textKey: 'pricing.showcase.groups.1.features.0' },
          { textKey: 'pricing.showcase.groups.1.features.1' },
        ],
      },
    ],
  },
  {
    id: 'showcase-advanced',
    titleKey: 'pricing.showcaseAdvanced.title',
    descriptionKey: 'pricing.showcaseAdvanced.description',
    basePrice: 1450,
    featureGroups: [
      {
        features: [
          { textKey: 'pricing.showcaseAdvanced.groups.0.features.0' },
        ],
      },
      {
        titleKey: 'pricing.showcaseAdvanced.groups.1.title',
        features: [
          { textKey: 'pricing.showcaseAdvanced.groups.1.features.0' },
          { textKey: 'pricing.showcaseAdvanced.groups.1.features.1' },
          { textKey: 'pricing.showcaseAdvanced.groups.1.features.2' },
        ],
      },
      {
        titleKey: 'pricing.showcaseAdvanced.groups.2.title',
        features: [
          { textKey: 'pricing.showcaseAdvanced.groups.2.features.0' },
          { textKey: 'pricing.showcaseAdvanced.groups.2.features.1' },
        ],
      },
      {
        titleKey: 'pricing.showcaseAdvanced.groups.3.title',
        features: [
          { textKey: 'pricing.showcaseAdvanced.groups.3.features.0' },
        ],
      },
    ],
  },
  {
    id: 'eshop',
    titleKey: 'pricing.eshop.title',
    descriptionKey: 'pricing.eshop.description',
    basePrice: 1900,
    featureGroups: [
      {
        titleKey: 'pricing.eshop.groups.0.title',
        features: [
          { textKey: 'pricing.eshop.groups.0.features.0' },
          { textKey: 'pricing.eshop.groups.0.features.1' },
          { textKey: 'pricing.eshop.groups.0.features.2' },
        ],
      },
      {
        titleKey: 'pricing.eshop.groups.1.title',
        features: [
          { textKey: 'pricing.eshop.groups.1.features.0' },
          { textKey: 'pricing.eshop.groups.1.features.1' },
          { textKey: 'pricing.eshop.groups.1.features.2' },
          { textKey: 'pricing.eshop.groups.1.features.3' },
        ],
      },
      {
        titleKey: 'pricing.eshop.groups.2.title',
        features: [
          { textKey: 'pricing.eshop.groups.2.features.0' },
          { textKey: 'pricing.eshop.groups.2.features.1' },
        ],
      },
    ],
  },
  {
    id: 'seo-audit',
    titleKey: 'pricing.seoAudit.title',
    descriptionKey: 'pricing.seoAudit.description',
    basePrice: 0,
    featureGroups: [
      {
        features: [
          { textKey: 'pricing.seoAudit.features.0' },
          { textKey: 'pricing.seoAudit.features.1' },
          { textKey: 'pricing.seoAudit.features.2' },
        ],
      },
    ],
  },
]

export const DISCOUNT_PERCENTAGE = 30


export const customDevTagKeys: string[] = [
  'pricing.customDev.tags.0',
  'pricing.customDev.tags.1',
  'pricing.customDev.tags.2',
  'pricing.customDev.tags.3',
]
