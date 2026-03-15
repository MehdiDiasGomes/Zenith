<template>
  <section id="projects" class="relative px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">

      <!-- Category filters -->
      <div v-if="visibleCategories.length > 1" class="mb-14 flex justify-start">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in visibleCategories"
            :key="category.id"
            type="button"
            class="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
            :class="
              selectedCategory === category.id
                ? 'bg-zenith-gold-vivid text-zenith-bg-dark shadow-md shadow-zenith-gold-vivid/25'
                : 'border border-zenith-bronze-dark/15 text-zenith-text-secondary-light hover:border-zenith-gold-vivid/40 hover:text-zenith-gold-vivid dark:border-zenith-gold-bronze/15 dark:text-zenith-text-secondary-dark dark:hover:border-zenith-gold-vivid/40 dark:hover:text-zenith-gold-vivid'
            "
            @click="selectedCategory = category.id"
          >
            {{ $t(category.labelKey) }}
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredProjects.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-zenith-gold-bronze/20 bg-zenith-gold-vivid/5">
          <Icon name="FolderOpen" size="36" class="text-zenith-gold-vivid/60" aria-hidden="true" />
        </div>
        <h3 class="mb-2 text-lg font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('projects.emptyState.title') }}
        </h3>
        <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('projects.emptyState.subtitle') }}
        </p>
      </div>

      <!-- Projects grid -->
      <div v-else :class="gridClasses">
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card group relative flex flex-col overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-500 hover:-translate-y-1 hover:border-zenith-gold-bronze/30 hover:shadow-xl hover:shadow-zenith-gold-vivid/8 dark:border-zenith-gold-bronze/10 dark:bg-zenith-bg-secondary-dark dark:hover:border-zenith-gold-vivid/25"
        >
          <!-- Image container -->
          <div class="relative aspect-[16/10] overflow-hidden bg-zenith-bg-secondary-light dark:bg-zenith-bg-dark">
            <NuxtImg
              :src="project.image"
              :alt="$t(project.titleKey)"
              class="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              loading="lazy"
            />

            <!-- Gradient overlay (always visible on mobile, hover on desktop) -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 transition-opacity duration-400 md:opacity-0 md:group-hover:opacity-100"
              aria-hidden="true"
            />

            <!-- Action buttons (reveal on hover) -->
            <div
              class="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-4 transition-all duration-400 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zenith-gold-vivid px-4 py-2.5 text-xs font-semibold text-zenith-bg-dark transition-all duration-200 hover:bg-zenith-champagne"
                :aria-label="$t('projects.viewProject')"
                @click.stop
              >
                <Icon name="ExternalLink" size="14" aria-hidden="true" />
                {{ $t('projects.viewProject') }}
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center rounded-lg border border-white/30 bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                :aria-label="$t('projects.viewCode')"
                @click.stop
              >
                <Icon name="Github" size="16" aria-hidden="true" />
              </a>
            </div>

            <!-- Project index number -->
            <span
              class="absolute right-4 top-4 font-mono text-xs font-medium tabular-nums text-white/40"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Card body -->
          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-start justify-between gap-3">
              <h3 class="text-base font-bold leading-snug text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
                {{ $t(project.titleKey) }}
              </h3>
              <!-- Category badge -->
              <span class="flex-shrink-0 rounded-md border border-zenith-bronze-dark/10 px-2 py-0.5 text-xs font-medium text-zenith-text-secondary-light dark:border-zenith-gold-bronze/15 dark:text-zenith-text-secondary-dark">
                {{ $t(`projects.categories.${project.category}`) }}
              </span>
            </div>

            <p class="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
              {{ $t(project.descriptionKey) }}
            </p>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded-md bg-zenith-gold-vivid/8 px-2.5 py-1 text-xs font-medium text-zenith-gold-vivid dark:bg-zenith-gold-vivid/10"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects, categories, type ProjectCategory } from '~/constants/projects'

const selectedCategory = ref<ProjectCategory>('all')

const visibleCategories = computed(() =>
  categories.filter((category) => {
    if (category.id === 'all') return true
    return projects.some((project) => project.category === category.id)
  }),
)

const filteredProjects = computed(() =>
  selectedCategory.value === 'all'
    ? projects
    : projects.filter((project) => project.category === selectedCategory.value),
)

const gridClasses = computed(() => {
  const count = filteredProjects.value.length
  if (count === 1) return 'mx-auto grid max-w-lg gap-8'
  if (count === 2) return 'grid gap-8 md:grid-cols-2'
  return 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
})
</script>
