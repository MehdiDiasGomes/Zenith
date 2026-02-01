/**
 * SEO-related type definitions for JSON-LD schemas
 */

export interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress: string
  addressLocality: string
  postalCode: string
  addressCountry: string
}

export interface GeoCircle {
  '@type': 'GeoCircle'
  name: string
}

export interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  name: string
  description: string
  url: string
  logo: string
  image: string
  email: string
  address: PostalAddress
  areaServed: GeoCircle
  sameAs: string[]
  priceRange: string
  serviceType: string[]
  inLanguage: string
}

export interface FaqAnswer {
  '@type': 'Answer'
  text: string
}

export interface FaqQuestion {
  '@type': 'Question'
  name: string
  acceptedAnswer: FaqAnswer
}

export interface FaqPageSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: FaqQuestion[]
  inLanguage: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItem[]
}

export interface FaqItemInput {
  questionKey: string
  answerKey: string
}
