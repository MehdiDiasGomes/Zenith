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
    id: 'online-presence',
    titleKey: 'pricing.onlinePresence.title',
    descriptionKey: 'pricing.onlinePresence.description',
    basePrice: 690,
    featureGroups: [
      {
        titleKey: 'pricing.onlinePresence.groups.0.title',
        features: [
          { textKey: 'pricing.onlinePresence.groups.0.features.0' },
          { textKey: 'pricing.onlinePresence.groups.0.features.1' },
          { textKey: 'pricing.onlinePresence.groups.0.features.2' },
          { textKey: 'pricing.onlinePresence.groups.0.features.3' },
          { textKey: 'pricing.onlinePresence.groups.0.features.4' },
        ],
      },
      {
        titleKey: 'pricing.onlinePresence.groups.1.title',
        features: [
          { textKey: 'pricing.onlinePresence.groups.1.features.0' },
          { textKey: 'pricing.onlinePresence.groups.1.features.1' },
          { textKey: 'pricing.onlinePresence.groups.1.features.2' },
          { textKey: 'pricing.onlinePresence.groups.1.features.3' },
        ],
      },
    ],
  },
  {
    id: 'client-acquisition',
    titleKey: 'pricing.clientAcquisition.title',
    descriptionKey: 'pricing.clientAcquisition.description',
    basePrice: 1490,
    featureGroups: [
      {
        titleKey: 'pricing.clientAcquisition.groups.0.title',
        features: [
          { textKey: 'pricing.clientAcquisition.groups.0.features.0' },
          { textKey: 'pricing.clientAcquisition.groups.0.features.1' },
          { textKey: 'pricing.clientAcquisition.groups.0.features.2' },
          { textKey: 'pricing.clientAcquisition.groups.0.features.3' },
          { textKey: 'pricing.clientAcquisition.groups.0.features.4' },
        ],
      },
      {
        titleKey: 'pricing.clientAcquisition.groups.1.title',
        features: [
          { textKey: 'pricing.clientAcquisition.groups.1.features.0' },
          { textKey: 'pricing.clientAcquisition.groups.1.features.1' },
          { textKey: 'pricing.clientAcquisition.groups.1.features.2' },
          { textKey: 'pricing.clientAcquisition.groups.1.features.3' },
        ],
      },
    ],
  },
  {
    id: 'growth-automation',
    titleKey: 'pricing.growthAutomation.title',
    descriptionKey: 'pricing.growthAutomation.description',
    basePrice: 2490,
    featureGroups: [
      {
        titleKey: 'pricing.growthAutomation.groups.0.title',
        features: [
          { textKey: 'pricing.growthAutomation.groups.0.features.0' },
          { textKey: 'pricing.growthAutomation.groups.0.features.1' },
          { textKey: 'pricing.growthAutomation.groups.0.features.2' },
          { textKey: 'pricing.growthAutomation.groups.0.features.3' },
          { textKey: 'pricing.growthAutomation.groups.0.features.4' },
          { textKey: 'pricing.growthAutomation.groups.0.features.5' },
        ],
      },
      {
        titleKey: 'pricing.growthAutomation.groups.1.title',
        features: [
          { textKey: 'pricing.growthAutomation.groups.1.features.0' },
          { textKey: 'pricing.growthAutomation.groups.1.features.1' },
          { textKey: 'pricing.growthAutomation.groups.1.features.2' },
          { textKey: 'pricing.growthAutomation.groups.1.features.3' },
        ],
      },
    ],
  },
]


export const FEATURED_PLAN_ID = 'client-acquisition' as const
