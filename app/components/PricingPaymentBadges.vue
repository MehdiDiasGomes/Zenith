<template>
  <div class="mt-10 flex flex-col items-center gap-4">
    <p class="text-xs font-semibold uppercase tracking-widest text-zenith-text-secondary-light/40 dark:text-zenith-text-secondary-dark/40">
      {{ $t('pricing.paymentMethodsLabel') }}
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <div
        v-for="method in paymentMethods"
        :key="method.id"
      >
        <img
          :src="method.src"
          :alt="method.alt"
          class="h-9 w-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaymentMethod {
  id: string
  src: string
  alt: string
}

const paymentMethods: PaymentMethod[] = [
  { id: 'visa', src: '/images/payment/visa.svg', alt: 'Visa' },
  { id: 'mastercard', src: '/images/payment/mastercard.svg', alt: 'Mastercard' },
  { id: 'apple-pay', src: '/images/payment/apple-pay.svg', alt: 'Apple Pay' },
  { id: 'google-pay', src: '/images/payment/google-pay.svg', alt: 'Google Pay' },
  { id: 'klarna', src: '/images/payment/klarna.svg', alt: 'Klarna' },
]
</script>
