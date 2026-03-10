<template>
  <section id="projects" class="relative px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('projects.title') }}
        </h2>
        <h3 class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('projects.subtitle') }}
        </h3>
      </div>

      <div v-if="visibleCategories.length > 1" class="mb-10 flex justify-center">
        <div
          class="inline-flex rounded-full border border-zenith-bronze-dark/10 bg-zenith-bg-light/80 p-1.5 backdrop-blur-sm dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark/80"
        >
          <button
            v-for="category in visibleCategories"
            :key="category.id"
            type="button"
            :class="
              selectedCategory === category.id
                ? 'bg-zenith-gold-vivid text-white shadow-lg shadow-zenith-gold-vivid/25'
                : 'text-zenith-text-secondary-light hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark'
            "
            class="rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
            @click="selectedCategory = category.id"
          >
            {{ $t(category.labelKey) }}
          </button>
        </div>
      </div>

      <div
        v-if="filteredProjects.length === 0"
        class="flex flex-col items-center justify-center py-20"
      >
          <div
            class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zenith-gold-vivid/10"
          >
            <Icon name="FolderOpen" size="48" class="text-zenith-gold-vivid" aria-hidden="true" />
          </div>
          <h3
            class="mb-2 text-xl font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t('projects.emptyState.title') }}
          </h3>
          <p class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('projects.emptyState.subtitle') }}
          </p>
        </div>

      <div v-else :class="gridClasses">
        <article
              v-for="project in filteredProjects"
              :key="project.id"
              class="group overflow-hidden rounded-3xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-secondary-dark"
            >
              <div class="relative aspect-[16/10] overflow-hidden">
                <NuxtImg
                  :src="project.image"
                  :alt="$t(project.titleKey)"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100"
                />

                <div
                  class="absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                >
                  <a
                    v-if="project.link"
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-zenith-bg-dark backdrop-blur-sm transition-all hover:bg-white"
                    :aria-label="$t('projects.viewProject')"
                    @click.stop
                  >
                    <Icon name="ExternalLink" size="16" aria-hidden="true" />
                    <span>{{ $t('projects.viewProject') }}</span>
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center rounded-full bg-white/90 p-2.5 text-zenith-bg-dark backdrop-blur-sm transition-all hover:bg-white"
                    :aria-label="$t('projects.viewCode')"
                    @click.stop
                  >
                    <Icon name="Github" size="18" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div class="p-6">
                <h3
                  class="mb-2 text-lg font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
                >
                  {{ $t(project.titleKey) }}
                </h3>

                <p
                  class="mb-4 line-clamp-2 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  {{ $t(project.descriptionKey) }}
                </p>

                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="rounded-full bg-zenith-gold-vivid/10 px-2.5 py-1 text-xs font-medium text-zenith-gold-vivid"
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

const visibleCategories = computed(() => {
  return categories.filter((category) => {
    if (category.id === 'all') {
      return true
    }
    return projects.some((project) => project.category === category.id)
  })
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }
  return projects.filter((project) => project.category === selectedCategory.value)
})

const gridClasses = computed(() => {
  const count = filteredProjects.value.length
  if (count === 1) {
    return 'mx-auto grid max-w-md gap-8'
  }
  if (count === 2) {
    return 'grid gap-8 md:grid-cols-2'
  }
  return 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
})
</script>
