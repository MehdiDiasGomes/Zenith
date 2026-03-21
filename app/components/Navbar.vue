<template>
  <!-- Sticky Navbar -->
  <nav
    :aria-label="$t('nav.ariaLabel')"
    class="fixed left-0 right-0 top-0 z-[999] transition-all duration-300"
    :class="[
      mobileMenuOpen
        ? 'bg-transparent shadow-none'
        : 'bg-zenith-bg-light/95 backdrop-blur-md dark:bg-zenith-bg-dark/95',
      isScrolled && !mobileMenuOpen ? 'shadow-lg shadow-black/10 dark:shadow-black/40' : '',
      isHidden && !mobileMenuOpen ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <!-- Gold gradient bottom border (hidden when overlay open) -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!mobileMenuOpen"
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/60 to-transparent dark:via-zenith-gold-vivid/40"
        aria-hidden="true"
      />
    </Transition>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between md:h-20">

        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="group relative z-10 flex flex-shrink-0 items-center"
          :aria-label="$t('nav.logoAriaLabel')"
          @click="closeMobileMenu"
        >
          <NuxtImg
            src="/images/brand/logo.webp"
            alt="Zenith Logo"
            width="600"
            height="600"
            class="h-9 w-auto transition-all duration-300 group-hover:brightness-110 md:h-12"
            :class="mobileMenuOpen ? 'brightness-[2]' : ''"
            loading="eager"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-0 md:flex lg:gap-1">
          <NuxtLink
            v-for="item in desktopNavItems"
            :key="item.to"
            :to="localePath(item.to)"
            class="group relative px-4 py-2 text-sm font-medium transition-colors duration-200 lg:px-5"
            :class="
              isActive(item.to)
                ? 'text-zenith-gold-vivid'
                : 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark'
            "
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ $t(item.label) }}
            <!-- Active underline -->
            <span
              v-if="isActive(item.to)"
              class="absolute bottom-0 left-4 right-4 h-px bg-zenith-gold-vivid lg:left-5 lg:right-5"
            />
          </NuxtLink>
        </div>

        <!-- Right: CTA + Hamburger -->
        <div class="flex items-center gap-3">
          <!-- Desktop CTA -->
          <Button as-child variant="gold" size="sm" class="hidden md:inline-flex">
            <NuxtLink :to="localePath('/contact')">
              {{ $t('nav.contact') }}
            </NuxtLink>
          </Button>

          <!-- Mobile Hamburger — 2 lines morphing into X -->
          <button
            type="button"
            :aria-label="$t('nav.toggleMenu')"
            :aria-expanded="mobileMenuOpen"
            class="hamburger-btn flex md:hidden"
            :class="{ 'is-open': mobileMenuOpen }"
            @click="toggleMobileMenu"
          >
            <span class="bar" />
            <span class="bar" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Fullscreen Mobile Overlay -->
  <Transition name="overlay-fade">
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay flex md:hidden"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('nav.ariaLabel')"
    >
      <!-- Ambient radial glow — top-right corner -->
      <div class="ambient-glow" aria-hidden="true" />

      <!-- Overlay body -->
      <div class="overlay-body">
        <!-- Nav links -->
        <nav :aria-label="$t('nav.ariaLabel')">
          <ul role="list">
            <li
              v-for="(item, index) in navItems"
              :key="item.to"
              class="nav-row"
              :style="`--i: ${index}`"
              role="listitem"
            >
              <NuxtLink
                :to="localePath(item.to)"
                class="nav-row-link"
                :class="{ 'is-active': isActive(item.to) }"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                @click="closeMobileMenu"
              >
                <!-- Index number -->
                <span class="nav-index" aria-hidden="true">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <!-- Clipped text reveal -->
                <div class="nav-text-clip">
                  <span class="nav-text">{{ $t(item.label) }}</span>
                </div>

                <!-- Hover arrow -->
                <span class="nav-arrow" aria-hidden="true">→</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Footer strip -->
      <footer class="overlay-footer" aria-label="Footer">
        <span>Zenith</span>
        <span>Thionville, France · {{ currentYear }}</span>
      </footer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { navItems } from '~/constants/navigation'

const route = useRoute()
const localePath = useLocalePath()

const mobileMenuOpen = ref<boolean>(false)
const isScrolled = ref<boolean>(false)
const isHidden = ref<boolean>(false)
let lastScrollY: number = 0

const currentYear: number = new Date().getFullYear()

/** Nav items without contact (shown separately as CTA on desktop) */
const desktopNavItems = computed(() =>
  navItems.filter((item) => item.to !== '/contact'),
)

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

const isActive = (path: string): boolean => {
  return route.path === localePath(path)
}

const handleScroll = (): void => {
  const currentScrollY: number = window.scrollY
  isScrolled.value = currentScrollY > 20
  isHidden.value = currentScrollY > 80 && currentScrollY > lastScrollY
  lastScrollY = currentScrollY
}

