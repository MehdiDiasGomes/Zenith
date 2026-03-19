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

export interface LocalBusinessRef {
  '@type': 'LocalBusiness'
  name: string
  url: string
}

export interface PricingOfferItem {
  '@type': 'Offer'
  name: string
  description: string
  price: number
  priceCurrency: 'EUR'
  url: string
  availability: 'https://schema.org/InStock'
  seller: LocalBusinessRef
}

export interface ServiceItem {
  '@type': 'Service'
  name: string
  description: string
  provider: LocalBusinessRef
  url: string
  areaServed: ServiceArea[]
}

export interface CreativeWorkItem {
  '@type': 'CreativeWork'
  name: string
  description: string
  url?: string
  image?: string
  author: LocalBusinessRef
}

export interface ItemListElement<T> {
  '@type': 'ListItem'
  position: number
  item: T
}

export interface ItemListSchema<T> {
  '@context': 'https://schema.org'
  '@type': 'ItemList'
  name: string
  url: string
  itemListElement: ItemListElement<T>[]
  inLanguage: string
}

export interface BlogPostingAuthor {
  '@type': 'Person'
  name: string
  url: string
}

export interface BlogPostingPublisher {
  '@type': 'Organization'
  name: string
  url: string
  logo: ImageObject
}

export interface BlogPostingSchema {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  url: string
  author: BlogPostingAuthor
  publisher: BlogPostingPublisher
  inLanguage: string
  articleSection: string
}
