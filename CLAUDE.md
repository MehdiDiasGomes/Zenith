# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context: Zenith

This project is the website for **Zenith**, a custom web development and design agency. The site is being migrated from a personal portfolio to a corporate agency website while maintaining the same technical stack.

### About Zenith

- **Type**: Web development and design agency
- **Services**: Custom website creation and development
- **Brand positioning**: Luxury, professional, accessible

### Current Migration Scope

**Phase 1 (Current)**:

- Landing page
- Contact page

**Phase 2 (Later)**:

- About page
- Blog/News section

### Brand Identity

**Logo**: `public/images/brand/z_logo.png` - Golden gradient logo with "ZENITH" text

**Color Palette** (Gold/Bronze luxury theme):

```css
/* Primary Colors */
--zenith-bronze-dark: #7b542f /* Dark bronze for text, borders, dark elements */
  --zenith-gold-bronze: #b6771d /* Main gold-bronze for primary accents, buttons, links */
  --zenith-gold-vivid: #ff9d00 /* Vivid gold for CTAs, hover states, important elements */
  --zenith-champagne: #ffcf71 /* Light champagne for highlights, gradients, light effects */
  /* Neutral Colors */ --zenith-bg-dark: #0a0a0a /* Dark mode background */
  --zenith-bg-light: #fafaf9 /* Light mode background */ --zenith-bg-secondary-dark: #1a1a1a
  --zenith-bg-secondary-light: #f5f5f4 --zenith-text-primary-dark: #ffffff
  --zenith-text-primary-light: #1a1a1a --zenith-text-secondary-dark: #e5e5e5
  --zenith-text-secondary-light: #737373;
```

**Typography**:

- **Primary font**: Montserrat (replaces Trirong)
  - Headings: Montserrat Bold/SemiBold (600-700)
  - Body: Montserrat Regular/Medium (400-500)
  - CTAs: Montserrat SemiBold (600)

**Visual Style**:

- Corporate modern: Professional yet accessible
- Subtle and fluid animations
- Generous spacing for breathing room
- High contrast for readability
- Golden glow effects on interactive elements
- Dark/Light mode support (both themes maintained)

**Component Styling Guidelines**:

