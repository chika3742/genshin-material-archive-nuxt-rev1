<template>
  <div class="position-relative">
    <v-img :src="getCharacterImage(character.id, 'full')" max-width="100%" style="opacity: 0.6" width="300px" />

    <div class="mt-n8">
      <v-expansion-panels mandatory="force">
        <SliderPanel
          :target-id="character.id"
          :title="$t('characterDetailsPage.ascension.title')"
          target-type="character"
        />
        <TalentSliderPanel :character-id="character.id" :title="$t('characterDetailsPage.talent.title')" />
      </v-expansion-panels>
    </div>
  </div>
</template>

<script lang="ts" setup>
import _characters from "~/assets/data/characters.yaml"
import TalentSliderPanel from "~/components/talent-slider-panel.vue"

definePageMeta({
  title: "characters__characterId",
})

const route = useRoute()

if (!_characters.some(e => e.id === route.params.characterId)) {
  throw createError({statusCode: 404, message: "character not found"})
}

const character = _characters.find(e => e.id === route.params.characterId)!

</script>
