// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from "./themeconfig/config";
export default defineNuxtConfig({
  modules: [
    "nuxt-headlessui",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],

  unocss: config,
});
