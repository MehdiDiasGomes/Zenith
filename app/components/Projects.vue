<template>
  <section id="projects" class="relative bg-zenith-bg-secondary-light px-4 py-20 dark:bg-zenith-bg-secondary-dark sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">

      <!-- Category filters — editorial tab style -->
      <div v-if="visibleCategories.length > 1" class="mb-14 overflow-x-auto">
        <div class="flex min-w-max border-b border-zenith-gold-bronze/15 dark:border-zenith-gold-bronze/10">
          <button
            v-for="category in visibleCategories"
            :key="category.id"
            type="button"
            :aria-pressed="selectedCategory === category.id"
            class="relative whitespace-nowrap px-5 pb-3 pt-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
            :class="
              selectedCategory === category.id
                ? 'text-zenith-gold-vivid'
                : 'text-zenith-text-secondary-light hover:text-zenith-text-primary-light dark:text-zenith-text-secondary-dark dark:hover:text-zenith-text-primary-dark'
            "
            @click="selectedCategory = category.id"
          >
            {{ $t(category.labelKey) }}
            <!-- Active underline indicator -->
            <span
              class="absolute bottom-0 left-0 right-0 h-px bg-zenith-gold-vivid transition-transform duration-300"
              :class="selectedCategory === category.id ? 'scale-x-100' : 'scale-x-0'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredProjects.length === 0"
        class="flex flex-col items-center justify-center py-32 text-center"
      >
        <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zenith-gold-bronze/20 bg-zenith-gold-vivid/5">
          <Icon name="FolderOpen" size="26" class="text-zenith-gold-vivid/50" aria-hidden="true" />
        </div>
        <h3 class="mb-2 text-base font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
          {{ $t('projects.emptyState.title') }}
        </h3>
        <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('projects.emptyState.subtitle') }}
        </p>
      </div>

      <!-- Projects grid — key forces re-animation on filter change -->
      <div
        v-else
        :key="selectedCategory"
        :class="gridClasses"
      >
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card group relative flex flex-col overflow-hidden rounded-2xl bg-zenith-bg-light dark:bg-zenith-bg-dark"
          :class="isFeatured(index) ? 'lg:col-span-2' : ''"
          :style="{ '--delay': `${index * 0.07}s` }"
        >
          <!-- Left accent bar (grows top to bottom on hover) -->
          <span
            class="absolute bottom-0 left-0 top-0 z-10 w-[2px] origin-top scale-y-0 bg-gradient-to-b from-zenith-gold-bronze via-zenith-gold-vivid to-zenith-gold-bronze/40 transition-transform duration-500 ease-out group-hover:scale-y-100"
            aria-hidden="true"
          />

          <!-- Image container -->
          <div
            class="relative overflow-hidden bg-zenith-bg-secondary-light dark:bg-zenith-bg-dark"
            :class="isFeatured(index) ? 'aspect-[21/9]' : 'aspect-[16/10]'"
          >
            <NuxtImg
              :src="project.image"
              :alt="$t(project.titleKey)"
              format="webp"
              quality="90"
              class="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
              loading="lazy"
            />

            <!-- Gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
              aria-hidden="true"
            />

            <!-- Action buttons (slide up on hover) -->
            <div
              class="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-4 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              <Button
                v-if="project.link"
                as-child
                variant="solid"
                size="sm"
                class="flex-1"
                @click.stop
              >
                <a
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="$t('projects.viewProject')"
                >
                  <ExternalLink :size="13" aria-hidden="true" />
                  {{ $t('projects.viewProject') }}
                </a>
              </Button>
              <Button
                v-if="project.github"
                as-child
                variant="white"
                size="icon"
                @click.stop
              >
                <a
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="$t('projects.viewCode')"
                >
                  <Github :size="15" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <!-- Editorial index number -->
            <span
              class="absolute right-4 top-4 font-mono text-xl font-bold tabular-nums leading-none text-white/20 transition-all duration-300 group-hover:text-zenith-gold-vivid/45"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Image / body separator — animates to gold on hover -->
          <div
            class="h-px w-full bg-gradient-to-r from-transparent via-zenith-gold-bronze/20 to-transparent transition-all duration-500 group-hover:via-zenith-gold-vivid/35"
            aria-hidden="true"
          />

          <!-- Card body -->
          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-start justify-between gap-3">
              <h3
                class="text-base font-bold leading-snug text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid/90 dark:text-zenith-text-primary-dark"
              >
                {{ $t(project.titleKey) }}
              </h3>
              <!-- Category badge — minimal pill -->
              <span
                class="flex-shrink-0 rounded-full bg-zenith-gold-vivid/8 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zenith-gold-vivid/70 dark:bg-zenith-gold-vivid/10 dark:text-zenith-gold-vivid/60"
              >
                {{ $t(`projects.categories.${project.category}`) }}
              </span>
            </div>

            <p
              class="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark"
            >
              {{ $t(project.descriptionKey) }}
            </p>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded-md bg-zenith-gold-vivid/8 px-2.5 py-1 text-xs font-medium text-zenith-gold-vivid/80 dark:bg-zenith-gold-vivid/10 dark:text-zenith-gold-vivid"
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
import { ExternalLink, Github } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
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

/**
 * Returns true if the card at this index should be displayed as the featured card
 * (2-column span, cinematic aspect ratio) — only when there are 3+ projects visible.
 * @param index - Card position in the filtered list
 */
const isFeatured = (index: number): boolean =>
  filteredProjects.value.length >= 3 && index === 0

const gridClasses = computed(() => {
  const count = filteredProjects.value.length
  if (count === 1) return 'mx-auto grid max-w-lg gap-6'
  if (count === 2) return 'grid gap-6 md:grid-cols-2'
  return 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
})
</script>

<style scoped>
/* Staggered entrance animation — driven by CSS var(--delay) per card */
.project-card {
  animation: cardReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
