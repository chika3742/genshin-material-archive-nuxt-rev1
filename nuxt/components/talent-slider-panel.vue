<template>
  <v-expansion-panel :title="title">
    <v-expansion-panel-text eager>
      <div class="d-flex flex-column sliders-container" style="gap: 8px">
        <section v-for="(item, i) in sliders" :key="i">
          <v-row align="center" no-gutters>
            <v-checkbox-btn v-model="checkedList[i]" />
            <h4 :class="{thin: !checkedList[i]}" style="transition: opacity 100ms ease">
              <span v-if="item.grayTitle">{{ item.grayTitle }}</span>{{ item.title }}
            </h4>
          </v-row>
          <LevelSlider
            v-model="ranges[i]"
            :class="{thin: !checkedList[i]}"
            :slider-ticks="levelIngredientsListToSliderTicks(item.levelIngredientsList)"
            style="transition: opacity 100ms ease"
          />
          <v-divider />
        </section>

        <MaterialCards :ingredients="ingredients" />
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import {computed, getMaterialIdFromIngredient, levelIngredientsListToSliderTicks, ref} from "#imports"
import characterIngredients from "~/assets/data/character-ingredients.yaml"
import {LevelIngredients} from "~/types/generated/character-ingredients.g"
import {BookmarkableIngredient} from "~/types/bookmarkable-ingredient"
import {PurposeType} from "~/types/strings"

const props = defineProps<{
  title: string
  characterId: string
}>()

interface Slider {
  title: string
  grayTitle?: string
  type: PurposeType
  levelIngredientsList: LevelIngredients[]
}

const i18n = useI18n()

const sliders: Slider[] = [
  {
    title: i18n.t(`talentNames.${props.characterId}.normal`),
    type: "normalAttack",
    levelIngredientsList: characterIngredients.normalAttack,
  },
  {
    title: i18n.t(`talentNames.${props.characterId}.skill`),
    grayTitle: i18n.t("characterDetailsPage.talent.elementalSkill"),
    type: "elementalSkill",
    levelIngredientsList: characterIngredients.elementalSkill,
  },
  {
    title: i18n.t(`talentNames.${props.characterId}.burst`),
    grayTitle: i18n.t("characterDetailsPage.talent.elementalBurst"),
    type: "elementalBurst",
    levelIngredientsList: characterIngredients.elementalBurst,
  },
]

const ranges = ref(sliders.map((e) => {
  const sliderTicks = levelIngredientsListToSliderTicks(e.levelIngredientsList)
  return [sliderTicks[0], sliderTicks.slice(-1)[0]]
}))

const checkedList = ref(sliders.map(() => true))

const ingredients = computed<BookmarkableIngredient[]>(() => {
  return sliders.map((e, i) => {
    if (!checkedList.value[i]) {
      return []
    }
    return e.levelIngredientsList.filter(f => ranges.value[i][0] < f.level && f.level <= ranges.value[i][1])
      .map(f => f.ingredients.filter(g => getMaterialIdFromIngredient(g, props.characterId) !== null).map<BookmarkableIngredient>(g => ({
        id: getMaterialIdFromIngredient(g, props.characterId)!,
        quantity: g.quantity,
        level: f.level,
        targetType: "character",
        targetId: props.characterId,
        purposeType: e.type,
      }))).flat()
  }).flat()
})

</script>

<style lang="sass" scoped>
.sliders-container
  h4
    color: rgb(var(--v-theme-primary))

    span
      color: rgb(var(--v-theme-surface-variant))

.thin
  opacity: 0.7
</style>
