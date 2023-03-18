// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.webp",
        },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
  ],
  i18n: {
    locales: [
      {
        code: "ja",
        iso: "ja-JP",
        file: "ja.yaml",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.yaml",
      },
    ],
    langDir: "./locales/",
    defaultLocale: "ja",
    vueI18n: {
      legacy: false,
      fallbackLocale: "ja",
      datetimeFormats: {
        ja: {
          time: {
            hour12: false,
          },
        },
      },
    },
  },

  googleFonts: {
    families: {
      "M PLUS 2": [400, 700],
      "Kaisei Opti": [700],
      Cairo: [700],
      "Kiwi Maru": [500],
    },
  },

  css: ["~/assets/styles/global.sass"],

  nitro: {
    preset: "node-server",
  },
})
