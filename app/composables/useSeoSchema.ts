/**
 * Composable for generating SEO JSON-LD schemas
 * Supports multilingual content via i18n
 */

import type {
  OrganizationSchema,
  FaqPageSchema,
  FaqQuestion,
  BreadcrumbSchema,
  BreadcrumbItem,
  FaqItemInput,
  ImageObject,
  ServiceArea,
  OfferCatalog,
} from '@/types/seo'

const SITE_URL: string = 'https://www.dg-zenith.com'

/**
 * Generates the Organization/LocalBusiness JSON-LD schema
 * @returns Organization schema object for JSON-LD
 */
export function useOrganizationSchema(): OrganizationSchema {
  const { t, locale } = useI18n()

  const logo: ImageObject = {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/brand/logo.webp`,
    width: 600,
    height: 600,
  }

  const areaServed: ServiceArea[] = [
    { '@type': 'City', name: 'Thionville' },
    { '@type': 'City', name: 'Metz' },
    { '@type': 'AdministrativeArea', name: 'Moselle' },
    { '@type': 'AdministrativeArea', name: 'Grand Est' },
  ]

  const hasOfferCatalog: OfferCatalog = {
    '@type': 'OfferCatalog',
    name: t('seo.offerCatalogName'),
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.service.webDev') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.service.uiux') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.service.seo') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.service.ecommerce') } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.service.maintenance') } },
    ],
  }

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zenith',
    description: t('seo.description'),
    url: SITE_URL,
    logo,
    image: `${SITE_URL}/og-image.png`,
    email: 'contact@dg-zenith.com',
    telephone: '+33789626927',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28 cité des sports',
      addressLocality: 'Uckange',
      postalCode: '57270',
      addressCountry: 'FR',
    },
    areaServed,
    sameAs: ['https://www.instagram.com/dg_zenith/'],
    priceRange: '€€',
    hasOfferCatalog,
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
  }

  return schema
}

/**
 * Generates the FAQPage JSON-LD schema from FAQ items
 * @param faqItems - Array of FAQ items with question and answer keys
 * @returns FAQPage schema object for JSON-LD
 */
export function useFaqPageSchema(faqItems: FaqItemInput[]): FaqPageSchema {
  const { t, locale } = useI18n()

  const questions: FaqQuestion[] = faqItems.map(
    (item: FaqItemInput): FaqQuestion => ({
      '@type': 'Question',
      name: t(item.questionKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answerKey),
      },
    })
  )

  const schema: FaqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
  }

  return schema
}

/**
 * Generates a BreadcrumbList JSON-LD schema
 * @param items - Array of breadcrumb items with name and url
 * @returns BreadcrumbList schema object for JSON-LD
 */
export function useBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbSchema {
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item: BreadcrumbItem, index: number) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }

  return schema
}

/**
 * Injects a JSON-LD script into the page head
 * @param schema - The schema object to inject
 */
export function useJsonLd<T extends object>(schema: T): void {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}
