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

export interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width: number
  height: number
}

export interface ServiceArea {
  '@type': 'City' | 'AdministrativeArea'
  name: string
}

export interface ServiceOffer {
  '@type': 'Offer'
  itemOffered: {
    '@type': 'Service'
    name: string
  }
}

export interface OfferCatalog {
  '@type': 'OfferCatalog'
  name: string
  itemListElement: ServiceOffer[]
}

export interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  name: string
  description: string
  url: string
  logo: ImageObject
  image: string
  email: string
  telephone: string
  address: PostalAddress
  areaServed: ServiceArea[]
  sameAs: string[]
  priceRange: string
  hasOfferCatalog: OfferCatalog
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
