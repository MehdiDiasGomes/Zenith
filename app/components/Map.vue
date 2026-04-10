<template>
  <div class="map-wrapper relative h-full w-full overflow-hidden">
    <!-- Leaflet container -->
    <div
      ref="mapContainer"
      class="h-full w-full overflow-hidden"
      :aria-label="$t('contact.map.ariaLabel')"
      role="img"
    />

    <!-- Top gradient fade — blends map into panel above -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-zenith-bg-secondary-light to-transparent dark:from-[#141412]"
      aria-hidden="true"
    />

    <!-- Vignette edges -->
    <div
      class="pointer-events-none absolute inset-0 map-vignette"
      aria-hidden="true"
    />

    <!-- Location chip -->
    <div
      class="absolute bottom-3 right-3 z-[1000] flex items-center gap-2 rounded-full border border-zenith-gold-bronze/30 bg-zenith-bg-secondary-light/80 px-3 py-1.5 backdrop-blur-md dark:border-zenith-gold-vivid/20 dark:bg-[#141412]/80"
      aria-hidden="true"
    >
      <span class="relative flex h-1.5 w-1.5 shrink-0">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-60" />
        <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-zenith-gold-vivid" />
      </span>
      <span class="text-[10px] font-semibold uppercase tracking-widest text-zenith-text-secondary-light dark:text-zenith-text-secondary-dark">
        Thionville · Metz (57)
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet'
import type LeafletLib from 'leaflet'

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<LeafletMap | null>(null)
const tileLayer = ref<LeafletTileLayer | null>(null)
let L: typeof LeafletLib | null = null

const colorMode = useColorMode()

const THIONVILLE_LAT = 49.3583
const THIONVILLE_LNG = 6.1681
const ZOOM_LEVEL = 13

/**
 * Returns the CARTO tile URL based on the current color mode
 * @param isDark - Whether dark mode is active
 * @returns Tile layer URL string
 */
const getTileLayerUrl = (isDark: boolean): string => {
  return isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
}

/**
 * Swaps the tile layer when the color mode changes
 */
const updateTileLayer = (): void => {
  if (!map.value || !L) return

  if (tileLayer.value) {
    map.value.removeLayer(tileLayer.value)
  }

  const isDark = colorMode.value === 'dark'
  tileLayer.value = L.tileLayer(getTileLayerUrl(isDark), {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map.value)
}

/**
 * Initializes the Leaflet map, marker, and tile layer
 */
const initMap = async (): Promise<void> => {
  if (!mapContainer.value) return

  if (!L) {
    L = (await import('leaflet')).default
    await import('leaflet/dist/leaflet.css')
  }

  map.value = L.map(mapContainer.value, {
    center: [THIONVILLE_LAT, THIONVILLE_LNG],
    zoom: ZOOM_LEVEL,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  updateTileLayer()

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex h-12 w-12 items-center justify-center">
        <div class="absolute h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-20"></div>
        <div class="relative flex h-9 w-9 items-center justify-center rounded-full bg-zenith-gold-vivid shadow-lg shadow-zenith-gold-vivid/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  })

  L.marker([THIONVILLE_LAT, THIONVILLE_LNG], { icon: customIcon })
    .addTo(map.value)
    .bindPopup(
      `<div style="padding:12px;text-align:center;font-family:Montserrat,sans-serif;">
        <img src="/images/brand/logo.webp" alt="Zenith" style="height:36px;width:auto;margin:0 auto 8px;display:block;" />
        <p style="font-size:12px;font-weight:600;color:#b6771d;margin:0;letter-spacing:0.05em;">THIONVILLE (57)</p>
      </div>`,
      { className: 'custom-popup' },
    )
}

/**
 * Destroys the Leaflet map instance
 */
const cleanupMap = (): void => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
}

watch(
  () => colorMode.value,
  () => {
    updateTileLayer()
  },
)

onMounted(() => {
  nextTick(async () => {
    await initMap()
    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize()
      }
    }, 100)
  })
})

onBeforeUnmount(() => {
  cleanupMap()
})
</script>

<style scoped>
.map-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 40%,
    rgba(20, 20, 18, 0.35) 100%
  );
}

:global(.dark) .map-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 40%,
    rgba(10, 10, 9, 0.5) 100%
  );
}

/* Attribution — minimal and unobtrusive */
:deep(.leaflet-control-attribution) {
  background: transparent !important;
  font-size: 9px !important;
  color: rgba(160, 152, 144, 0.6) !important;
  padding: 2px 6px !important;
}

:deep(.leaflet-control-attribution a) {
  color: rgba(182, 119, 29, 0.6) !important;
}

/* Zoom controls */
:deep(.leaflet-control-zoom) {
  border: 1px solid rgba(182, 119, 29, 0.2) !important;
  border-radius: 10px !important;
  overflow: hidden !important;
  box-shadow: none !important;
}

:deep(.leaflet-control-zoom a) {
  background-color: rgba(245, 240, 232, 0.92) !important;
  color: #b6771d !important;
  border: none !important;
  border-bottom: 1px solid rgba(182, 119, 29, 0.15) !important;
  font-size: 16px !important;
  line-height: 26px !important;
  width: 26px !important;
  height: 26px !important;
  transition: all 0.2s !important;
}

:global(.dark) :deep(.leaflet-control-zoom a) {
  background-color: rgba(20, 20, 18, 0.92) !important;
  color: #ff9d00 !important;
  border-bottom: 1px solid rgba(182, 119, 29, 0.15) !important;
}

:deep(.leaflet-control-zoom a:last-child) {
  border-bottom: none !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #ff9d00 !important;
  color: white !important;
}

/* Popup */
:deep(.leaflet-popup-content-wrapper) {
  background: rgba(245, 240, 232, 0.97) !important;
  border: 1px solid rgba(182, 119, 29, 0.25) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  padding: 0 !important;
}

:global(.dark) :deep(.leaflet-popup-content-wrapper) {
  background: rgba(20, 20, 18, 0.97) !important;
  border: 1px solid rgba(182, 119, 29, 0.25) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
}

:deep(.leaflet-popup-content) {
  margin: 0 !important;
}

:deep(.leaflet-popup-tip) {
  background: rgba(245, 240, 232, 0.97) !important;
}

:global(.dark) :deep(.leaflet-popup-tip) {
  background: rgba(20, 20, 18, 0.97) !important;
}

:deep(.leaflet-popup-close-button) {
  color: #ff9d00 !important;
  font-size: 16px !important;
  top: 6px !important;
  right: 8px !important;
}

:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}
</style>
