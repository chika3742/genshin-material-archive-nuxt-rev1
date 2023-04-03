<template>
  <v-row no-gutters style="gap: 16px">
    <MaterialCard v-for="(item, i) in mergeIngredients(ingredients)" :key="i" :ingredients="item" />
  </v-row>
</template>

<script lang="ts" setup>
import {mergeIngredients} from "~/utils/merge-ingredients"
import {BookmarkableIngredient} from "~/types/bookmarkable-ingredient"

defineProps<{
  ingredients: BookmarkableIngredient[]
}>()

</script>
