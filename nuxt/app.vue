<template>
  <div>
    <v-app>
      <AppDrawer v-model="isDrawerOpenOnMobile" />

      <v-app-bar>
        <template #prepend>
          <v-app-bar-nav-icon
            v-show="$vuetify.display.mobile"
            @click="isDrawerOpenOnMobile = true"
          />
        </template>

        <v-app-bar-title>{{ title }}</v-app-bar-title>

        <template #append>
          <v-btn
            icon
            @click="isShowingSearchDialog = true"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-app-bar>

      <v-main class="d-flex flex-column">
        <div class="position-sticky" style="top: 64px">
          <v-progress-linear :active="loadingPage" indeterminate />
        </div>

        <v-container>
          <NuxtPage :page-key="$route.fullPath" />
        </v-container>

        <v-spacer />
        <AppFooter />
      </v-main>

      <v-fade-transition>
        <div v-show="!mounted" class="loading-overlay" />
      </v-fade-transition>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import {useTheme} from "vuetify"
import {computed, ref} from "#imports"
import {useConfigStore} from "~/store/config"

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const theme = useTheme()
const config = useConfigStore()

const isDrawerOpenOnMobile = ref(false)
const isShowingSearchDialog = ref(false)
const mounted = ref(false)
const loadingPage = ref(false)

const title = computed(() => {
  if (!route.meta.title) {
    throw new Error("No title found in route meta")
  }
  const [base, paramName] = route.meta.title.split("__")
  if (paramName) {
    return i18n.t(`pageTitle.${base}`, {name: i18n.t(`${base}.${route.params[paramName]}`)})
  } else {
    return i18n.t(`pageTitle.${base}`)
  }
})

router.beforeEach(() => {
  loadingPage.value = true
})

router.afterEach(() => {
  loadingPage.value = false
})

onMounted(() => {
  mounted.value = true
  theme.global.name.value = config.getCurrentTheme()

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    theme.global.name.value = config.getCurrentTheme()
  })
})
</script>

<style lang="sass" scoped>
.loading-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 2000
  backdrop-filter: blur(4px) brightness(0.5)
  --webkit-backdrop-filter: blur(4px) brightness(0.5)

  &:after
    // loading indicator
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: 100px
    height: 100px
    margin-top: -50px
    margin-left: -50px
    border-radius: 50%
    border: 10px solid rgba(255, 255, 255, 0.2)
    border-top-color: #fff
    animation: spin 1s linear infinite

    @keyframes spin
      from
        transform: rotate(0deg)
      to
        transform: rotate(360deg)

</style>
