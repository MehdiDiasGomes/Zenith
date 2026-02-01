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
} from '@/types/seo'

const SITE_URL: string = 'https://www.dg-zenith.com'

/**
 * Generates the Organization/LocalBusiness JSON-LD schema
 * @returns Organization schema object for JSON-LD
 */
export function useOrganizationSchema(): OrganizationSchema {
  const { t, locale } = useI18n()

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zenith',
    description: t('seo.description'),
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/z_logo.png`,
    image: `${SITE_URL}/og-image.webp`,
    email: 'contact@dg-zenith.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28 cité des sports',
      addressLocality: 'Uckange',
      postalCode: '57270',
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'GeoCircle',
      name: 'Thionville, Moselle, Grand Est, France',
    },
    sameAs: ['https://www.instagram.com/zenith.webdesign/'],
    priceRange: '€€',
    serviceType: [
      'Web Development',
      'Web Design',
      'UI/UX Design',
      'SEO Optimization',
      'E-commerce Development',
    ],
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
