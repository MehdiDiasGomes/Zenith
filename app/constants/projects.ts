export type ProjectCategory = 'all' | 'portfolio' | 'showcase' | 'ecommerce'

export interface Category {
  id: ProjectCategory
  labelKey: string
}

export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  image: string
  category: ProjectCategory
  technologies: string[]
  link?: string
  github?: string
}

export const categories: Category[] = [
  { id: 'all', labelKey: 'projects.categories.all' },
  { id: 'portfolio', labelKey: 'projects.categories.portfolio' },
  { id: 'showcase', labelKey: 'projects.categories.showcase' },
  { id: 'ecommerce', labelKey: 'projects.categories.ecommerce' },
]

export const projects: Project[] = [
  {
    id: 'my-massage-shop',
    titleKey: 'projects.myMassageShop.title',
    descriptionKey: 'projects.myMassageShop.description',
    image: '/images/projects/my-massage-shop.png',
    category: 'ecommerce',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Shopify'],
    link: 'https://mymassageshop.com/',
  },
  {
    id: 'barber-house',
    titleKey: 'projects.barberHouse.title',
    descriptionKey: 'projects.barberHouse.description',
    image: '/images/projects/barber-house.png',
    category: 'showcase',
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://barber-house-blue.vercel.app/',
    github: 'https://github.com/MehdiDiasGomes/Barber-House',
  },
  {
    id: 'zenith',
    titleKey: 'projects.zenith.title',
    descriptionKey: 'projects.zenith.description',
    image: '/images/projects/zenith.png',
    category: 'portfolio',
    technologies: ['Nuxt 4', 'TypeScript', 'TailwindCSS', 'i18n'],
    link: 'https://dg-zenith.com',
  },
  // {
  //   id: 'kb-clean',
  //   titleKey: 'projects.kbClean.title',
  //   descriptionKey: 'projects.kbClean.description',
  //   image: '/images/projects/kb-clean.png',
  //   category: 'showcase',
  //   technologies: ['Nuxt 4', 'TailwindCSS', 'Shadcn', 'Resend', 'TypeScript'],
  //   link: 'https://kb-clean.vercel.app',
  // },
]
