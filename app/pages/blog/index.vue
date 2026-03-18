<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-0 pt-20 sm:px-6 lg:px-8">
      <!-- Grid background -->
      <div class="blog-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Fade edges -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenith-bg-light via-transparent to-zenith-bg-light dark:from-zenith-bg-dark dark:via-transparent dark:to-zenith-bg-dark"
        aria-hidden="true"
      />

      <div class="relative z-10 mx-auto max-w-6xl pb-16">
        <!-- Eyebrow -->
        <div class="hero-fade mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('blog.eyebrow') }}
          </span>
        </div>

        <!-- Two-column layout -->
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <h1
              class="hero-fade hero-fade-delay-1 font-bold leading-[1.1] tracking-tight text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t('blog.hero.titleWhite') }}
              <br />
              <span class="bg-gradient-to-r from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-champagne bg-clip-text text-transparent">
                {{ $t('blog.hero.titleGradient') }}
              </span>
            </h1>
          </div>

          <div class="hero-fade hero-fade-delay-2">
            <p class="type-lead leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t('blog.hero.subtitle') }}
            </p>
            <!-- Article count badge -->
            <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-gold-vivid/5 px-4 py-2 dark:border-zenith-gold-vivid/20">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-60" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-zenith-gold-vivid" />
              </span>
              <span class="text-xs font-semibold text-zenith-gold-vivid">
                {{ allPosts.length }} {{ $t('blog.allArticles') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="mt-16 h-px bg-gradient-to-r from-transparent via-zenith-gold-bronze/30 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>

    <!-- Articles section -->
    <section
      v-reveal="{ duration: 700, distance: 40 }"
      class="px-4 py-16 sm:px-6 lg:px-8"
      :aria-label="$t('blog.allArticles')"
    >
      <div class="mx-auto max-w-6xl">

        <!-- Category filters -->
        <div v-if="categories.length > 1" class="mb-12 overflow-x-auto">
          <div class="flex min-w-max border-b border-zenith-gold-bronze/15 dark:border-zenith-gold-bronze/10">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              :aria-pressed="selectedCategory === cat"
              class="relative whitespace-nowrap px-5 pb-3 pt-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
              :class="
                selectedCategory === cat
                  ? 'text-zenith-gold-vivid'
                  : 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark'
              "
              @click="selectedCategory = cat"
            >
              {{ $t(`blog.categories.${cat}`) }}
              <span
                class="absolute bottom-0 left-0 right-0 h-px bg-zenith-gold-vivid transition-transform duration-300"
                :class="selectedCategory === cat ? 'scale-x-100' : 'scale-x-0'"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- Featured article -->
        <NuxtLink
          v-if="featuredPost"
          :to="localePath(`/blog/${featuredPost.stem?.split('/').pop()}`)"
          class="mb-10 block"
          :aria-label="featuredPost.title"
        >
          <article
            class="group relative overflow-hidden rounded-2xl border border-zenith-gold-vivid/30 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/8 dark:border-zenith-gold-vivid/20 dark:bg-zenith-bg-secondary-dark dark:hover:border-zenith-gold-vivid/35 lg:grid lg:grid-cols-2"
          >
            <!-- Image / Gradient -->
            <div class="relative aspect-[16/9] overflow-hidden bg-zenith-bg-secondary-light dark:bg-zenith-bg-dark lg:aspect-auto">
              <NuxtImg
                v-if="featuredPost.image"
                :src="featuredPost.image"
                :alt="featuredPost.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-gradient-to-br from-zenith-gold-bronze/15 via-zenith-bg-secondary-light to-zenith-gold-vivid/8 dark:from-zenith-gold-bronze/20 dark:via-zenith-bg-dark dark:to-zenith-gold-vivid/12"
                aria-hidden="true"
              >
                <span class="font-mono text-[8rem] font-black text-zenith-gold-vivid/8 select-none dark:text-zenith-gold-vivid/12">
                  {{ featuredPost.category.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex flex-col justify-center p-8 lg:p-10">
              <!-- Featured badge -->
              <div class="mb-4 flex items-center gap-3">
                <span class="h-px w-6 bg-zenith-gold-vivid/60" aria-hidden="true" />
                <span class="text-[10px] font-semibold uppercase tracking-widest text-zenith-gold-vivid">
                  {{ $t('blog.featured') }}
                </span>
              </div>

              <!-- Category -->
              <span class="mb-3 inline-flex self-start rounded-full bg-zenith-gold-vivid/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zenith-gold-vivid/70 dark:bg-zenith-gold-vivid/10 dark:text-zenith-gold-vivid/60">
                {{ $t(`blog.categories.${featuredPost.category}`) }}
              </span>

              <h2 class="mb-3 text-xl font-bold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid/90 dark:text-zenith-text-primary-dark lg:text-2xl">
                {{ featuredPost.title }}
              </h2>

              <p class="mb-6 leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ featuredPost.description }}
              </p>

              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  <time :datetime="featuredPost.date">{{ formatDate(featuredPost.date) }}</time>
                  <span aria-hidden="true">·</span>
                  <span>{{ featuredPost.readingTime }} {{ $t('blog.readingTime') }}</span>
                </div>
                <span class="flex items-center gap-1.5 text-sm font-semibold text-zenith-gold-vivid transition-all duration-300 group-hover:gap-2.5">
                  {{ $t('blog.readMore') }}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </article>
        </NuxtLink>

        <!-- Articles grid -->
        <div
          v-if="filteredPosts.length > 0"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.path"
            :to="localePath(`/blog/${post.stem?.split('/').pop()}`)"
            :aria-label="post.title"
          >
            <BlogCard :post="post" />
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="selectedCategory !== 'all'"
          class="flex flex-col items-center justify-center py-32 text-center"
        >
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zenith-gold-bronze/20 bg-zenith-gold-vivid/5">
            <span class="text-2xl" aria-hidden="true">✍️</span>
          </div>
          <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('blog.noArticles') }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div v-reveal="{ duration: 700, distance: 40 }">
      <CallToAction />
    </div>
  </div>
</template>

<script setup lang="ts">
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
}

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const selectedCategory = ref<string>('all')

/** Fetch all posts for current locale, sorted by date descending */
const allPosts = await queryCollection('blog')
  .where('path', 'LIKE', `/${locale.value}/blog/%`)
  .order('date', 'DESC')
  .all() as BlogPost[]

/** Featured post: first with featured: true */
const featuredPost = computed((): BlogPost | undefined =>
  allPosts.find((post) => post.featured)
)

/** All categories extracted from posts */
const categories = computed((): string[] => {
  const cats = new Set(allPosts.map((post) => post.category))
  return ['all', ...cats]
})

/** Posts filtered by category, excluding the featured one from the grid */
const filteredPosts = computed((): BlogPost[] => {
  const withoutFeatured = allPosts.filter(
    (post) => !post.featured || selectedCategory.value !== 'all'
  )
  if (selectedCategory.value === 'all') return withoutFeatured
  return withoutFeatured.filter((post) => post.category === selectedCategory.value)
})

/**
 * Formats a date string to locale-aware display format
 * @param dateStr - ISO date string
 * @returns Formatted date string
 */
const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString(
    locale.value === 'fr' ? 'fr-FR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}

useSeoMeta({
  title: () => t('blog.seoTitle'),
  description: () => t('blog.seoDescription'),
  ogTitle: () => t('blog.seoTitle'),
  ogDescription: () => t('blog.seoDescription'),
  ogImage: 'https://www.dg-zenith.com/og-image.png',
  ogUrl: () => `https://www.dg-zenith.com${route.path}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('blog.seoTitle'),
  twitterDescription: () => t('blog.seoDescription'),
  twitterImage: 'https://www.dg-zenith.com/og-image.png',
})

usePageCanonical()

useJsonLd(useBreadcrumbSchema([
  { name: t('nav.home'), url: localePath('/') },
  { name: t('blog.title'), url: localePath('/blog') },
]))
</script>

<style scoped>
.blog-grid {
  background-image:
    linear-gradient(to right, rgba(182, 119, 29, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(182, 119, 29, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

:global(.dark) .blog-grid {
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
}

.hero-fade {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-fade-delay-1 { animation-delay: 0.1s; }
.hero-fade-delay-2 { animation-delay: 0.22s; }

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}
</style>
