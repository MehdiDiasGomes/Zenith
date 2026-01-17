<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  CheckboxIndicator,
  CheckboxRoot,
  type CheckboxRootEmits,
  type CheckboxRootProps,
} from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <CheckboxRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'peer h-5 w-5 shrink-0 rounded-sm border border-zenith-bronze-dark/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zenith-gold-vivid focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zenith-gold-vivid data-[state=checked]:border-zenith-gold-vivid data-[state=checked]:text-white transition-colors',
        props.class,
      )
    "
    @update:checked="
      (value) => {
        emits('update:checked', value)
      }
    "
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <Check class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
