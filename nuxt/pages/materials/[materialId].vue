<template>
  <div class="d-flex flex-column" style="gap: 16px">
    <v-row align="center" class="flex-wrap" no-gutters>
      <v-img :src="getMaterialImage(material.id)" aspect-ratio="1" max-width="50px" min-width="50px" />
      <div class="ml-2">
        <h1 style="font-size: 1.3em">
          {{ $t(`materials.${material.id}`) }}
        </h1>
        <v-card-subtitle class="pa-0">
          <span>{{ $t(`materialCategories.${material.type}`) }}</span>
          <span v-if="material.whereToGet && typeof material.whereToGet === 'string'" class="text-wrap">
            ・{{ $t(`materialWhereToGet.${material.whereToGet}`) }}
          </span>
        </v-card-subtitle>
      </div>
    </v-row>

    <v-card v-if="typeof material.whereToGet === 'object'">
      <v-card-title>{{ $t("materialDetailsPage.teyvatMap") }}</v-card-title>
      <v-card-text>
        <iframe
          :src="teyvatMapUrl"
          style="width: 100%; height: calc(100vh - 64px); border: none"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn prepend-icon="ms:open_in_new" :href="teyvatMapUrl" target="_blank">
          {{ $t("materialDetailsPage.newTab") }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="charactersUsingThisMaterial.length > 0">
      <v-card-title>{{ $t("materialDetailsPage.charactersUsingThisMaterial") }}</v-card-title>
      <v-card-text>
        <v-row no-gutters style="gap: 16px">
          <CharacterIconButton v-for="character in charactersUsingThisMaterial" :key="character.id" :character-id="character.id" />
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="weaponsUsingThisMaterial.length > 0">
      <v-card-title>{{ $t("materialDetailsPage.weaponsUsingThisMaterial") }}</v-card-title>
      <div>
        <v-list>
          <template v-for="weaponList in weaponsUsingThisMaterial" :key="weaponList[0].type">
            <v-list-subheader>
              {{ $t(`weaponTypes.${weaponList[0].type}`) }}
            </v-list-subheader>
            <WeaponListItem v-for="weapon in weaponList" :key="weapon.id" :weapon="weapon" />
          </template>
        </v-list>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import materials from "~/assets/data/materials.yaml"
import characters from "~/assets/data/characters.yaml"
import characterIngredients from "~/assets/data/character-ingredients.yaml"
import {LevelIngredients} from "~/types/generated/character-ingredients.g"
import weapons from "~/assets/data/weapons.yaml"
import weaponIngredients from "~/assets/data/weapon-ingredients.yaml"

definePageMeta({
  title: "materials__materialId",
})

const route = useRoute()

if (materials.every(material => material.id !== route.params.materialId)) {
  throw createError({statusCode: 404, message: "material not found"})
}

const material = materials.find(material => material.id === route.params.materialId)!

const teyvatMapUrl = computed(() => {
  if (typeof material.whereToGet !== "object") {
    return ""
  }
  return `https://act.hoyolab.com/ys/app/interactive-map/index.html?lang=ja-jp#/map/2?shown_types=154,2,3,${material.whereToGet.teyvatMap}`
})

const charactersUsingThisMaterial = computed(() => {
  return characters.filter((character) => {
    return Object.values(characterIngredients as unknown as {[k: string]: LevelIngredients[]}).some((levelIngredientsList) => {
      return levelIngredientsList.some((levelIngredients) => {
        return levelIngredients.ingredients.some((ingredient) => {
          return "type" in ingredient && getMaterialIdFromIngredient(ingredient, character) === material.id
        })
      })
    })
  })
})

const weaponsUsingThisMaterial = computed(() => {
  return separateAndSortWeapons(weapons.filter((weapon) => {
    return weaponIngredients.find(e => e.rarity === weapon.rarity)!.levels.some((levelIngredients) => {
      return levelIngredients.ingredients.some((ingredient) => {
        return "type" in ingredient && getMaterialIdFromIngredient(ingredient, weapon) === material.id
      })
    })
  }))
})
</script>
