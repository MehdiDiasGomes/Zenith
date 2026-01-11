<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-zenith-bg-light px-4 py-20 dark:bg-zenith-bg-dark sm:px-6 lg:px-8"
  >
    <div class="relative mx-auto max-w-6xl">
      <div class="mb-12 space-y-2 text-center">
        <h1
          class="mb-4 text-4xl font-bold text-zenith-text-primary-light dark:text-zenith-text-primary-dark md:text-5xl"
        >
          {{ $t('contact.title') }}
        </h1>
        <p class="text-lg text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <form
            class="relative group space-y-6 rounded-2xl border border-zenith-bronze-dark/10 bg-zenith-bg-light p-8 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-secondary-dark"
            @submit="onSubmit"
          >
            <FormField v-slot="{ componentField }" name="name">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('contact.form.name.label') }}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    :placeholder="$t('contact.form.name.placeholder')"
                    v-bind="componentField"
                    class="border-zenith-bronze-dark/20 focus:border-zenith-gold-vivid focus:ring-zenith-gold-vivid/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('contact.form.email.label') }}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    :placeholder="$t('contact.form.email.placeholder')"
                    v-bind="componentField"
                    class="border-zenith-bronze-dark/20 focus:border-zenith-gold-vivid focus:ring-zenith-gold-vivid/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="subject">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('contact.form.subject.label') }}</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger
                      class="border-zenith-bronze-dark/20 focus:border-zenith-gold-vivid focus:ring-zenith-gold-vivid/20"
                    >
                      <SelectValue :placeholder="$t('contact.form.subject.placeholder')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="showcase">
                      {{ $t('contact.form.subject.options.showcase') }}
                    </SelectItem>
                    <SelectItem value="portfolio">
                      {{ $t('contact.form.subject.options.portfolio') }}
                    </SelectItem>
                    <SelectItem value="eshop">
                      {{ $t('contact.form.subject.options.eshop') }}
                    </SelectItem>
                    <SelectItem value="other">
                      {{ $t('contact.form.subject.options.other') }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="message">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('contact.form.message.label') }}</FormLabel>
                <FormControl>
                  <Textarea
                    :placeholder="$t('contact.form.message.placeholder')"
                    v-bind="componentField"
                    :rows="6"
                    class="border-zenith-bronze-dark/20 focus:border-zenith-gold-vivid focus:ring-zenith-gold-vivid/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-lg border border-zenith-gold-vivid bg-zenith-gold-vivid px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-transparent hover:text-zenith-gold-vivid disabled:opacity-50"
            >
              <span v-if="!isSubmitting">{{ $t('contact.form.submit') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <Icon name="Loader2" class="animate-spin" size="16" />
                {{ $t('contact.form.sending') }}
              </span>
            </Button>

            <p
              v-if="submitStatus === 'success'"
              class="text-center text-sm font-medium text-green-600 dark:text-green-400"
            >
              {{ $t('contact.form.success') }}
            </p>
            <p
              v-if="submitStatus === 'error'"
              class="text-center text-sm font-medium text-red-600 dark:text-red-400"
            >
              {{ $t('contact.form.error') }}
            </p>
          </form>
        </div>

        <div class="flex flex-col justify-between space-y-8">
          <div class="flex items-center justify-center">
            <NuxtImg
              src="/assets/illustrations/contact_us.svg"
              alt="Contact illustration"
              class="h-64 w-64 md:h-80 md:w-80"
              loading="lazy"
            />
          </div>

          <div class="space-y-4">
            <a
              v-for="contact in contactInfo"
              :key="contact.id"
              :href="contact.href"
              class="group flex w-fit items-center gap-4"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light transition-all duration-300 group-hover:scale-110 group-hover:border-zenith-gold-vivid/30 group-hover:bg-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
              >
                <Icon
                  :name="contact.icon"
                  size="24"
                  class="text-zenith-gold-vivid transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
                >
                  {{ $t(contact.labelKey) }}
                </h3>
                <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  {{ contact.value }}
                </p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/dg_zenith/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex w-fit items-center gap-4"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zenith-bronze-dark/10 bg-zenith-bg-secondary-light transition-all duration-300 group-hover:scale-110 group-hover:border-zenith-gold-vivid/30 group-hover:bg-zenith-gold-vivid/10 dark:border-zenith-gold-bronze/20 dark:bg-zenith-bg-dark"
              >
                <Icon
                  name="Instagram"
                  size="24"
                  class="text-zenith-gold-vivid transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-zenith-text-primary-light dark:text-zenith-text-primary-dark"
                >
                  {{ $t('contact.info.instagram.label') }}
                </h3>
                <p class="text-sm text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
                  @dg_zenith
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface ContactInfo {
  id: string
  icon: string
  labelKey: string
  value: string
  href: string
}

const { t } = useI18n()

const contactInfo: ContactInfo[] = [
  {
    id: 'email',
    icon: 'Mail',
    labelKey: 'contact.info.email.label',
    value: 'contact@dg-zenith.com',
    href: 'mailto:contact@dg-zenith.com',
  },
  {
    id: 'phone',
    icon: 'Phone',
    labelKey: 'contact.info.phone.label',
    value: '+33 7 89 62 69 27',
    href: 'tel:+33789626927',
  },
]

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
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
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
