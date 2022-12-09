import { UnocssNuxtOptions } from "@unocss/nuxt";
import palettes from "./palettes.json";
import transformerDirective from '@unocss/transformer-directives'

export const config: UnocssNuxtOptions = {
  autoImport: true,
  uno: true,
  icons: true,
  attributify: true,
  typography: true,
  transformers: [
    transformerDirective(),
  ],
  

  webFonts: {
    provider: "google",
    fonts: {
      sans: ["Tajawal:200,300,400,500,600,700,800,900"],
    },
  },

  preflights: [
    {
      getCSS: ({ theme }) => `
          * {
            font-family: ${theme["fontFamily"]["sans"]};
          }
        `,
    },
  ],

  theme: {
    colors: palettes,
  },
};
