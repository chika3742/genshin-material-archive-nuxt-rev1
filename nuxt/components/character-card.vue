<template>
  <v-card :to="localePath(character.path)" :v-slot:loader="false" class="character-card">
    <v-img :src="character.elementImageUrl" class="character-card__element" />
    <v-img
      :src="character.imageUrl"
      :style="`filter: brightness(${$vuetify.theme.name === 'dark' ? '0.8' : '1'})`"
    />
    <span class="font-kaisei-opti">{{ character.name }}</span>
  </v-card>
</template>

<script lang="ts" setup>
import {ExtractedCharacter} from "~/types/extracted-character"

defineProps<{
  character: ExtractedCharacter
}>()

</script>

<style lang="sass" scoped>
.character-card
  aspect-ratio: 2 / 1
  max-width: 250px
  width: calc(50% - 16px)

  &__element
    position: absolute
    right: 12%
    top: 20%
    bottom: 20%
    aspect-ratio: 1
    opacity: 0.7
    background-size: cover
    filter: brightness(0.5)

  span
    position: absolute
    bottom: 0
    left: 0
    padding: 4px 16px
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0))
    font-size: 1.3rem
    color: white
    text-shadow: 0 0 4px black

    @media (max-width: 450px)
      font-size: 1em
      padding: 2px 8px

</style>
