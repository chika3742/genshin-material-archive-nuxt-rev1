<template>
  <div class="d-flex flex-column" style="gap: 16px">
    <v-row align="center" class="flex-wrap" no-gutters>
      <v-img :src="getWeaponImage(weapon.id)" aspect-ratio="1" max-width="70px" min-width="70px" />
      <div class="ml-2">
        <h1 style="font-size: 1.3em">
          {{ $t(`weapons.${weapon.id}`) }}
        </h1>
        <v-card-subtitle class="pa-0">
          <span>{{ $t(`weaponTypes.${weapon.type}`) }}</span>
          <span>・{{ $t(`weaponWhereToGet.${weapon.whereToGet}`) }}</span>
        </v-card-subtitle>
      </div>
      <div class="ml-4">
        <v-icon v-for="i of weapon.rarity" :key="i" color="star" size="16">
          mdi-star
        </v-icon>
      </div>
    </v-row>

    <v-expansion-panels mandatory="force">
      <slider-panel
        :rarity="weapon.rarity"
        :target="weapon"
        :title="$t('weaponDetailsPage.ascension.title')"
        target-type="weapon"
      />

      <v-expansion-panel v-if="weapon.subStat || weapon.hasDescription">
        <v-expansion-panel-title>{{ $t("weaponDetailsPage.effects") }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="d-flex flex-column" style="gap: 16px">
            <h3 v-if="weapon.subStat">
              <span>{{ $t("weaponDetailsPage.subStat") }}: </span>{{ $t(`stats.${weapon.subStat}`) }}
            </h3>
            <p v-if="weapon.hasDescription" v-html="marked.parse($t(`weaponDescriptions.${weapon.id}`))" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>
import {marked} from "marked"
import weapons from "~/assets/data/weapons.yaml"

const renderer = new marked.Renderer()

renderer.strong = (text) => {
  return `<span class="text-light-blue font-weight-bold">${text}</span>`
}

renderer.list = (body) => {
  return `<ul class="pl-4">${body}</ul>`
}

marked.options({
  renderer,
})

definePageMeta({
  title: "weapons__weaponId",
})

const route = useRoute()

if (weapons.every(e => e.id !== route.params.weaponId)) {
  throw createError({statusCode: 404, message: "weapon not found"})
}

const weapon = weapons.find(e => e.id === route.params.weaponId)!
</script>

<style lang="sass" scoped>
h3
  font-size: 1em

  span
    font-weight: normal
</style>