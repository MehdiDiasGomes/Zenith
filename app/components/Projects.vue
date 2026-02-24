<template>
  <section id="projects" class="relative px-4 py-20 sm:px-6 lg:px-8">
    <div ref="elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('projects.title') }}
        </h2>
        <h3 class="text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('projects.subtitle') }}
        </h3>
      </div>

      <!-- Category Filter -->
      <div
        v-if="visibleCategories.length > 1"
        ref="_filterRef"
        :class="filterClasses"
        class="mb-10 flex justify-center"
      >
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

      <!-- Projects Grid -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
        mode="out-in"
      >
        <!-- Empty State -->
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

        <!-- Projects List -->
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
              class="group overflow-hidden rounded-3xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-secondary-dark"
            >
              <!-- Image Container -->
              <div class="relative aspect-square overflow-hidden">
                <NuxtImg
                  :src="project.image"
                  :alt="$t(project.titleKey)"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                <!-- Gradient Overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <!-- Quick Actions (visible on hover) -->
                <div
                  class="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
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

              <!-- Content -->
              <div class="p-6">
                <!-- Title -->
                <h3
                  class="mb-2 text-lg font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
                >
                  {{ $t(project.titleKey) }}
                </h3>

                <!-- Description -->
                <p
                  class="mb-4 line-clamp-2 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
                >
                  {{ $t(project.descriptionKey) }}
                </p>

                <!-- Technologies -->
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
