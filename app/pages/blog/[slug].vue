<template>
  <div v-if="post">
    <!-- Header -->
    <header class="relative overflow-hidden border-b border-zenith-gold-bronze/10 px-4 pb-12 pt-24 dark:border-zenith-gold-bronze/8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-36">
      <div class="blog-article-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-6xl">
        <!-- Breadcrumb -->
        <nav class="mb-8 flex items-center gap-2 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark" :aria-label="$t('nav.ariaLabel')">
          <NuxtLink
            :to="localePath('/')"
            class="transition-colors hover:text-zenith-gold-vivid"
          >
            {{ $t('nav.home') }}
          </NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink
            :to="localePath('/blog')"
            class="transition-colors hover:text-zenith-gold-vivid"
          >
            {{ $t('blog.title') }}
          </NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="line-clamp-1 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
            {{ post.title }}
          </span>
        </nav>

        <!-- Category + meta -->
        <div class="mb-5 flex flex-wrap items-center gap-3">
          <span class="rounded-full bg-zenith-gold-vivid/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zenith-gold-vivid dark:bg-zenith-gold-vivid/12">
            {{ $t(`blog.categories.${post.category}`) }}
          </span>
          <span class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            <time :datetime="post.date">{{ formattedDate }}</time>
          </span>
          <span class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark" aria-hidden="true">·</span>
          <span class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ post.readingTime }} {{ $t('blog.readingTime') }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark sm:text-4xl lg:text-5xl">
          {{ post.title }}
        </h1>

        <!-- Description -->
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ post.description }}
        </p>
      </div>
    </header>

    <!-- Cover image -->
    <div v-if="post.image" class="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
      <NuxtImg
        :src="post.image"
        :alt="post.title"
        class="w-full rounded-2xl object-cover"
        style="max-height: 480px;"
        loading="eager"
      />
    </div>

    <!-- Content + TOC -->
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:flex lg:gap-16 lg:px-8 lg:py-16">

      <!-- Sidebar TOC -->
      <aside
        v-if="post.body?.toc?.links?.length"
        class="mb-10 shrink-0 lg:sticky lg:top-28 lg:mb-0 lg:w-56 lg:self-start xl:w-64"
        :aria-label="$t('blog.tableOfContents')"
      >
        <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
          {{ $t('blog.tableOfContents') }}
        </p>
        <nav>
          <ul class="space-y-2">
            <li
              v-for="link in post.body.toc.links"
              :key="link.id"
            >
              <a
                :href="`#${link.id}`"
                class="text-sm leading-snug text-zenith-text-secondary-light transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark dark:hover:text-zenith-gold-vivid"
              >
                {{ link.text }}
              </a>
              <ul v-if="link.children?.length" class="mt-1.5 space-y-1.5 pl-3">
                <li v-for="child in link.children" :key="child.id">
                  <a
                    :href="`#${child.id}`"
                    class="text-xs leading-snug text-zenith-text-secondary-light/70 transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark/70 dark:hover:text-zenith-gold-vivid"
                  >
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Article body -->
      <div class="min-w-0 flex-1">
        <ContentRenderer
          :value="post"
          class="prose-zenith prose max-w-none"
        />

        <!-- Back to blog -->
        <div class="mt-16 border-t border-zenith-gold-bronze/10 pt-8 dark:border-zenith-gold-bronze/8">
          <NuxtLink
            :to="localePath('/blog')"
            class="inline-flex items-center gap-2 text-sm font-medium text-zenith-text-secondary-light transition-colors hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark dark:hover:text-zenith-gold-vivid"
          >
            <span aria-hidden="true">←</span>
            {{ $t('blog.backToBlog') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Prev / Next navigation -->
    <nav
      v-if="prevPost || nextPost"
      class="border-t border-zenith-gold-bronze/10 px-4 py-12 dark:border-zenith-gold-bronze/8 sm:px-6 lg:px-8"
      :aria-label="$t('blog.allArticles')"
    >
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
        <NuxtLink
          v-if="prevPost"
          :to="localePath(`/blog/${prevPost.stem?.split('/').pop()}`)"
          class="group flex flex-col gap-1 rounded-2xl border border-zenith-bronze-dark/10 p-6 transition-all hover:border-zenith-gold-bronze/30 dark:border-zenith-gold-bronze/10 dark:hover:border-zenith-gold-bronze/30"
        >
          <span class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">← Article précédent</span>
          <span class="line-clamp-2 font-semibold text-zenith-text-primary-light transition-colors group-hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark">
            {{ prevPost.title }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="nextPost"
          :to="localePath(`/blog/${nextPost.stem?.split('/').pop()}`)"
          class="group flex flex-col items-end gap-1 rounded-2xl border border-zenith-bronze-dark/10 p-6 text-right transition-all hover:border-zenith-gold-bronze/30 dark:border-zenith-gold-bronze/10 dark:hover:border-zenith-gold-bronze/30 sm:col-start-2"
        >
          <span class="text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">Article suivant →</span>
          <span class="line-clamp-2 font-semibold text-zenith-text-primary-light transition-colors group-hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark">
            {{ nextPost.title }}
          </span>
        </NuxtLink>
      </div>
    </nav>

    <!-- CTA -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}

interface BlogPost {
  title: string
  description: string
  date: string
  category: string
  image?: string
  readingTime: number
  featured?: boolean
  path: string
  stem?: string
  body?: {
    toc?: { links: TocLink[] }
  }
}

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const slug = route.params.slug as string

const post = await queryCollection('blog')
  .where('stem', '=', `${locale.value}/blog/${slug}`)
  .first() as BlogPost | null

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}

/** All posts sorted to find prev/next */
const allPosts = await queryCollection('blog')
  .where('path', 'LIKE', `/${locale.value}/blog/%`)
  .order('date', 'DESC')
  .all() as BlogPost[]

const currentIndex = allPosts.findIndex(
  (p) => p.stem?.split('/').pop() === slug
)

const prevPost: BlogPost | null = currentIndex < allPosts.length - 1
  ? allPosts[currentIndex + 1]
  : null

const nextPost: BlogPost | null = currentIndex > 0
  ? allPosts[currentIndex - 1]
  : null

/**
 * Formats the post date for display
 */
const formattedDate = computed((): string =>
  new Date(post!.date).toLocaleDateString(
    locale.value === 'fr' ? 'fr-FR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
)

useSeoMeta({
  title: () => `${post!.title} | Zenith`,
  description: () => post!.description,
  ogTitle: () => `${post!.title} | Zenith`,
  ogDescription: () => post!.description,
  ogImage: post!.image ?? 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${post!.title} | Zenith`,
  twitterDescription: () => post!.description,
  twitterImage: post!.image ?? 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('blog.title'), url: localePath('/blog') },
  { name: post!.title, url: `https://www.dg-zenith.com${route.path}` },
]))
</script>

<style>
/* Prose styles for the article body */
.prose-zenith {
  color: var(--tw-prose-body);
}

.prose-zenith h2 {
  @apply mt-10 mb-4 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark;
  scroll-margin-top: 6rem;
}

.prose-zenith h3 {
  @apply mt-7 mb-3 text-lg font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark;
  scroll-margin-top: 6rem;
}

.prose-zenith p {
  @apply mb-5 leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark;
}

.prose-zenith ul {
  @apply mb-5 space-y-2 pl-5;
}

.prose-zenith ul li {
  @apply relative text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark;
}

.prose-zenith ul li::before {
  content: '';
  @apply absolute -left-4 top-2.5 h-1.5 w-1.5 rounded-full bg-zenith-gold-vivid;
}

.prose-zenith ol {
  @apply mb-5 space-y-2 pl-5 list-decimal;
}

.prose-zenith ol li {
  @apply text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark;
}

.prose-zenith strong {
  @apply font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark;
}

.prose-zenith a {
  @apply text-zenith-gold-vivid underline decoration-zenith-gold-vivid/40 transition-colors hover:decoration-zenith-gold-vivid;
}

.prose-zenith blockquote {
  @apply my-6 border-l-2 border-zenith-gold-vivid pl-5 italic text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark;
}

.prose-zenith hr {
  @apply my-10 border-zenith-gold-bronze/20 dark:border-zenith-gold-bronze/10;
}

.prose-zenith table {
  @apply mb-6 w-full text-sm;
}

.prose-zenith thead {
  @apply border-b border-zenith-gold-bronze/20 dark:border-zenith-gold-bronze/10;
}

.prose-zenith th {
  @apply px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-zenith-gold-vivid;
}

.prose-zenith td {
  @apply border-b border-zenith-gold-bronze/10 px-4 py-3 text-zenith-text-secondary-light dark:border-zenith-gold-bronze/10 dark:text-zenith-text-secondary-dark;
}

.prose-zenith code {
  @apply rounded px-1.5 py-0.5 text-xs font-mono text-zenith-gold-vivid;
  background-color: rgba(218, 165, 32, 0.08);
}

:global(.dark) .prose-zenith code {
  background-color: rgba(218, 165, 32, 0.12);
}

.blog-article-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .blog-article-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}
</style>