- Buttons: Gold background (#FF9D00) with golden glow on hover
- Cards: Bronze borders (#B6771D) with subtle hover effects
- Forms: Inputs with vivid gold focus states
- Navigation: Links with animated golden underline

## Development Commands

### Running the project

```bash
bun dev                # Start development server
bun dev:http           # Start dev server with network access (--host)
bun build              # Build for production
bun generate           # Generate static site
bun preview            # Preview production build
```

**Note**: This project uses **Bun** as the runtime and package manager, not npm or yarn.

## Project Architecture

### Technology Stack

- **Framework**: Nuxt.js 3 (v3.15.4) with Vue.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utility classes
- **UI Components**: shadcn-nuxt + Radix Vue (accessible primitives)
- **Internationalization**: @nuxtjs/i18n (French/English)
- **Content**: @nuxt/content for markdown pages
- **Theme**: @nuxtjs/color-mode for dark/light mode
- **Form Validation**: Vee-validate + Zod schemas
- **Email Service**: EmailJS for contact form
- **Anti-spam**: Vue Recaptcha v3

### Directory Structure

```
components/
├── about/             # About page components (education, experiences, skills)
├── common/            # Shared reusable components
├── education/         # Education-specific components
├── footer/            # Footer components
├── icons/             # Custom icon components (tech logos, social icons)
├── projects/          # Project display components
├── skills/            # Skills display components
└── ui/                # shadcn UI components (buttons, forms, dialogs, etc.)

pages/
├── about/             # About page route
├── contact/           # Contact page route
├── projects/          # Projects page route
├── en/                # English privacy policy
├── fr/                # French privacy policy
└── index.vue          # Homepage

constants/
├── about/             # Personal information data
├── projects/          # Project data and metadata
└── skills/            # Skills and tech stack data

types/                 # TypeScript type definitions
i18n/locales/          # Translation files (fr.json, en.json)
content/               # Markdown content for @nuxt/content
```

### Core Component Organization

**Main layout components**:

- `layouts/default.vue` - Main layout wrapper
- `components/Navbar.vue` - Navigation bar
- `components/Header.vue` - Homepage header
- `components/Footer.vue` - Site footer

**Feature components**:

- `components/Projects.vue` - Projects listing
- `components/WorkXp.vue` - Work experience timeline
- `components/ContactForm.vue` - Contact form with validation
- `components/LangChoice.vue` - Language switcher

**About section** (`components/about/`):

- `About.vue` - Main about section wrapper
- `AboutHeader.vue` - About page header
- `AboutEducation.vue` - Education history
- `AboutExperiences.vue` - Work experiences
- `AboutSkills.vue` - Technical skills display

### Styling System

**Custom Tailwind utilities** (defined in `tailwind.config.js`):

- `.mp-home` - Responsive horizontal padding for main content
- `.text-xxl`, `.text-xl`, `.text-l`, `.text-m`, `.text-s` - Responsive text sizes
- `.text-intro`, `.text-main`, `.text-legend`, `.text-cta` - Semantic text classes

**Custom utility classes** (defined in `assets/css/tailwind.css`):

- `.glass-effect` - Glass morphism effect with backdrop blur
- `.glass-effect-dark` - Dark variant of glass effect
- `.text-gradient-primary` - Purple to blue gradient text
- `.text-gradient-secondary` - Blue to pink gradient text
- `.smooth-transition` - Standard transition timing
- `.fade-in` - Fade in animation (0.5s ease-out)
- `.hover-glow` - Glow effect on hover

**Custom color tokens**:

- `primaryPerso: '#CBACF9'` - Primary purple accent
- `secondaryPerso: '#7E7E7E'` - Secondary gray
- `backgroundForeground: '#04071D'` - Dark background
- `borderPerso: '#303247'` - Border color

**CSS variables** (defined in `assets/css/tailwind.css`):

- HSL-based color system with automatic dark mode variants
- Typography colors: `--heading-primary`, `--text-primary`, `--text-secondary`, `--text-muted`
- Accent colors: `--accent-purple`, `--accent-blue`, `--accent-pink`
- Global responsive typography styles for `h1`-`h6` and `p` elements

Use these custom classes for consistency across components.

### Internationalization

- Default locale: French (`fr`)
- Supported locales: French (`fr`), English (`en`)
- Translation files: `i18n/locales/fr.json`, `i18n/locales/en.json`
- Access translations in components: `{{ $t('key.path') }}`
- Privacy policies are page-based: `/fr/privacy` and `/en/privacy`

### Path Aliases

Configured in `components.json`:

```typescript
@/components  → components/
@/composables → composables/
@/lib         → lib/
@/lib/utils   → lib/utils
@/components/ui → components/ui/
```

### Form Validation Pattern

Forms use Vee-validate with Zod schemas. Example from `ContactForm.vue`:

```typescript
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    field: z.string().min(1, 'Required message'),
  }),
)
```

### Animation System

The project uses `@formkit/auto-animate` for automatic animations:

- Composable: `useAutoAnimate()` exported from `composables/useAutoAnimate.ts`
- Usage: Add `v-auto-animate` directive to parent elements for automatic child animations
- Common use cases: Form field errors, list transitions, conditional content

Example:

```vue
<FormItem v-auto-animate>
  <FormControl>...</FormControl>
  <FormMessage />  <!-- Animates in/out automatically -->
</FormItem>
```

### Content Management

- Static data lives in `constants/` directories as TypeScript files
- Blog/markdown content uses `@nuxt/content` from `content/` directory
- Content config: `content.config.ts`

### Icons

- Primary icon library: Lucide Vue Next
- Custom tech/social icons in `components/icons/`
- Import pattern: `import { IconName } from 'lucide-vue-next'`

### Component Library

This project uses **shadcn-nuxt** components which are:

- Located in `components/ui/`
- Based on Radix Vue primitives
- Styled with Tailwind CSS
- Fully accessible and customizable

Common UI components available: Button, Input, Label, Sheet, DropdownMenu, Toast

## Coding Standards

**This project follows STRICT clean code and TypeScript practices:**

### Type Safety Rules - EVERYTHING MUST BE TYPED

**1. Variables and Constants**

```typescript
// ✅ GOOD - Always explicit types
const name: string = 'Zenith'
const count: number = 0
const isActive: boolean = false
let userId: string | null = null

// ❌ BAD - No implicit types
const name = 'Zenith'
const count = 0
```

**2. Refs and Reactive**

```typescript
// ✅ GOOD - Simple types
const name = ref<string>('')
const count = ref<number>(0)
const isLoading = ref<boolean>(false)

// ✅ GOOD - Complex types (create in types/)
const project = ref<Project | null>(null)
const projects = ref<Project[]>([])

// ❌ BAD
const name = ref('') // No type
```

**3. Functions**

```typescript
// ✅ GOOD - All parameters and return types
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

const formatName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`
}

// Async functions
async function fetchProjects(): Promise<Project[]> {
  // ...
}

// ❌ BAD - Missing types
function calculateTotal(price, quantity) {
  return price * quantity
}
```

**4. Component Props**

```typescript
// ✅ GOOD - Define props interface
interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  imageUrl?: string // Optional
}

