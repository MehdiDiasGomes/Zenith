export interface FaqItem {
  id: string
  questionKey: string
  answerKey: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'process',
    questionKey: 'faq.items.process.question',
    answerKey: 'faq.items.process.answer',
  },
  {
    id: 'timeline',
    questionKey: 'faq.items.timeline.question',
    answerKey: 'faq.items.timeline.answer',
  },
  {
    id: 'pricing',
    questionKey: 'faq.items.pricing.question',
    answerKey: 'faq.items.pricing.answer',
  },
  {
    id: 'maintenance',
    questionKey: 'faq.items.maintenance.question',
    answerKey: 'faq.items.maintenance.answer',
  },
  {
    id: 'autonomy',
    questionKey: 'faq.items.autonomy.question',
    answerKey: 'faq.items.autonomy.answer',
  },
  {
    id: 'payment',
    questionKey: 'faq.items.payment.question',
    answerKey: 'faq.items.payment.answer',
  },
]
