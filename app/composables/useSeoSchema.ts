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
  PricingOfferItem,
  ServiceItem,
  CreativeWorkItem,
  ItemListSchema,
  BlogPostingSchema,
} from '@/types/seo'
import { pricingPlans, DISCOUNT_PERCENTAGE } from '~/constants/pricing'
import { projects } from '~/constants/projects'

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
    { '@type': 'AdministrativeArea', name: 'France' },
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
 * Generates an ItemList schema for the pricing page offers
 * @returns ItemList schema with Offer items for each pricing plan
 */
export function usePricingOffersSchema(): ItemListSchema<PricingOfferItem> {
  const { t, locale } = useI18n()

  const seller = { '@type': 'LocalBusiness' as const, name: 'Zenith', url: SITE_URL }

  const schema: ItemListSchema<PricingOfferItem> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('seo.offerCatalogName'),
    url: `${SITE_URL}/pricing`,
    itemListElement: pricingPlans.map((plan, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      item: {
        '@type': 'Offer' as const,
        name: t(plan.titleKey),
        description: t(plan.descriptionKey),
        price: plan.basePrice > 0
          ? Math.round(plan.basePrice * (1 - DISCOUNT_PERCENTAGE / 100))
          : 0,
        priceCurrency: 'EUR' as const,
        url: `${SITE_URL}/pricing`,
        availability: 'https://schema.org/InStock' as const,
        seller,
      },
    })),
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
  }

  return schema
}

/**
 * Generates an ItemList schema for the services page
 * @returns ItemList schema with Service items for each service offered
 */
export function useServicesListSchema(): ItemListSchema<ServiceItem> {
  const { t, locale } = useI18n()

  const provider = { '@type': 'LocalBusiness' as const, name: 'Zenith', url: SITE_URL }
  const areaServed: ServiceArea[] = [
    { '@type': 'City', name: 'Thionville' },
    { '@type': 'City', name: 'Metz' },
    { '@type': 'AdministrativeArea', name: 'Moselle' },
  ]

  const serviceKeys = [
    { key: 'webDev', anchor: '#web-dev' },
    { key: 'uiUx', anchor: '#ui-ux' },
    { key: 'seo', anchor: '#seo' },
    { key: 'maintenance', anchor: '#maintenance' },
  ]

  const schema: ItemListSchema<ServiceItem> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('pages.services.features.title'),
    url: `${SITE_URL}/services`,
    itemListElement: serviceKeys.map((service, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      item: {
        '@type': 'Service' as const,
        name: t(`pages.services.features.${service.key}.title`),
        description: t(`pages.services.features.${service.key}.description`),
        provider,
        url: `${SITE_URL}/services${service.anchor}`,
        areaServed,
      },
    })),
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
  }

  return schema
}

/**
 * Generates an ItemList schema for the portfolio page projects
 * @returns ItemList schema with CreativeWork items for each project
 */
export function useProjectsListSchema(): ItemListSchema<CreativeWorkItem> {
  const { t, locale } = useI18n()

  const author = { '@type': 'LocalBusiness' as const, name: 'Zenith', url: SITE_URL }

  const visibleProjects = projects.filter((project) => !project.id.startsWith('//'))

  const schema: ItemListSchema<CreativeWorkItem> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('pages.portfolio.title'),
    url: `${SITE_URL}/portfolio`,
    itemListElement: visibleProjects.map((project, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      item: {
        '@type': 'CreativeWork' as const,
        name: t(project.titleKey),
        description: t(project.descriptionKey),
        ...(project.link ? { url: project.link } : {}),
        ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
        author,
      },
    })),
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
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

/**
 * Generates a BlogPosting JSON-LD schema for a blog article
 * @param post - Blog post data
 * @returns BlogPosting schema object for JSON-LD
 */
export function useBlogPostingSchema(post: {
  title: string
  description: string
  image?: string
  date: string
  category: string
  path: string
}): BlogPostingSchema {
  const { locale } = useI18n()

  const absoluteImage: string = post.image
    ? `${SITE_URL}${post.image}`
    : `${SITE_URL}/og-image.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: absoluteImage,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}${post.path}`,
    author: {
      '@type': 'Person',
      name: 'Mehdi Dias Gomes',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zenith',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/z_logo.webp`,
        width: 600,
        height: 600,
      },
    },
    inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-GB',
    articleSection: post.category,
  }
}
