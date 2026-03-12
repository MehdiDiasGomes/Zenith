export interface NavItem {
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { to: '/services', label: 'nav.services' },
  { to: '/portfolio', label: 'nav.portfolio' },
  { to: '/pricing', label: 'nav.pricing' },
  { to: '/contact', label: 'nav.contact' },
]