const props = defineProps<ProjectCardProps>()

// ❌ BAD - No typing
const props = defineProps(['title', 'description'])
```

**5. Composables**

```typescript
// ✅ GOOD - Typed return
export function useProjects() {
  const projects = ref<Project[]>([])
  const loading = ref<boolean>(false)

  const fetchProjects = async (): Promise<void> => {
    loading.value = true
    // ...
  }

  return {
    projects: readonly(projects),
    loading: readonly(loading),
    fetchProjects,
  }
}
```

**6. Event Handlers**

```typescript
// ✅ GOOD
const handleClick = (event: MouseEvent): void => {
  console.log(event.target)
}

const handleSubmit = async (formData: FormData): Promise<void> => {
  // ...
}
```

### Complex Type Organization

**When types are complex, create dedicated files in `types/` directory:**

```typescript
// types/project.ts
export interface Project {
  id: string
  title: string
  description: string
  technologies: Technology[]
  status: ProjectStatus
}

export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface Technology {
  name: string
  icon: string
}
```

**File structure for types:**

- Component-specific types → `types/components/`
- Constants types → `types/constants/`
- API/Data types → `types/` (root)
- Keep type files focused and single-purpose

### Clean Code Principles (Non-Negotiable)

- **Descriptive naming**: Clear, self-documenting names (no `data`, `temp`, `x`)
- **Single responsibility**: One function = one purpose
- **No magic numbers/strings**: Use named constants
- **DRY principle**: Don't repeat yourself
- **Proper error handling**: Explicit try/catch and error types
- **Meaningful comments**: Only when logic is complex (code should be self-explanatory)
- **Consistent formatting**: Follow existing patterns

## Accessibility & Internationalization (CRITICAL)

**IMPORTANT: This project MUST follow strict accessibility (a11y) standards and full multilingual support.**

### Accessibility (a11y) Requirements

**WCAG 2.1 Level AA compliance is MANDATORY:**

1. **Semantic HTML**
   - Use proper heading hierarchy (h1 → h2 → h3, no skipping)
   - Use semantic elements (`<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
   - NEVER use `<div>` for interactive elements

2. **ARIA Labels & Attributes**

   ```vue
   <!-- ✅ GOOD -->
   <button aria-label="Close menu">
     <IconClose aria-hidden="true" />
   </button>

   <nav aria-label="Main navigation">...</nav>
   <img src="..." alt="Descriptive text" />

   <!-- ❌ BAD -->
   <button><IconClose /></button>
   <!-- No label -->
   <img src="..." />
   <!-- Missing alt -->
   ```

3. **Keyboard Navigation**
   - ALL interactive elements must be keyboard accessible (Tab, Enter, Escape)
   - Visible focus states (`:focus-visible` in Tailwind)
   - Logical tab order
   - No keyboard traps

4. **Color Contrast**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text (18pt+)
   - Test all gold/bronze colors against backgrounds
   - Don't rely on color alone to convey information

