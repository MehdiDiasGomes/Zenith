export type ProjectCategory = 'all' | 'showcase' | 'ecommerce' | 'saas' | 'portfolio'

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
  { id: 'showcase', labelKey: 'projects.categories.showcase' },
  { id: 'ecommerce', labelKey: 'projects.categories.ecommerce' },
  { id: 'saas', labelKey: 'projects.categories.saas' },
  { id: 'portfolio', labelKey: 'projects.categories.portfolio' },
]

export const projects: Project[] = [
  {
    id: 'kb-clean',
    titleKey: 'projects.kbClean.title',
    descriptionKey: 'projects.kbClean.description',
    image: '/images/projects/kb-clean.png',
    category: 'showcase',
    technologies: ['Nuxt 4', 'TailwindCSS', 'Shadcn', 'Resend', 'TypeScript'],
    link: 'https://kb-clean.vercel.app',
  },
  {
    id: 'my-massage-shop',
    titleKey: 'projects.myMassageShop.title',
    descriptionKey: 'projects.myMassageShop.description',
    image: '/images/projects/my-massage-shop.png',
    category: 'ecommerce',
    technologies: ['Nuxt 4', 'Shopify API', 'TypeScript', 'TailwindCSS', 'Shadcn'],
    link: 'https://mymassageshop.com',
  },
]
