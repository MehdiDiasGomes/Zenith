/**
 * Injects a dynamic canonical URL based on the current route path.
 * Handles both FR (default, no prefix) and EN (/en/*) locale variants automatically.
 */

const SITE_URL: string = 'https://www.dg-zenith.com'

export function usePageCanonical(): void {
  const route = useRoute()

  useHead({
    link: computed(() => [
      {
        rel: 'canonical',
        href: `${SITE_URL}${route.path}`,
      },
    ]),
  })
}