5. **Form Accessibility**

   ```vue
   <!-- ✅ GOOD -->
   <FormField>
     <FormLabel for="email">{{ $t('form.email') }}</FormLabel>
     <FormControl>
       <Input
         id="email"
         type="email"
         :aria-describedby="error ? 'email-error' : undefined"
         :aria-invalid="!!error"
       />
     </FormControl>
     <FormMessage id="email-error">{{ error }}</FormMessage>
   </FormField>
   ```

6. **Screen Reader Support**
   - Use `aria-live` for dynamic content
   - Add `sr-only` class for screen-reader-only text
   - Proper `role` attributes where needed
   - Test with NVDA/JAWS/VoiceOver

### Internationalization (i18n) Requirements

**Dual language support (French/English) is MANDATORY:**

1. **All User-Facing Text MUST Use i18n**

   ```vue
   <!-- ✅ GOOD -->
   <h1>{{ $t('home.title') }}</h1>
   <Button :aria-label="$t('actions.close')">
     {{ $t('actions.close') }}
   </Button>

   <!-- ❌ BAD -->
   <h1>Welcome to Zenith</h1>
   <!-- Hardcoded text -->
   ```

2. **Translation File Structure**

   ```json
   // app/i18n/locales/fr.json
   {
     "home": {
       "title": "Bienvenue chez Zenith",
       "description": "Agence de développement web"
     },
     "actions": {
       "close": "Fermer",
       "open": "Ouvrir"
     },
     "aria": {
       "mainNav": "Navigation principale",
       "closeMenu": "Fermer le menu"
     }
   }
   ```

3. **Combine i18n with ARIA**

   ```vue
   <nav :aria-label="$t('aria.mainNav')">
     <button
       :aria-label="$t('aria.closeMenu')"
       :aria-expanded="isOpen"
     >
       <IconClose :aria-hidden="true" />
       <span class="sr-only">{{ $t('actions.close') }}</span>
     </button>
   </nav>
   ```

4. **Date/Number Formatting**
   - Use i18n number and date formatters
   - Respect locale-specific formats

5. **RTL Support** (Future consideration)
   - Structure prepared for RTL languages if needed
   - Use logical properties (start/end vs left/right)

### Testing Requirements

- **Manual testing**: Test with keyboard only (no mouse)
- **Screen reader testing**: Test with at least one screen reader
- **Automated tools**: Run axe DevTools or Lighthouse accessibility audit
- **Color contrast**: Use WebAIM Contrast Checker
- **Language switching**: Test all features in both FR and EN

## Important Notes

- **Color mode**: Uses class-based dark mode (`darkMode: ["class"]` in Tailwind config)
  - Default preference: dark mode
  - Managed by `@nuxtjs/color-mode` module
- **reCAPTCHA**: Configured via plugin at `plugins/vue-recaptcha-v3.ts` (client-side only)
  - Site key is public and safe to commit
  - Badge auto-hidden in configuration
- **Component auto-import**: Nuxt auto-imports components from `components/` directory
- **Composables**: Auto-imported from `composables/` directory
- **Type safety**: Project uses STRICT TypeScript - ALL code must be explicitly typed (see Coding Standards)
- **SEO**: Global SEO configuration in `app.vue` using `useSeoMeta()` and `useHead()`
  - Translations for meta tags via i18n
  - Dynamic `lang` attribute based on current locale
  - Configured for social sharing (Open Graph, Twitter Cards)

## Migration Notes

This codebase is currently being migrated from a personal portfolio (Mehdi DIAS GOMES) to the Zenith agency website. When working on this project:

- Prioritize Zenith branding and color scheme over legacy portfolio styles
- Maintain all existing technical infrastructure and component architecture
- Phase 1 focuses on Landing + Contact pages only
- Keep all UI components (shadcn) but adapt styling to Zenith brand
- Update typography from Trirong to Montserrat throughout

## Related Documentation

**Note**: `LLMS.md` contains the legacy portfolio context. For current project direction, refer to the "Project Context: Zenith" section at the top of this file.
