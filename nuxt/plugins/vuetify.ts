import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/lib/styles/main.sass"
import {h} from "#imports"

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        dark: {
          dark: true,
          colors: {
            primary: "#ff8b00",
            star: "#ffff00",
            footer: "#3a3a3a",
            "button-activated": "#d24700",
          },
        },
        light: {
          dark: false,
          colors: {
            primary: "#22aefa",
            star: "#ff8c00",
            footer: "#e1e1e1",
            "button-activated": "#ff5900",
          },
        },
      },
    },
    icons: {
      defaultSet: "mdi",
      sets: {
        ms: {
          component(params) {
            return h("i", {
              class: ["font-material-symbols-outlined"],
              textContent: params.icon,
            })
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
