import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zenith-gold-vivid/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // ── Zenith brand variants ──────────────────────────────────────
        /** Glass gold outline — primary CTA across the site */
        gold: 'border border-zenith-gold-vivid/60 bg-zenith-gold-vivid/10 text-zenith-gold-vivid backdrop-blur-sm hover:border-zenith-gold-vivid hover:bg-zenith-gold-vivid/20 dark:border-zenith-gold-vivid/40 dark:hover:border-zenith-gold-vivid',
        /** Solid gold fill — high-emphasis CTAs on dark backgrounds */
        solid: 'bg-zenith-gold-vivid text-zenith-bg-dark hover:-translate-y-0.5 hover:bg-zenith-champagne',
        /** Text-only — secondary/navigation links */
        ghost: 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark',
        /** White border — for buttons on dark photo/overlay backgrounds */
        white: 'border border-white/30 bg-transparent text-white/90 backdrop-blur-sm hover:border-white/60 hover:bg-white/10 hover:text-white',
        // ── shadcn internal variants (kept for UI primitives) ──────────
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        default: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-sm',
        xl: 'px-8 py-4 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
