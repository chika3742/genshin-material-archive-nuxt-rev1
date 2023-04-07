<template>
  <v-card :to="localePath(`/characters/${characterId}`)">
    <v-img :src="getCharacterImage(characterId, 'small')" width="70" aspect-ratio="1" />

    <!-- avoid node mismatch error -->
    <client-only>
      <v-tooltip activator="parent" location="bottom" :open-delay="100">
        <span>{{ $t(`characters.${characterId}`) }}</span>
      </v-tooltip>
    </client-only>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  characterId: string
}>()
</script>
