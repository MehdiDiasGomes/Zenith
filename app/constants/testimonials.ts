export interface Testimonial {
  id: string
  nameKey: string
  companyKey: string
  textKey: string
  rating: number
  date: string
  source: 'google'
}

export const testimonials: Testimonial[] = [
  {
    id: 'petite-leona',
    nameKey: 'testimonials.items.petiteLeona.name',
    companyKey: 'testimonials.items.petiteLeona.company',
    textKey: 'testimonials.items.petiteLeona.text',
    rating: 5,
    date: '2026-04-14',
    source: 'google',
  },
]
