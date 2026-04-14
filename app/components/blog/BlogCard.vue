<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-bronze/30 hover:shadow-lg hover:shadow-zenith-gold-vivid/5 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-secondary-dark dark:hover:border-zenith-gold-bronze/30"
  >
    <!-- Left accent bar -->
    <span
      class="absolute bottom-0 left-0 top-0 z-10 w-[2px] origin-top scale-y-0 bg-gradient-to-b from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-gold-bronze/40 transition-transform duration-500 ease-out group-hover:scale-y-100"
      aria-hidden="true"
    />

    <!-- Image / Gradient placeholder -->
    <div class="relative aspect-[16/9] overflow-hidden bg-zenith-bg-secondary-light dark:bg-zenith-bg-dark">
      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gradient-to-br from-zenith-gold-bronze/10 via-zenith-bg-secondary-light to-zenith-gold-vivid/5 dark:from-zenith-gold-bronze/15 dark:via-zenith-bg-dark dark:to-zenith-gold-vivid/10"
        aria-hidden="true"
      >
        <span class="font-mono text-6xl font-black text-zenith-gold-vivid/10 dark:text-zenith-gold-vivid/15 select-none">
          {{ categoryInitial }}
        </span>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>

    <!-- Separator -->
    <div
      class="h-px w-full bg-gradient-to-r from-transparent via-zenith-gold-bronze/20 to-transparent transition-all duration-500 group-hover:via-zenith-gold-vivid/35"
      aria-hidden="true"
    />

    <!-- Card body -->
    <div class="flex flex-1 flex-col p-5">
      <!-- Category badge -->
      <span class="mb-3 inline-flex self-start rounded-full bg-zenith-gold-vivid/8 text-[10px] font-semibold uppercase tracking-wider text-zenith-gold-vivid/70 dark:bg-zenith-gold-vivid/10 dark:text-zenith-gold-vivid/60">
        {{ $t(`blog.categories.${post.category}`) }}
      </span>

      <!-- Title -->
      <h3 class="mb-2 line-clamp-2 text-base font-bold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid/90 dark:text-zenith-text-primary-dark">
        {{ post.title }}
      </h3>

      <!-- Description -->
      <p class="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
        {{ post.description }}
      </p>

      <!-- Footer: date + reading time + arrow -->
      <div class="flex items-center justify-between gap-2 text-xs text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
        <div class="flex items-center gap-3">
          <time :datetime="post.date">{{ formattedDate }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ post.readingTime }} {{ $t('blog.readingTime') }}</span>
        </div>
        <span
          class="text-zenith-gold-vivid/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zenith-gold-vivid"
          aria-hidden="true"
        >→</span>
      </div>
    </div>
  </article>
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
}

interface BlogCardProps {
  post: BlogPost
}

const props = defineProps<BlogCardProps>()
const { locale } = useI18n()

/** Returns the first letter of the category for the placeholder */
const categoryInitial = computed((): string =>
  props.post.category.charAt(0).toUpperCase()
)

/** Formats the date according to the current locale */
const formattedDate = computed((): string => {
  return new Date(props.post.date).toLocaleDateString(
    locale.value === 'fr' ? 'fr-FR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
})
</script>
