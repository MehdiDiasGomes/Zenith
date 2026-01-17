export interface Service {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
  imageAltKey: string
  imagePath: string
}

export const services: Service[] = [
  {
    id: 'web-dev',
    icon: 'Code2',
    titleKey: 'services.webDev.title',
    descriptionKey: 'services.webDev.description',
    imageAltKey: 'services.webDev.imageAlt',
    imagePath: '/assets/illustrations/programming.svg',
  },
  {
    id: 'ui-ux',
    icon: 'Palette',
    titleKey: 'services.uiUx.title',
    descriptionKey: 'services.uiUx.description',
    imageAltKey: 'services.uiUx.imageAlt',
    imagePath: '/assets/illustrations/contact.svg',
  },
  {
    id: 'performance',
    icon: 'Zap',
    titleKey: 'services.performance.title',
    descriptionKey: 'services.performance.description',
    imageAltKey: 'services.performance.imageAlt',
    imagePath: '/assets/illustrations/seo.svg',
  },
  {
    id: 'maintenance',
    icon: 'Settings',
    titleKey: 'services.maintenance.title',
    descriptionKey: 'services.maintenance.description',
    imageAltKey: 'services.maintenance.imageAlt',
    imagePath: '/assets/illustrations/maintenance.svg',
  },
]
