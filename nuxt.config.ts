// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from "./themeconfig/config";
export default defineNuxtConfig({
  ssr: false,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: [
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
});
