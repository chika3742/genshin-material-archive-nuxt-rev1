<template>
  <v-expansion-panel :title="title">
    <v-expansion-panel-text eager>
      <LevelSlider v-model="range" :slider-ticks="sliderTicks" />
      <MaterialCards
        :ingredients="ingredients"
        :range="range"
        class="mt-2"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import {LevelIngredients} from "~/types/generated/character-ingredients.g"
import MaterialCards from "~/components/material-cards.vue"
import {BookmarkableIngredient} from "~/types/bookmarkable-ingredient"
import {TargetType} from "~/types/strings"
import characterIngredients from "~/assets/data/character-ingredients.yaml"
import weaponIngredients from "~/assets/data/weapon-ingredients.yaml"
import {Character} from "~/types/generated/characters.g"
import {Weapon} from "~/types/generated/weapons.g"

const props = defineProps<{
  title: string
  targetType: TargetType
  target: Character | Weapon
  rarity?: number
}>()

const levelIngredientsList = computed<LevelIngredients[]>(() => {
  switch (props.targetType) {
    case "character":
      return characterIngredients.ascension
    case "weapon":
      return weaponIngredients.find(e => e.rarity === props.rarity)!.levels
  }
})

const sliderTicks = computed(() => levelIngredientsListToSliderTicks(levelIngredientsList.value))

const range = ref([sliderTicks.value[0], sliderTicks.value.slice(-1)[0]])

const selectedLevelIngredientsList = computed(() => {
  return levelIngredientsList.value.filter(e => range.value[0] < e.level && e.level <= range.value[1])
})

const ingredients = computed<BookmarkableIngredient[]>(() => {
  return selectedLevelIngredientsList.value.map(e => e.ingredients.filter(f => getMaterialIdFromIngredient(f, props.target) !== null).map<BookmarkableIngredient>(f => ({
    id: getMaterialIdFromIngredient(f, props.target)!,
    quantity: f.quantity,
    level: e.level,
    targetType: props.targetType,
    targetId: props.target.id,
    purposeType: "ascension",
  }))).flat()
})
</script>
