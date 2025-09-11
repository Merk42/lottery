import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/etc/lottery/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Lottery',
        short_name: 'Lottery',
        description: 'Tool to check winning numbers for both Powerball and Mega Meillions jackpots',
        icons: [
          {
            src: '/etc/lottery/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/etc/lottery/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/etc/lottery/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/etc/lottery/icons/monochrome.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'monochrome maskable',
          },
        ],
        theme_color: '#c8102e',
        background_color: '#ffd100',
        display: 'standalone',
        scope: '/etc/lottery',
        start_url: '/etc/lottery/index.html',
      },
    }),
  ],
})
