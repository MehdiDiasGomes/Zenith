const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        trirong: ['Trirong', 'serif'],
      },
      colors: {
        // Zenith Brand Colors
        'zenith-bronze-dark': '#7B542F',
        'zenith-gold-bronze': '#B6771D',
        'zenith-gold-vivid': '#FF9D00',
        'zenith-champagne': '#FFCF71',
        'zenith-bg-dark': '#0A0A0A',
        'zenith-bg-light': '#FAFAF9',
        'zenith-bg-secondary-dark': '#1A1A1A',
        'zenith-bg-secondary-light': '#F5F5F4',
        'zenith-text-primary-dark': '#FFFFFF',
        'zenith-text-primary-light': '#1A1A1A',
        'zenith-text-secondary-dark': '#E5E5E5',
        'zenith-text-secondary-light': '#737373',

        // Legacy colors
        mauve: 'hsl(var(--mauve))',
        foreground: 'hsl(var(--foreground))',
        darkblue: 'hsl(var(--darkblue))',
        midnightBlue: 'hsl(var(--midnightBlue))',
        softSlate: 'hsl(var(--softSlate))',
        midnightOverlay: 'hsl(var(--midnightOverlay))',
        primaryPerso: '#CBACF9',
        secondaryPerso: '#7E7E7E',
        backgroundForeground: '#04071D',
        borderPerso: '#303247',
        hoverForegroundPerso: '#0d1132',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        xl: '0.75rem',
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.125rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--reka-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--reka-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--reka-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    animate,
    function ({ addUtilities }) {
      addUtilities({
        '.mp-home': {
          padding: '0 3%',
          '@screen sm': { padding: '0 5%' },
          '@screen md': { padding: '0 8%' },
          '@screen lg': { padding: '0 10%' },
          '@screen 2xl': { padding: '0 25%' },
        },
        '.text-xl': {
          '@screen sm': { fontSize: '2rem', lineHeight: '2rem' },
          '@screen xl': { fontSize: '2.5rem', lineHeight: '2.5rem' },
          '@screen 2xl': { fontSize: '3.125rem', lineHeight: '3.125rem' },
        },
        '.text-xxl': {
          '@screen sm': { fontSize: '2.25rem', lineHeight: '2.75rem' },
          '@screen md': { fontSize: '2.75rem', lineHeight: '3.25rem' },
          '@screen xl': { fontSize: '3rem', lineHeight: '3.75rem' },
          '@screen 2xl': { fontSize: '3.75rem', lineHeight: '4.875rem' },
        },
        '.text-l': {
          '@screen sm': { fontSize: '1.5rem', lineHeight: '2rem' },
          '@screen md': { fontSize: '2rem', lineHeight: '2.5rem' },
          '@screen xl': { fontSize: '2.25rem', lineHeight: '2.75rem' },
          '@screen 2xl': { fontSize: '2.5rem', lineHeight: '3.25rem' },
        },
        '.text-m': {
          '@screen sm': { fontSize: '1.125rem', lineHeight: '1.5rem' },
          '@screen md': { fontSize: '1.375rem', lineHeight: '1.75rem' },
          '@screen xl': { fontSize: '1.5rem', lineHeight: '2rem' },
          '@screen 2xl': { fontSize: '1.875rem', lineHeight: '2.4375rem' },
        },
        '.text-s': {
          '@screen sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
          '@screen md': { fontSize: '1rem', lineHeight: '1.375rem' },
          '@screen xl': { fontSize: '1.125rem', lineHeight: '1.5rem' },
          '@screen 2xl': { fontSize: '1.25rem', lineHeight: '1.625rem' },
        },
        '.text-intro': {
          '@screen sm': { fontSize: '1rem', lineHeight: '1.5rem' },
          '@screen md': { fontSize: '1.125rem', lineHeight: '1.75rem' },
          '@screen xl': { fontSize: '1.25rem', lineHeight: '2rem' },
          '@screen 2xl': { fontSize: '1.375rem', lineHeight: '2.0625rem' },
        },
        '.text-main': {
          '@screen sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
          '@screen md': { fontSize: '1rem', lineHeight: '1.5rem' },
          '@screen xl': { fontSize: '1.125rem', lineHeight: '1.75rem' },
          '@screen 2xl': { fontSize: '1rem', lineHeight: '1.5rem' },
        },
        '.text-legend': {
          '@screen sm': { fontSize: '0.75rem', lineHeight: '1rem' },
          '@screen md': { fontSize: '0.875rem', lineHeight: '1.25rem' },
          '@screen xl': { fontSize: '1rem', lineHeight: '1.5rem' },
          '@screen 2xl': { fontSize: '0.875rem', lineHeight: '1.3125rem' },
        },
        '.text-cta': {
          '@screen sm': { fontSize: '0.75rem', lineHeight: '1rem' },
          '@screen md': { fontSize: '0.875rem', lineHeight: '1.125rem' },
          '@screen xl': { fontSize: '1rem', lineHeight: '1.25rem' },
          '@screen 2xl': { fontSize: '0.875rem', lineHeight: '1.1375rem' },
        },
      })
    },
    require('tailwindcss-animated'),
    require('@tailwindcss/typography'),
  ],
}
