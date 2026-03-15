<template>
  <section id="contact" class="relative overflow-hidden">
    <div
      class="grid overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 dark:border-zenith-gold-bronze/15 lg:grid-cols-[2fr_3fr]"
    >
      <!-- Left Info Panel -->
      <div
        class="relative flex flex-col gap-8 overflow-hidden bg-zenith-bg-secondary-light px-8 py-10 dark:bg-[#141412] lg:px-10 lg:py-12"
      >
        <!-- Gold left accent bar -->
        <div
          class="absolute inset-y-0 left-0 z-10 w-0.5 bg-gradient-to-b from-transparent via-zenith-gold-vivid/70 to-transparent"
          aria-hidden="true"
        />
        <!-- Decorative corner element -->
        <div
          class="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-zenith-gold-vivid/3 blur-2xl"
          aria-hidden="true"
        />

        <!-- Panel header -->
        <div class="space-y-3">
          <span class="text-xs font-semibold uppercase tracking-widest text-zenith-gold-vivid">
            {{ $t('contact.title') }}
          </span>
          <p class="text-xl font-semibold leading-snug text-zenith-text-primary-light dark:text-zenith-text-primary-dark">
            {{ $t('contact.subtitle') }}
          </p>
        </div>

        <!-- Response badge -->
        <div class="inline-flex w-fit items-center gap-2 rounded-full border border-zenith-gold-bronze/25 bg-zenith-gold-vivid/5 px-3.5 py-1.5 dark:border-zenith-gold-vivid/15">
          <span class="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-50" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-zenith-gold-vivid" />
          </span>
          <span class="text-xs font-medium text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
            {{ $t('contact.badge') }}
          </span>
        </div>

        <!-- Contact info items -->
        <div class="flex flex-col gap-5">
          <a
            v-for="contact in contactInfo"
            :key="contact.id"
            :href="contact.href"
            class="group flex items-center gap-4"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 group-hover:border-zenith-gold-vivid/40 group-hover:bg-zenith-gold-vivid/8 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-dark"
            >
              <Icon
                :name="contact.icon"
                size="18"
                class="text-zenith-gold-bronze transition-colors duration-300 group-hover:text-zenith-gold-vivid dark:text-zenith-gold-vivid"
                aria-hidden="true"
              />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t(contact.labelKey) }}
              </p>
              <p class="text-sm font-medium text-zenith-text-primary-light transition-colors duration-200 group-hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark">
                {{ contact.value }}
              </p>
            </div>
          </a>

          <!-- Instagram -->
          <a
            href="https://www.instagram.com/dg_zenith/"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-light transition-all duration-300 group-hover:border-zenith-gold-vivid/40 group-hover:bg-zenith-gold-vivid/8 dark:border-zenith-gold-bronze/15 dark:bg-zenith-bg-dark"
            >
              <Icon
                name="Instagram"
                size="18"
                class="text-zenith-gold-bronze transition-colors duration-300 group-hover:text-zenith-gold-vivid dark:text-zenith-gold-vivid"
                aria-hidden="true"
              />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                {{ $t('contact.info.instagram.label') }}
              </p>
              <p class="text-sm font-medium text-zenith-text-primary-light transition-colors duration-200 group-hover:text-zenith-gold-vivid dark:text-zenith-text-primary-dark">
                @dg_zenith
              </p>
            </div>
          </a>
        </div>

        <!-- Map -->
        <div class="-mb-10 -mx-8 mt-auto lg:-mb-12 lg:-mx-10">
          <div class="h-44 lg:h-52">
            <ClientOnly>
              <LazyMap />
              <template #fallback>
                <div
                  class="flex h-full w-full items-center justify-center bg-zenith-bg-light dark:bg-zenith-bg-dark"
                >
                  <div class="flex items-center gap-2 text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                    <svg
                      class="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span class="text-xs">{{ $t('contact.map.loading') }}</span>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- Right Form Panel -->
      <div class="flex h-full flex-col bg-zenith-bg-light px-8 py-10 dark:bg-zenith-bg-dark lg:px-12 lg:py-12">
        <form class="flex h-full flex-col gap-8" @submit="onSubmit" novalidate>

          <!-- Name + Email row -->
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <!-- Name -->
            <FormField v-slot="{ componentField, meta }" name="name">
              <FormItem class="group space-y-0">
                <FormLabel
                  class="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light transition-colors duration-200 group-focus-within:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
                >
                  {{ $t('contact.form.name.label') }}
                </FormLabel>
                <FormControl>
                  <div class="relative">
                    <input
                      type="text"
                      :placeholder="$t('contact.form.name.placeholder')"
                      :aria-invalid="meta.validated && !meta.valid"
                      class="w-full border-0 bg-transparent py-2.5 text-sm text-zenith-text-primary-light outline-none placeholder:text-zenith-text-secondary-light/30 dark:text-zenith-text-primary-dark dark:placeholder:text-zenith-text-secondary-dark/25"
                      v-bind="componentField"
                    />
                    <span class="absolute bottom-0 left-0 h-px w-full bg-zenith-gold-bronze/20 dark:bg-zenith-gold-bronze/15" aria-hidden="true" />
                    <span class="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-focus-within:w-full" aria-hidden="true" />
                  </div>
                </FormControl>
                <FormMessage class="mt-1.5 text-xs" />
              </FormItem>
            </FormField>

            <!-- Email -->
            <FormField v-slot="{ componentField, meta }" name="email">
              <FormItem class="group space-y-0">
                <FormLabel
                  class="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light transition-colors duration-200 group-focus-within:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
                >
                  {{ $t('contact.form.email.label') }}
                </FormLabel>
                <FormControl>
                  <div class="relative">
                    <input
                      type="email"
                      :placeholder="$t('contact.form.email.placeholder')"
                      :aria-invalid="meta.validated && !meta.valid"
                      class="w-full border-0 bg-transparent py-2.5 text-sm text-zenith-text-primary-light outline-none placeholder:text-zenith-text-secondary-light/30 dark:text-zenith-text-primary-dark dark:placeholder:text-zenith-text-secondary-dark/25"
                      v-bind="componentField"
                    />
                    <span class="absolute bottom-0 left-0 h-px w-full bg-zenith-gold-bronze/20 dark:bg-zenith-gold-bronze/15" aria-hidden="true" />
                    <span class="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-focus-within:w-full" aria-hidden="true" />
                  </div>
                </FormControl>
                <FormMessage class="mt-1.5 text-xs" />
              </FormItem>
            </FormField>
          </div>

          <!-- Subject -->
          <FormField v-slot="{ value, handleChange, handleBlur }" name="subject">
            <FormItem class="group space-y-0">
              <FormLabel
                class="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light transition-colors duration-200 group-focus-within:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
              >
                {{ $t('contact.form.subject.label') }}
              </FormLabel>
              <FormControl>
                <div class="relative">
                  <select
                    :value="value"
                    class="w-full appearance-none border-0 bg-transparent py-2.5 pr-6 text-sm outline-none"
                    :class="
                      value
                        ? 'text-zenith-text-primary-light dark:text-zenith-text-primary-dark'
                        : 'text-zenith-text-secondary-light/40 dark:text-zenith-text-secondary-dark/25'
                    "
                    @change="handleChange(($event.target as HTMLSelectElement).value)"
                    @blur="handleBlur"
                  >
                    <option value="" disabled :selected="!value">
                      {{ $t('contact.form.subject.placeholder') }}
                    </option>
                    <option value="showcase">{{ $t('contact.form.subject.options.showcase') }}</option>
                    <option value="seoaudit">{{ $t('contact.form.subject.options.seoaudit') }}</option>
                    <option value="eshop">{{ $t('contact.form.subject.options.eshop') }}</option>
                    <option value="other">{{ $t('contact.form.subject.options.other') }}</option>
                  </select>
                  <!-- Chevron -->
                  <ChevronDown
                    class="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-zenith-text-secondary-light/40 transition-colors duration-200 group-focus-within:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark/30"
                    aria-hidden="true"
                  />
                  <span class="absolute bottom-0 left-0 h-px w-full bg-zenith-gold-bronze/20 dark:bg-zenith-gold-bronze/15" aria-hidden="true" />
                  <span class="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-focus-within:w-full" aria-hidden="true" />
                </div>
              </FormControl>
              <FormMessage class="mt-1.5 text-xs" />
            </FormItem>
          </FormField>

          <!-- Message -->
          <FormField v-slot="{ componentField, meta }" name="message">
            <FormItem class="group flex flex-1 flex-col space-y-0">
              <FormLabel
                class="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light transition-colors duration-200 group-focus-within:text-zenith-gold-vivid dark:text-zenith-text-secondary-dark"
              >
                {{ $t('contact.form.message.label') }}
              </FormLabel>
              <FormControl class="flex-1">
                <div class="relative flex h-full flex-col">
                  <textarea
                    :placeholder="$t('contact.form.message.placeholder')"
                    :aria-invalid="meta.validated && !meta.valid"
                    class="h-full w-full flex-1 resize-none border-0 bg-transparent py-2.5 text-sm text-zenith-text-primary-light outline-none placeholder:text-zenith-text-secondary-light/30 dark:text-zenith-text-primary-dark dark:placeholder:text-zenith-text-secondary-dark/25"
                    v-bind="componentField"
                  />
                  <span class="absolute bottom-0 left-0 h-px w-full bg-zenith-gold-bronze/20 dark:bg-zenith-gold-bronze/15" aria-hidden="true" />
                  <span class="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-zenith-gold-bronze to-zenith-gold-vivid transition-all duration-300 group-focus-within:w-full" aria-hidden="true" />
                </div>
              </FormControl>
              <FormMessage class="mt-1.5 text-xs" />
            </FormItem>
          </FormField>

          <!-- Consent -->
          <FormField v-slot="{ value, handleChange }" name="consent">
            <FormItem class="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  :checked="value"
                  class="mt-0.5 border-zenith-gold-bronze/30 data-[state=checked]:border-zenith-gold-vivid data-[state=checked]:bg-zenith-gold-vivid dark:border-zenith-gold-bronze/25"
                  @update:checked="handleChange"
                />
              </FormControl>
              <div v-auto-animate class="space-y-1 leading-none">
                <FormLabel class="cursor-pointer text-xs font-normal leading-relaxed text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  {{ $t('contact.form.consent.label') }}
                  <NuxtLink
                    :to="localePath('/legal')"
                    class="text-zenith-gold-vivid underline underline-offset-2 transition-colors duration-200 hover:text-zenith-champagne"
                  >
                    {{ $t('contact.form.consent.linkText') }}
                  </NuxtLink>
                </FormLabel>
                <FormMessage class="text-xs" />
              </div>
            </FormItem>
          </FormField>

          <!-- Submit -->
          <div class="flex flex-col gap-3">
            <Button type="submit" variant="gold" size="lg" :disabled="isSubmitting" class="w-full">
              <span v-if="!isSubmitting" class="inline-flex items-center gap-2 whitespace-nowrap">
                {{ $t('contact.form.submit') }}
                <ArrowRight :size="16" aria-hidden="true" />
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {{ $t('contact.form.sending') }}
              </span>
            </Button>

            <!-- Status messages -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <p
                v-if="submitStatus === 'success'"
                class="rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-2.5 text-center text-xs font-medium text-green-600 dark:text-green-400"
                role="alert"
              >
                {{ $t('contact.form.success') }}
              </p>
              <p
                v-else-if="submitStatus === 'error'"
                class="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-center text-xs font-medium text-red-600 dark:text-red-400"
                role="alert"
              >
                {{ $t('contact.form.error') }}
              </p>
            </Transition>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { contactInfo } from '~/constants/contact'

const { t } = useI18n()
const localePath = useLocalePath()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, {
      message: t('contact.form.name.error'),
    }),
    email: z.string().email({
      message: t('contact.form.email.error'),
    }),
    subject: z.string().min(1, {
      message: t('contact.form.subject.error'),
    }),
    message: z.string().min(10, {
      message: t('contact.form.message.error'),
    }),
    consent: z.boolean().refine((val) => val === true, {
      message: t('contact.form.consent.error'),
    }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  },
  validateOnMount: false,
})

const isSubmitting = ref<boolean>(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: values,
    })

    if (response.success) {
      submitStatus.value = 'success'
      form.resetForm()
    }
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
})
</script>
