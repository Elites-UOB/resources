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
    icon: {
      maskablePadding: 0,
    },
    manifest: {
      name: "مصادر",
      lang: "ar",
      background_color: "#0C0C0D",
      categories: ["education", "books", 'resources'],
      orientation: "portrait",
      display: "standalone",
    },
    meta: {
      author: "فريق النخبة البرمجي",
      description: "مصادر هو موقع يقدم لك كل ما تحتاجه من مصادر تعليمية مجانية ومفيدة",
      theme_color: "#0C0C0D",
      ogHost: "https://resources.csitelites.tech",
      ogImage: "/cover.jpg",
      ogTitle: "مصادر",
      ogDescription: "مصادر هو موقع يقدم لك كل ما تحتاجه من مصادر تعليمية مجانية ومفيدة",
      ogSiteName: "مصادر",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterSite: "@csitelites",
      twitterCreator: "@csitelites",
      favicon: true,
      lang: "ar",
      mobileApp: true,
      mobileAppIOS: true,
      name: "مصادر",
      ogUrl: "https://resources.csitelites.tech",
      title: "مصادر",
    },
    workbox: {
      // enabled: true
    }
  }
});
