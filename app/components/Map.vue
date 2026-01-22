<template>
  <div
    ref="mapContainer"
    class="h-full w-full overflow-hidden rounded-2xl border border-zenith-bronze-dark/10 dark:border-zenith-gold-bronze/20"
    :aria-label="$t('contact.map.ariaLabel')"
    role="img"
  />
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<L.Map | null>(null)
const tileLayer = ref<L.TileLayer | null>(null)

const colorMode = useColorMode()

// Thionville coordinates
const THIONVILLE_LAT = 49.3583
const THIONVILLE_LNG = 6.1681
const ZOOM_LEVEL = 13

/**
 * Gets the appropriate tile layer URL based on color mode
 * @param isDark - Whether dark mode is active
 * @returns Tile layer URL
 */
const getTileLayerUrl = (isDark: boolean): string => {
  return isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
}

/**
 * Updates the tile layer based on color mode
 */
const updateTileLayer = (): void => {
  if (!map.value) return

  if (tileLayer.value) {
    map.value.removeLayer(tileLayer.value as unknown as L.Layer)
  }

  const isDark = colorMode.value === 'dark'
  tileLayer.value = L.tileLayer(getTileLayerUrl(isDark), {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map.value as unknown as L.Map)
}

/**
 * Initializes the Leaflet map with custom styling
 */
const initMap = (): void => {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    center: [THIONVILLE_LAT, THIONVILLE_LNG],
    zoom: ZOOM_LEVEL,
    zoomControl: true,
    scrollWheelZoom: false,
  })

  updateTileLayer()

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex h-12 w-12 items-center justify-center">
        <div class="absolute h-full w-full animate-ping rounded-full bg-zenith-gold-vivid opacity-30"></div>
        <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-zenith-gold-vivid shadow-lg shadow-zenith-gold-vivid/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    .addTo(map.value as unknown as L.Map)
    .bindPopup(
      `
      <div class="p-4 text-center">
        <img src="/images/brand/z_logo.webp" alt="Zenith" class="mx-auto mb-2 h-12 w-auto" />
        <p class="text-sm font-semibold text-black">Thionville (57)</p>
      </div>
    `,
      {
        className: 'custom-popup',
      },
    )
}

/**
 * Cleans up the map instance
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
  nextTick(() => {
    initMap()
  })
})

onBeforeUnmount(() => {
  cleanupMap()
})
</script>

<style scoped>
:deep(.leaflet-control-zoom) {
  border: 2px solid rgba(182, 119, 29, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.dark :deep(.leaflet-control-zoom a) {
  background-color: rgba(26, 26, 26, 0.9);
  color: #ff9d00;
  border: none;
  transition: all 0.2s;
}

.dark :deep(.leaflet-control-zoom a:hover) {
  background-color: #ff9d00;
  color: white;
}

:deep(.leaflet-control-zoom a) {
  background-color: rgba(255, 255, 255, 0.95);
  color: #b6771d;
  border: none;
  transition: all 0.2s;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #ff9d00;
  color: white;
}

.dark :deep(.leaflet-popup-content-wrapper) {
  background-color: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(182, 119, 29, 0.3);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.dark :deep(.leaflet-popup-tip) {
  background-color: rgba(26, 26, 26, 0.95);
}

:deep(.leaflet-popup-content-wrapper) {
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(182, 119, 29, 0.3);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-popup-tip) {
  background-color: rgba(255, 255, 255, 0.95);
}

:deep(.leaflet-popup-close-button) {
  color: #ff9d00 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  top: 8px !important;
  right: 8px !important;
  padding: 0 !important;
  line-height: 1 !important;
}

:deep(.leaflet-popup-close-button:hover) {
  color: #ffcf71 !important;
  background-color: rgba(255, 157, 0, 0.1) !important;
  border-radius: 4px !important;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}
</style>
