<template>
  <section
    id="projects-preview"
    class="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    aria-labelledby="projects-preview-heading"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-zenith-gold-vivid/4 blur-3xl"
      aria-hidden="true"
    />

    <div class="mx-auto max-w-6xl">
      <!-- Section header -->
      <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="mb-5 flex items-center gap-3">
            <span class="h-px w-8 bg-zenith-gold-vivid" aria-hidden="true" />
            <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
              {{ $t('projectsPreview.eyebrow') }}
            </span>
          </div>
          <h2
            id="projects-preview-heading"
            class="text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
          >
            {{ $t('projectsPreview.title') }}
          </h2>
          <p class="mt-3 max-w-md text-base text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('projectsPreview.subtitle') }}
          </p>
        </div>

        <Button as-child variant="gold" class="hidden sm:inline-flex" :aria-label="$t('projectsPreview.cta')">
          <NuxtLink :to="localePath('/portfolio')">
            {{ $t('projectsPreview.cta') }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>

      <!-- Projects — horizontal card stack -->
      <div class="flex flex-col">
        <!-- Top divider -->
        <div
          class="h-px bg-gradient-to-r from-zenith-gold-vivid/40 via-zenith-gold-bronze/20 to-transparent"
          aria-hidden="true"
        />

        <article
          v-for="(project, index) in previewProjects"
          :key="project.id"
          class="group relative [animation:cardReveal_0.55s_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:var(--delay)]"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <!-- Row content -->
          <div class="flex flex-col sm:flex-row">

            <!-- ── Image (left, fixed width on desktop) ── -->
            <div class="relative w-full aspect-[740/462] overflow-hidden sm:w-[42%] sm:flex-shrink-0 sm:aspect-auto sm:self-stretch">
              <NuxtImg
                :src="project.image"
                :alt="$t(project.titleKey)"
                width="740"
                height="462"
                sizes="xs:100vw sm:45vw lg:500px"
                format="webp"
                quality="80"
                class="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
                loading="lazy"
              />

              <!-- Dark overlay on hover -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                aria-hidden="true"
              />

              <!-- Action buttons — bottom-left of image -->
              <div
                class="absolute bottom-4 left-4 flex items-center gap-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <Button
                  v-if="project.link"
                  as-child
                  variant="solid"
                  size="sm"
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
              </div>
            </div>

            <!-- ── Vertical separator ── -->
            <div
              class="hidden w-px flex-shrink-0 bg-gradient-to-b from-transparent via-zenith-gold-bronze/25 to-transparent transition-all duration-500 group-hover:via-zenith-gold-vivid/40 sm:block"
              aria-hidden="true"
            />

            <!-- ── Content (right) ── -->
            <div class="relative flex flex-1 flex-col justify-between overflow-hidden px-6 py-8 lg:px-10 lg:py-10">
              <!-- Large decorative index number in background -->
              <span
                class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-mono text-[7rem] font-black leading-none tabular-nums text-zenith-text-primary-light/[0.04] transition-all duration-500 group-hover:text-zenith-gold-vivid/8 dark:text-zenith-text-primary-dark/[0.04] dark:group-hover:text-zenith-gold-vivid/10 lg:text-[9rem]"
                aria-hidden="true"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <!-- Top row: category badge -->
              <div class="mb-4 flex items-center justify-between">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border border-zenith-gold-bronze/20 bg-zenith-gold-vivid/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zenith-gold-vivid/70 dark:border-zenith-gold-vivid/15 dark:bg-zenith-gold-vivid/8 dark:text-zenith-gold-vivid/60"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-zenith-gold-vivid/60" aria-hidden="true" />
                  {{ $t(`projects.categories.${project.category}`) }}
                </span>
              </div>

              <!-- Title -->
              <h3
                class="mb-3 text-xl font-bold leading-snug tracking-tight text-zenith-text-primary-light transition-colors duration-300 group-hover:text-zenith-gold-vivid/90 dark:text-zenith-text-primary-dark lg:text-2xl"
              >
                {{ $t(project.titleKey) }}
              </h3>

              <!-- Description -->
              <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
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
          </div>

          <!-- Bottom row divider -->
          <div
            class="h-px bg-gradient-to-r from-zenith-gold-vivid/40 via-zenith-gold-bronze/20 to-transparent transition-all duration-500 group-hover:via-zenith-gold-vivid/35"
            aria-hidden="true"
          />
        </article>
      </div>

      <!-- Mobile CTA button -->
      <div class="mt-8 flex justify-center sm:hidden">
        <Button as-child variant="gold" :aria-label="$t('projectsPreview.cta')">
          <NuxtLink :to="localePath('/portfolio')">
            {{ $t('projectsPreview.cta') }}
            <ArrowRight :size="14" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ExternalLink, ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { projects, type Project } from '~/constants/projects'

const localePath = useLocalePath()

/** Returns the first 3 projects to display as a homepage preview. */
const previewProjects = computed<Project[]>(() => projects.slice(0, 3))
</script>

<style scoped>
@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
