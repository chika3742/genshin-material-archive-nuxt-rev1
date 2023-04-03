<template>
  <v-footer elevation="4" color="footer" class="flex-grow-0">
    <div class="d-flex flex-column w-100">
      <div class="d-flex align-center justify-end flex-wrap mb-4">
        <v-btn icon="mdi-github" href="https://github.com/chika3742/genshin-material" target="_blank" variant="text" density="comfortable" />
        <v-btn :to="localePath('/release-notes')" color="primary" variant="text" density="comfortable">
          {{ $t('pageTitle.releaseNotes') }}
        </v-btn>
        <v-btn :to="localePath('/terms')" variant="text" density="comfortable">
          {{ $t('pageTitle.terms') }}
        </v-btn>
        <v-btn :to="localePath('/privacy')" variant="text" density="comfortable">
          {{ $t('pageTitle.privacy') }}
        </v-btn>
        <v-btn prepend-icon="mdi-earth" variant="text" density="comfortable">
          LANG
          <!-- to avoid hydration node mismatch error -->
          <client-only>
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="lang in availableLocales"
                  :key="lang.code"
                  :to="switchLocalePath(lang.code)"
                >
                  <v-list-item-title>{{ lang.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </client-only>
        </v-btn>
        <v-btn prepend-icon="mdi-brightness-4" variant="text" density="comfortable">
          {{ $t('footer.theme') }}
          <!-- to avoid hydration node mismatch error -->
          <client-only>
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  :title="$t('footer.themeOptions.light')"
                  prepend-icon="mdi-brightness-7"
                  :active="config.theme === 'light'"
                  @click="setTheme('light')"
                />
                <v-list-item
                  :title="$t('footer.themeOptions.dark')"
                  prepend-icon="mdi-brightness-3"
                  :active="config.theme === 'dark'"
                  @click="setTheme('dark')"
                />
                <v-list-item
                  :title="$t('footer.themeOptions.auto')"
                  prepend-icon="mdi-brightness-auto"
                  :active="config.theme === 'auto'"
                  @click="setTheme('auto')"
                />
              </v-list>
            </v-menu>
          </client-only>
        </v-btn>
      </div>
      <div class="d-flex align-end flex-wrap" style="font-size: 0.7em; gap: 16px">
        <div class="d-flex flex-column">
          <span>©chika {{ new Date().getFullYear() }}</span>
          <span>{{ $t("footer.disclaimer") }}</span>
        </div>
        <v-spacer />
        <span>{{ getCurrentVersion() }}</span>
      </div>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
import {useTheme} from "vuetify"
import {useConfigStore} from "~/store/config"
import {ThemeConfig} from "~/types/strings"

const config = useConfigStore()
const vTheme = useTheme()

const availableLocales: {code: string, name: string}[] = [
  {code: "en", name: "English"},
  {code: "ja", name: "日本語"},
]

const setTheme = (theme: ThemeConfig) => {
  config.theme = theme
  vTheme.global.name.value = config.getCurrentTheme()
}
</script>
