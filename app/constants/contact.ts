export interface ContactInfo {
  id: string
  icon: string
  labelKey: string
  value: string
  href: string
}

export const contactInfo: ContactInfo[] = [
  {
    id: 'email',
    icon: 'Mail',
    labelKey: 'contact.info.email.label',
    value: 'contact@dg-zenith.com',
    href: 'mailto:contact@dg-zenith.com',
  },
  {
    id: 'phone',
    icon: 'Phone',
    labelKey: 'contact.info.phone.label',
    value: '+33 7 89 62 69 27',
    href: 'tel:+33789626927',
  },
]
