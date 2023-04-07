<template>
  <v-card :v-slot:loader="false" color="card" :to="localePath(`/materials/${ingredients[0].id}`)">
    <div class="py-2 px-3 d-flex align-center">
      <v-img :src="getMaterialImage(ingredients[0].id)" height="30" width="30" />
      <span class="ml-2 font-cairo" style="font-size: 1.2em">×{{ quantity }}</span>
    </div>

    <!-- avoid node mismatch error -->
    <client-only>
      <v-tooltip activator="parent" location="bottom" :open-delay="100">
        <span>{{ $t(`materials.${ingredients[0].id}`) }}</span>
      </v-tooltip>
    </client-only>
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
