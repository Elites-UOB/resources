// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from "./themeconfig/config";
export default defineNuxtConfig({
  ssr: false,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    "nuxt-icon",
    "@nuxtjs/supabase",
    "nuxt-headlessui",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],

  unocss: config,

  imports: {
    dirs: ["stores/**"],
  },

  pwa: {
    manifest: {
      name: "مصادر",
      lang: "ar",
      background_color: "#0C0C0D",
      categories: ["education", "books", 'resources'],
      orientation: "portrait",
      display: "standalone",
    },
    workbox: {
      enabled: true
    }
  }
});