/** Lock body scroll when the overlay is open */
watch(mobileMenuOpen, (isOpen: boolean) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<style scoped>
/* ─────────────────────────────────────────────────────────
   Hamburger — 2 bars morphing into X
───────────────────────────────────────────────────────── */
.hamburger-btn {
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: 1px solid rgba(182, 119, 29, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.hamburger-btn:hover {
  border-color: rgba(255, 157, 0, 0.6);
  background: rgba(255, 157, 0, 0.05);
}

/* When overlay is open: borderless, blends into dark background */
.hamburger-btn.is-open {
  border-color: rgba(255, 255, 255, 0.15);
  background: transparent;
}

.bar {
  display: block;
  width: 20px;
  height: 1px;
  background: #b6771d;
  transform-origin: center;
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
}

:global(.dark) .bar {
  background: #ff9d00;
}

.hamburger-btn.is-open .bar {
  background: rgba(255, 255, 255, 0.65);
}

/* Bar 1 rotates to form the / of X */
.hamburger-btn.is-open .bar:first-child {
  transform: translateY(4px) rotate(45deg);
}

/* Bar 2 rotates to form the \ of X */
.hamburger-btn.is-open .bar:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Hidden on desktop — declared after display:flex to win the cascade */
@media (min-width: 768px) {
  .hamburger-btn {
    display: none;
  }
}

/* ─────────────────────────────────────────────────────────
   Fullscreen overlay
───────────────────────────────────────────────────────── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
  background-color: #0c0b09;
  flex-direction: column;
  overflow: hidden;
}

/* Overlay enter / leave */
.overlay-fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.overlay-fade-leave-active {
  transition: opacity 0.22s ease-in;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* ─────────────────────────────────────────────────────────
   Ambient glow — top-right radial
───────────────────────────────────────────────────────── */
.ambient-glow {
  position: absolute;
  top: -15%;
  right: -15%;
  width: 65vw;
  height: 65vw;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(182, 119, 29, 0.13) 0%,
    rgba(182, 119, 29, 0.04) 45%,
    transparent 70%
  );
  pointer-events: none;
}

/* ─────────────────────────────────────────────────────────
   Overlay body — vertically centred nav
───────────────────────────────────────────────────────── */
.overlay-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 1.75rem 0;
}

/* ─────────────────────────────────────────────────────────
   Nav rows
───────────────────────────────────────────────────────── */
.nav-row {
  border-bottom: 1px solid rgba(182, 119, 29, 0.12);
  opacity: 0;
  animation: rowAppear 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(0.12s + var(--i) * 0.075s);
}

.nav-row:first-child {
  border-top: 1px solid rgba(182, 119, 29, 0.12);
}

@keyframes rowAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Row link — flex, baseline-aligned */
.nav-row-link {
  display: flex;
  align-items: baseline;
  gap: 0.875rem;
  padding: 1.1rem 0;
  text-decoration: none;
  cursor: pointer;
  position: relative;
}

/* ─── Index number ─── */
.nav-index {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(182, 119, 29, 0.5);
  flex-shrink: 0;
  padding-bottom: 0.2em;
  transition: color 0.25s ease;
  line-height: 1;
}

/* ─── Clipped text container ─── */
.nav-text-clip {
  flex: 1;
  overflow: hidden;
  /* Slight extra height so descenders don't clip */
  padding-bottom: 0.1em;
}

/* ─── Link text ─── */
.nav-text {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(2.25rem, 9vw, 3.25rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  transform: translateY(110%);
  animation: textSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(0.18s + var(--i) * 0.075s);
  transition: color 0.25s ease;
}

@keyframes textSlideUp {
  to {
    transform: translateY(0);
  }
}

/* ─── Hover arrow ─── */
.nav-arrow {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  color: #ff9d00;
  flex-shrink: 0;
  align-self: center;
  opacity: 0;
  transform: translateX(-10px);
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Hover & active states ─── */
.nav-row-link:hover .nav-arrow,
.nav-row-link:focus-visible .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

.nav-row-link:hover .nav-text,
.nav-row-link:focus-visible .nav-text {
  color: #ff9d00;
}

.nav-row-link:hover .nav-index,
.nav-row-link:focus-visible .nav-index {
  color: rgba(255, 157, 0, 0.75);
}

.nav-row-link.is-active .nav-text {
  color: #ff9d00;
}

.nav-row-link.is-active .nav-index {
  color: rgba(255, 157, 0, 0.85);
}

.nav-row-link:focus-visible {
  outline: none;
}

/* ─────────────────────────────────────────────────────────
   Footer strip
───────────────────────────────────────────────────────── */
.overlay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.75rem 2rem;
  border-top: 1px solid rgba(182, 119, 29, 0.14);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.575rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  animation: footerIn 0.45s ease forwards;
  animation-delay: 0.55s;
}

@keyframes footerIn {
  to {
    opacity: 1;
  }
}
</style>
