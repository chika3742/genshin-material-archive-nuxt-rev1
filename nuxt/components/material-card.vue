<template>
  <v-card :v-slot:loader="false" color="card">
    <div class="py-2 px-3 d-flex align-center">
      <v-img :src="getMaterialImage(ingredients[0].id)" height="30" width="30" />
      <span class="ml-2 font-cairo" style="font-size: 1.2em">×{{ quantity }}</span>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {getMaterialImage} from "~/utils/image-getters"
import {BookmarkableIngredient} from "~/types/bookmarkable-ingredient"
import {computed} from "#imports"

const props = defineProps<{
  ingredients: BookmarkableIngredient[]
}>()

const quantity = computed(() => props.ingredients.reduce((acc, e) => acc + e.quantity, 0))
</script>
