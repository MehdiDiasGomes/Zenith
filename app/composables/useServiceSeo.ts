export function useServiceSeo(serviceKey: string, slug: string): void {
  const { t } = useI18n()
  const baseUrl = 'https://www.dg-zenith.com'

  useSeoMeta({
    title: () => t(`servicePages.${serviceKey}.seo.title`),
    description: () => t(`servicePages.${serviceKey}.seo.description`),
    ogTitle: () => t(`servicePages.${serviceKey}.seo.title`),
    ogDescription: () => t(`servicePages.${serviceKey}.seo.description`),
    ogImage: `${baseUrl}/og-image.png`,
    ogUrl: `${baseUrl}/services/${slug}`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => t(`servicePages.${serviceKey}.seo.title`),
    twitterDescription: () => t(`servicePages.${serviceKey}.seo.description`),
    twitterImage: `${baseUrl}/og-image.png`,
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: `${baseUrl}/services/${slug}`,
      },
    ],
  })
}
