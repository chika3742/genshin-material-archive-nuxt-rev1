<template>
  <v-card class="character-card">
    <v-img :src="getCharacterImage(character.id, 'full')" :style="`filter: brightness(${$vuetify.theme.name === 'dark' ? '0.8' : '1'})`" />
    <span class="font-kaisei-opti">{{ $t(`characters.${character.id}`) }}</span>
  </v-card>
</template>

<script lang="ts" setup>
import {getCharacterImage, getElementImage} from "~/utils/image-getters"
import {Character} from "~/types/generated/characters.g"

const props = defineProps<{
  character: Character
}>()

const elementImageCss = computed(() => {
  return `url(${getElementImage(props.character.element)})`
})

</script>

<style lang="sass" scoped>
.character-card
  aspect-ratio: 2 / 1
  max-width: 250px
  width: calc(50% - 16px)

  &::before
    content: ""
    background-image: v-bind(elementImageCss)
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
    font-weight: bold
    color: white
    text-shadow: 0 0 4px black

    @media (max-width: 450px)
      font-size: 1em
      padding: 2px 8px

</style>
