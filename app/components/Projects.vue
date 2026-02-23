<template>
  <section
    id="projects"
    class="relative px-4 py-20 sm:px-6 lg:px-8"
  >
    <div ref="elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <h2
          class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
        >
          {{ $t('projects.title') }}
        </h2>
        <h3
          class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('projects.subtitle') }}
        </h3>
      </div>

      <div ref="_filterRef" :class="filterClasses" class="mb-8 flex justify-center">
        <div
          class="inline-flex rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-light p-1 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
        >
          <button
            v-for="category in visibleCategories"
            :key="category.id"
            type="button"
            :class="
              selectedCategory === category.id
                ? 'bg-zenith-gold-vivid text-white shadow-md'
                : 'text-zenith-text-secondary-light hover:bg-zenith-gold-vivid/10 hover:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark'
            "
            class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
            @click="selectedCategory = category.id"
          >
            {{ $t(category.labelKey) }}
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
        mode="out-in"
      >
        <div
          v-if="filteredProjects.length === 0"
          key="empty"
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

        <div v-else key="projects" :class="gridClasses">
          <TransitionGroup
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <article
              v-for="project in filteredProjects"
              :key="project.id"
              class="group relative aspect-square overflow-hidden rounded-2xl border border-zenith-gold-bronze/20 transition-all duration-500 hover:border-zenith-gold-vivid/50 hover:shadow-lg hover:shadow-zenith-gold-vivid/20"
            >
              <!-- Full card image background -->
              <NuxtImg
                :src="project.image"
                :alt="$t(project.titleKey)"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Dark gradient at bottom for title readability -->
              <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <!-- Title always visible -->
              <div class="absolute inset-x-0 bottom-0 z-10 p-6 transition-opacity duration-500 group-hover:opacity-0">
                <h3 class="text-lg font-semibold text-white">
                  {{ $t(project.titleKey) }}
                </h3>
              </div>

              <!-- Content overlay on hover -->
              <div
                class="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-black/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <h3 class="mb-3 text-xl font-bold text-white">
                  {{ $t(project.titleKey) }}
                </h3>

                <p class="mb-4 text-sm text-white/90">
                  {{ $t(project.descriptionKey) }}
                </p>

                <!-- Technologies badges -->
                <div class="mb-6 flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white"
                  >
                    {{ tech }}
                  </span>
                </div>

                <!-- CTA links -->
                <div class="flex gap-3">
                  <a
                    v-if="project.link"
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
                  >
                    <Icon name="ExternalLink" size="16" aria-hidden="true" />
                    {{ $t('projects.viewProject') }}
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
                  >
                    <Icon name="Github" size="16" aria-hidden="true" />
                    {{ $t('projects.viewCode') }}
                  </a>
                </div>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </Transition>
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

const { elementRef, animationClasses } = useScrollAnimation('fade-left')
const { elementRef: _filterRef, classes: filterClasses } = useTailwindAnimate(
  'animate-fade-down animate-delay-200 animate-duration-700',
)
</script>
