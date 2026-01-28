<template>
  <div
    class="fixed left-0 right-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6 sm:pt-6 lg:px-8"
  >
    <nav
      :aria-label="$t('nav.ariaLabel')"
      class="mx-auto max-w-6xl rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light/90 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark/90 dark:shadow-black/30"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between md:h-20">
          <NuxtLink to="/" class="group flex items-center" :aria-label="$t('nav.logoAriaLabel')">
            <NuxtImg
              src="/images/brand/z_logo.webp"
              alt="Zenith Logo"
              class="h-8 w-auto md:h-12"
              loading="eager"
            />
          </NuxtLink>

          <div class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <component
              :is="item.to.startsWith('#') ? 'a' : 'NuxtLink'"
              v-for="item in navItems"
              :key="item.to"
              :to="item.to.startsWith('#') ? undefined : item.to"
              :href="item.to.startsWith('#') ? item.to : undefined"
              class="group relative cursor-pointer text-base font-medium text-zenith-text-primary-light transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :aria-label="item.to === '/' ? $t('nav.home') : undefined"
              @click="handleNavClick($event, item.to)"
            >
              <Icon v-if="item.to === '/'" name="Home" size="20" aria-hidden="true" />
              <template v-else>{{ $t(item.label) }}</template>
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300"
                :class="isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'"
              />
            </component>
          </div>

          <div class="flex items-center gap-3">
            <a
              href="#contact"
              class="hidden items-center gap-2 rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid md:inline-flex"
              @click="handleNavClick($event, '#contact')"
            >
              {{ $t('nav.contact') }}
            </a>

            <button
              type="button"
              :aria-label="$t('nav.toggleMenu')"
              :aria-expanded="mobileMenuOpen"
              class="rounded-lg bg-zenith-bg-secondary-light p-2.5 text-zenith-gold-bronze transition-all duration-200 hover:text-zenith-gold-vivid dark:bg-zenith-bg-secondary-dark md:hidden"
              @click="toggleMobileMenu"
            >
              <Icon :name="mobileMenuOpen ? 'X' : 'Menu'" size="20" aria-hidden="true" />
            </button>
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="mobileMenuOpen"
            class="border-t border-zenith-bronze-dark/10 py-4 dark:border-zenith-gold-bronze/20 md:hidden"
          >
            <div class="flex flex-col gap-2">
              <component
                :is="item.to.startsWith('#') ? 'a' : 'NuxtLink'"
                v-for="item in navItems"
                :key="item.to"
                :to="item.to.startsWith('#') ? undefined : item.to"
                :href="item.to.startsWith('#') ? item.to : undefined"
                class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                :class="
                  isActive(item.to)
                    ? 'bg-zenith-gold-vivid/10 text-zenith-gold-vivid'
                    : 'text-zenith-text-primary-light hover:bg-zenith-bg-secondary-light dark:text-zenith-text-primary-dark dark:hover:bg-zenith-bg-secondary-dark'
                "
                :aria-current="isActive(item.to) ? 'page' : undefined"
                :aria-label="item.to === '/' ? $t('nav.home') : undefined"
                @click="handleNavClick($event, item.to)"
              >
                <Icon v-if="item.to === '/'" name="Home" size="20" aria-hidden="true" />
                <template v-else>{{ $t(item.label) }}</template>
              </component>

              <a
                href="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid"
                @click="handleNavClick($event, '#contact')"
              >
                {{ $t('nav.contact') }}
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { navItems } from '~/constants/navigation'

const route = useRoute()

const mobileMenuOpen = ref<boolean>(false)
const activeSection = ref<string>('')

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

const scrollToSection = (event: Event, anchor: string): void => {
  event.preventDefault()
  const targetId = anchor.replace('#', '')
  const targetElement = document.getElementById(targetId)

  if (targetElement) {
    const navbarHeight = 100
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    closeMobileMenu()
  }
}

const scrollToTop = (event: Event): void => {
  event.preventDefault()
  if (route.path === '/') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } else {
    navigateTo('/')
  }
  closeMobileMenu()
}

const handleNavClick = (event: Event, path: string): void => {
  if (path === '/') {
    scrollToTop(event)
  } else if (path.startsWith('#')) {
    if (route.path === '/') {
      scrollToSection(event, path)
    } else {
      event.preventDefault()
      closeMobileMenu()
      navigateTo(`/${path}`)
    }
  } else {
    closeMobileMenu()
  }
}

const isActive = (path: string): boolean => {
  if (path.startsWith('#')) {
    return activeSection.value === path
  }
  if (path === '/') {
    return route.path === '/' && activeSection.value === ''
  }
  return route.path.startsWith(path)
}

onMounted(() => {
  const visibleSections: Map<string, IntersectionObserverEntry> = new Map()

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -66% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }

  const observerCallback = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target.id, entry)
      } else {
        visibleSections.delete(entry.target.id)
      }
    })

    if (visibleSections.size > 0) {
      const entries: IntersectionObserverEntry[] = Array.from(visibleSections.values())
      if (entries.length > 0) {
        let topSection: IntersectionObserverEntry = entries[0]!
        let minTop: number = entries[0]!.boundingClientRect.top

        for (const entry of entries) {
          const rect: DOMRectReadOnly = entry.boundingClientRect
          if (rect.top < minTop) {
            minTop = rect.top
            topSection = entry
          }
        }

        if (topSection.target instanceof Element) {
          activeSection.value = `#${topSection.target.id}`
        }
      }
    }
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  const sections = document.querySelectorAll('section[id]')
  sections.forEach((section) => observer.observe(section))

  const handleScroll = (): void => {
    if (window.scrollY < 200) {
      activeSection.value = ''
      visibleSections.clear()
    }
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
  })
})

watch(
  () => route.path,
  () => {
    closeMobileMenu()
  },
)
</script>
