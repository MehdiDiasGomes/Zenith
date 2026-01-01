<template>
  <section id="projects" class="relative bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8">
    <div ref="elementRef" :class="animationClasses" class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <h2
          class="mb-4 text-2xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-3xl"
        >
          {{ $t('projects.title') }}
        </h2>
        <p
          class="mx-auto max-w-2xl text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
        >
          {{ $t('projects.subtitle') }}
        </p>
      </div>

      <div class="mb-8 flex justify-center">
        <div
          class="inline-flex rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-light p-1 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
        >
          <button
            v-for="category in categories"
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
              class="group relative overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 hover:border-zenith-gold-vivid/50 hover:shadow-2xl hover:shadow-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
            >
          <div class="relative h-48 overflow-hidden bg-zenith-bg-secondary-light dark:bg-zenith-bg-secondary-dark">
            <NuxtImg
              :src="project.image"
              :alt="$t(project.titleKey)"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-zenith-bg-dark/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>

          <div class="p-6">
            <h3
              class="mb-2 text-xl font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
            >
              {{ $t(project.titleKey) }}
            </h3>

            <p
              class="mb-4 text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(project.descriptionKey) }}
            </p>

            <div class="mb-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded-full bg-zenith-gold-vivid/10 px-3 py-1 text-xs font-medium text-zenith-gold-vivid"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex gap-3">
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-semibold text-zenith-gold-vivid transition-colors hover:text-zenith-gold-bronze"
              >
                <Icon name="ExternalLink" size="16" aria-hidden="true" />
                {{ $t('projects.viewProject') }}
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-semibold text-zenith-gold-vivid transition-colors hover:text-zenith-gold-bronze"
              >
                <Icon name="Github" size="16" aria-hidden="true" />
                {{ $t('projects.viewCode') }}
              </a>
            </div>
          </div>

          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-hover:w-full"
          />
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
</script>
