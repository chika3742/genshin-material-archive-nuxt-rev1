<template>
  <div>
    <NuxtLoadingIndicator
      :duration="3000"
      color="linear-gradient(to right, #4FC3F7, #D4E157, #FFA726)"
    />

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

      <v-main>
        <v-container>
          <NuxtPage :page-key="$route.fullPath" keepalive />
        </v-container>
      </v-main>

      <v-fade-transition>
        <div v-show="!mounted" class="loading-overlay" />
      </v-fade-transition>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "#imports"

const route = useRoute()
const i18n = useI18n()

const isDrawerOpenOnMobile = ref(false)
const isShowingSearchDialog = ref(false)
const mounted = ref(false)

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

onMounted(() => {
  mounted.value = true
})
</script>

<style lang="sass" scoped>
.loading-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: #121212
  z-index: 2000

  &:after
    // loading indicator
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: 60px
    height: 60px
    margin-top: -50px
    margin-left: -50px
    border-radius: 50%
    border: 5px solid #fff
    border-top-color: #f75d4f
    animation: spin 1.5s ease-in-out infinite

    @keyframes spin
      from
        transform: rotate(0deg)
      to
        transform: rotate(360deg)

</style>
