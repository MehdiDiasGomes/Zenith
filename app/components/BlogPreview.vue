<template>
  <section
    v-if="posts.length > 0"
    class="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    aria-labelledby="blog-preview-heading"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-zenith-gold-vivid/4 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl">

      <!-- Header -->
      <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
            <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
              {{ $t('blog.eyebrow') }}
            </span>
          </div>
          <h2
            id="blog-preview-heading"
            class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t('blog.homeTitle') }}
          </h2>
          <p class="mt-3 max-w-md text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('blog.homeSubtitle') }}
          </p>
        </div>

        <!-- Desktop CTA -->
        <Button
          as-child
          variant="gold"
          class="hidden sm:inline-flex"
          :aria-label="$t('blog.viewAll')"
        >
          <NuxtLink :to="localePath('/blog')">
            {{ $t('blog.viewAll') }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>

      <!-- Featured article -->
      <NuxtLink
        v-if="featuredPost"
        :to="localePath(`/blog/${featuredPost.stem?.split('/').pop()}`)"
        class="mb-6 block"
        :aria-label="featuredPost.title"
      >
        <article
          class="group relative overflow-hidden rounded-2xl border border-zenith-gold-vivid/25 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-xl hover:shadow-zenith-gold-vivid/8 dark:border-zenith-gold-vivid/15 dark:bg-zenith-bg-secondary-dark dark:hover:border-zenith-gold-vivid/35 lg:grid lg:grid-cols-2"
        >
          <!-- Image -->
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
              class="flex h-full min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-zenith-gold-bronze/15 via-zenith-bg-secondary-light to-zenith-gold-vivid/8 dark:from-zenith-gold-bronze/20 dark:via-zenith-bg-dark dark:to-zenith-gold-vivid/12"
              aria-hidden="true"
            >
              <span class="select-none font-mono text-[8rem] font-black text-zenith-gold-vivid/8 dark:text-zenith-gold-vivid/12">
                {{ featuredPost.category.charAt(0).toUpperCase() }}
              </span>
            </div>
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col justify-center p-8 lg:p-10">
            <div class="mb-4 flex items-center gap-3">
              <span class="h-px w-6 bg-zenith-gold-vivid/60" aria-hidden="true" />
              <span class="text-[10px] font-semibold uppercase tracking-widest text-zenith-gold-vivid">
                {{ $t('blog.featured') }}
              </span>
            </div>

            <span class="mb-3 inline-flex self-start rounded-full bg-zenith-gold-vivid/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zenith-gold-vivid/70 dark:bg-zenith-gold-vivid/10 dark:text-zenith-gold-vivid/60">
              {{ $t(`blog.categories.${featuredPost.category}`) }}
            </span>

            <h3 class="mb-3 text-xl font-bold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid/90 dark:text-zenith-text-primary-dark lg:text-2xl">
              {{ featuredPost.title }}
            </h3>

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

      <!-- Recent articles grid -->
      <div
        v-if="recentPosts.length > 0"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="post in recentPosts"
          :key="post.path"
          :to="localePath(`/blog/${post.stem?.split('/').pop()}`)"
          :aria-label="post.title"
        >
          <BlogCard :post="post" />
        </NuxtLink>
      </div>


    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

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

const { locale } = useI18n()
const localePath = useLocalePath()

const posts = await queryCollection('blog')
  .where('path', 'LIKE', `/${locale.value}/blog/%`)
  .order('date', 'DESC')
  .all() as BlogPost[]

/** Featured article: first with featured: true */
const featuredPost = computed((): BlogPost | undefined =>
  posts.find((post) => post.featured)
)

/** Up to 3 recent articles, excluding the featured one */
const recentPosts = computed((): BlogPost[] =>
  posts
    .filter((post) => !post.featured)
    .slice(0, 3)
)

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
</script>
