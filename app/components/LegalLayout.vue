<template>
  <div>
    <!-- Header -->
    <header class="relative overflow-hidden border-b border-zenith-gold-bronze/10 px-4 pb-10 pt-24 dark:border-zenith-gold-bronze/8 sm:px-6 md:pt-32 lg:px-8 lg:pt-36">
      <div class="legal-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark" aria-hidden="true" />

      <div class="relative mx-auto max-w-6xl">
        <NuxtLink
          :to="localePath('/')"
          class="mb-8 inline-flex items-center gap-2 text-xs font-medium text-zenith-text-secondary-light transition-colors duration-200 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark dark:hover:text-zenith-gold-vivid"
        >
          <ArrowLeft :size="13" aria-hidden="true" />
          {{ $t('legal.backHome') }}
        </NuxtLink>

        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ category }}
          </span>
        </div>

        <h1 class="text-3xl font-bold leading-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark sm:text-4xl lg:text-5xl">
          {{ title }}
        </h1>

        <p v-if="updatedAt" class="mt-4 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('legal.updatedAt.label') }} <time>{{ updatedAt }}</time>
        </p>
      </div>
    </header>

    <!-- Body -->
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:gap-16 lg:px-8 lg:py-20">

      <!-- Sidebar TOC -->
      <aside
        v-if="tocLinks.length"
        class="mb-12 shrink-0 lg:sticky lg:top-24 lg:mb-0 lg:w-56 lg:self-start xl:w-64"
        :aria-label="$t('legal.tocLabel')"
      >
        <div>
          <p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('legal.tocTitle') }}
          </p>
          <nav>
            <ul class="space-y-1">
              <li
                v-for="link in tocLinks"
                :key="link.id"
              >
                <a
                  :href="`#${link.id}`"
                  class="toc-link group flex items-start gap-2.5 rounded-sm py-1.5 text-xs leading-snug transition-colors duration-200"
                  :class="activeId === link.id
                    ? 'text-zenith-gold-vivid'
                    : 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark'"
                  @click.prevent="scrollTo(link.id)"
                >
                  <span
                    class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200"
                    :class="activeId === link.id
                      ? 'bg-zenith-gold-vivid scale-125'
                      : 'bg-zenith-text-secondary-light/30 group-hover:bg-zenith-gold-bronze/50 dark:bg-zenith-text-secondary-dark/20'"
                    aria-hidden="true"
                  />
                  {{ link.text }}
                </a>

                <!-- Depth-3 children -->
                <ul v-if="link.children?.length" class="mt-0.5 ml-4 space-y-0.5">
                  <li v-for="child in link.children" :key="child.id">
                    <a
                      :href="`#${child.id}`"
                      class="flex items-start gap-2 py-1 text-[11px] leading-snug transition-colors duration-200"
                      :class="activeId === child.id
                        ? 'text-zenith-gold-vivid'
                        : 'text-zenith-text-secondary-light/60 hover:text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark/50 dark:hover:text-zenith-text-secondary-dark'"
                      @click.prevent="scrollTo(child.id)"
                    >
                      {{ child.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Content -->
      <main class="min-w-0 flex-1" :id="contentId">
        <ContentRenderer
          v-if="document"
          class="legal-prose"
          :value="document"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface LegalDocument {
  body?: {
    toc?: {
      links?: TocLink[]
    }
  }
  title?: string
  date?: string
}

interface LegalLayoutProps {
  document: LegalDocument | null
  category: string
  updatedAt?: string
}

const props = defineProps<LegalLayoutProps>()

const localePath = useLocalePath()
const contentId: string = `legal-content-${props.category.toLowerCase().replace(/\s+/g, '-')}`

const tocLinks = computed<TocLink[]>(() => props.document?.body?.toc?.links ?? [])
const title = computed<string>(() => props.document?.title ?? props.category)

const activeId = ref<string>('')
let headingObserver: IntersectionObserver | null = null

/**
 * Scrolls smoothly to a heading by its ID and updates the active TOC item.
 */
function scrollTo(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeId.value = id
}

onMounted((): void => {
  const firstLink = tocLinks.value[0]
  if (firstLink) activeId.value = firstLink.id

  const headings = document.querySelectorAll('h2[id], h3[id]')
  if (!headings.length) return

  headingObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )

  headings.forEach((el) => headingObserver!.observe(el))
})

onUnmounted((): void => {
  headingObserver?.disconnect()
})
</script>

<style>
.legal-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}
.dark .legal-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.07) 1px, transparent 1px);
}

/* Prose overrides scoped to legal pages */
.legal-prose h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.875rem;
  padding-bottom: 0;
  color: var(--color-zenith-text-primary-light, #1a1a1a);
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  scroll-margin-top: 6rem;
}
.dark .legal-prose h2 {
  color: var(--color-zenith-text-primary-dark, #fff);
}
.legal-prose {
  counter-reset: section;
}
.legal-prose h2 {
  counter-increment: section;
}
.legal-prose h2::before {
  content: "0" counter(section);
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.625rem;
  font-weight: 700;
  color: rgba(255, 157, 0, 0.4);
  letter-spacing: 0.05em;
  flex-shrink: 0;
}
.legal-prose h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.625rem;
  color: var(--color-zenith-text-primary-light, #1a1a1a);
  scroll-margin-top: 6rem;
}
.dark .legal-prose h3 {
  color: var(--color-zenith-text-primary-dark, #fff);
}
.legal-prose p {
  font-size: 0.9375rem;
  line-height: 1.75;
  margin-bottom: 0.875rem;
  color: #525252;
}
.dark .legal-prose p {
  color: #e5e5e5;
}
.legal-prose strong {
  font-weight: 600;
  color: #1a1a1a;
}
.dark .legal-prose strong {
  color: #fff;
}
.legal-prose a {
  color: #ff9d00;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 157, 0, 0.3);
  transition: border-color 0.2s, color 0.2s;
}
.legal-prose a:hover {
  color: #ffcf71;
  border-color: rgba(255, 207, 113, 0.6);
}
.legal-prose ul {
  margin: 0.75rem 0;
  padding-left: 0;
  list-style: none;
}
.legal-prose ul li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.375rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #525252;
}
.dark .legal-prose ul li {
  color: #e5e5e5;
}
.legal-prose ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(182, 119, 29, 0.5);
}
.legal-prose h1 {
  display: none;
}
</style>
