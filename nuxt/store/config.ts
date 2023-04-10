import {ThemeConfig} from "~/types/strings"

export const useConfigStore = defineStore("config", {
  state() {
    return {
      theme: "auto" as ThemeConfig,
      resinCount: 0,
      resinBaseTime: new Date().getTime(),
      wishHistoryUrl: "",
    }
  },
  actions: {
    getCurrentTheme(): ThemeConfig {
      if (this.theme === "auto") {
        if (process.client) {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
        return "light"
      }
      return this.theme
    },
  },
  persist: true,
})
