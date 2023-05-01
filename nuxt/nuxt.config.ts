// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from "@rollup/plugin-yaml"
import {generateSchemas} from "./scripts/generate-schemas"

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "scroll-y-reverse-transition",
      leaveActiveClass: "position-absolute d-none",
      duration: 200,
    },
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
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  hooks: {
    async "build:before"() {
      await generateSchemas()
    },
    async "builder:watch"(_, path) {
      if (path.startsWith("schemas/")) {
        await generateSchemas()
      }
    },
  },

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
      "M PLUS 2": [500, 700],
      "Kaisei Opti": [700],
      Cairo: [700],
      "Kiwi Maru": [500],
      "Material Symbols Outlined": true,
    },
  },

  pinia: {
    autoImports: [
      "defineStore",
    ],
  },

  piniaPersistedstate: {
    storage: "localStorage",
  },

  css: ["~/assets/styles/global.sass"],

  nitro: {
    preset: "node-server",
  },

  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [
      yaml({
        exclude: "locales/**",
      }),
    ],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "#shared/*": ["../firebase/functions/src/types/shared/*"],
        },
      },
    },
  },

  // experimental: {
  //   payloadExtraction: false,
  // },

  runtimeConfig: {
    public: {
      isFirebaseDev: process.env.CF_PAGES_BRANCH !== "main",
      useFirebaseEmulator: process.env.USE_FIREBASE_EMULATOR === "true",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      firebaseConfigDev: {
        apiKey: "AIzaSyDh7jj7FTQqJ0aEhmutNhjqTtHGY2MruhI",
        authDomain: "chikach.net",
        projectId: "genshin-material-dev",
        storageBucket: "genshin-material-dev.appspot.com",
        messagingSenderId: "569046955668",
        appId: "1:569046955668:web:7f1121ac0198d73d676681",
      },
      firebaseConfigProd: {
        apiKey: "AIzaSyCFtaRMzuKo67LrZs2UBUKBUZHai2pArFQ",
        authDomain: "chikach.net",
        projectId: "genshin-material",
        storageBucket: "genshin-material.appspot.com",
        messagingSenderId: "1018400803757",
        appId: "1:1018400803757:web:4143744be70153c7b76f24",
      },
    },
  },
})
