export interface NavItem {
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { to: '/', label: 'nav.home' },
  { to: '#services', label: 'nav.services' },
  // { to: '#projects', label: 'nav.projects' },
  { to: '#pricing', label: 'nav.pricing' },
]
