export interface Service {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

export const services: Service[] = [
  {
    id: 'web-dev',
    icon: 'Code2',
    titleKey: 'services.webDev.title',
    descriptionKey: 'services.webDev.description',
  },
  {
    id: 'ui-ux',
    icon: 'Palette',
    titleKey: 'services.uiUx.title',
    descriptionKey: 'services.uiUx.description',
  },
  {
    id: 'performance',
    icon: 'Zap',
    titleKey: 'services.performance.title',
    descriptionKey: 'services.performance.description',
  },
  {
    id: 'maintenance',
    icon: 'Settings',
    titleKey: 'services.maintenance.title',
    descriptionKey: 'services.maintenance.description',
  },
]
