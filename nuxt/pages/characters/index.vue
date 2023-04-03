<template>
  <div>
    <v-row style="gap: 16px" no-gutters>
      <v-btn prepend-icon="ms:sort">
        {{ $t("common.sort") }}
        <v-menu activator="parent">
          <v-list v-model:selected="sort" select-strategy="single-independent">
            <v-list-item
              v-for="item in sortOrderOptions"
              :key="item"
              :title="$t(`charactersPage.sortOptions.${item}`)"
              :value="item"
            />
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn
        prepend-icon="ms:filter_alt"
        :color="Object.values(filter).some(e => e[0]) ? 'orange-darken-3' : undefined"
      >
        {{ $t("common.filter") }}
        <v-menu activator="parent" :close-on-content-click="false">
          <v-card>
            <v-row class="filter-options" no-gutters>
              <div>
                <h4>{{ $t("charactersPage.filterOptions.element") }}</h4>
                <v-list v-model:selected="filter.element">
                  <v-list-item v-for="item in elements" :key="item" class="justify-center" :value="item">
                    <v-img
                      :src="getElementImage(item)"
                      width="30px"
                      height="30px"
                      :style="`filter: brightness(${$vuetify.theme.global.name === 'light' ? '0' : '1'})`"
                    />
                  </v-list-item>
                </v-list>
              </div>
              <v-divider vertical />
              <div>
                <h4>{{ $t("charactersPage.filterOptions.weaponType") }}</h4>
                <v-list v-model:selected="filter.weaponType">
                  <v-list-item
                    v-for="item in weaponTypes"
                    :key="item"
                    :value="item"
                    :title="$t(`weaponTypes.${item}`)"
                  />
                </v-list>
              </div>
              <v-divider vertical />
              <div>
                <h4>{{ $t("charactersPage.filterOptions.rarity") }}</h4>
                <v-list v-model:selected="filter.rarity">
                  <v-list-item v-for="item in rarityFilterOptions" :key="item" :value="item">
                    <v-row no-gutters>
                      <v-icon v-for="i of item" :key="i" color="star" size="18">
                        mdi-star
                      </v-icon>
                    </v-row>
                  </v-list-item>
                </v-list>
              </div>
            </v-row>
            <v-card-subtitle class="my-2" style="text-align: center">
              {{ $t("charactersPage.filterCancelHint", {interactionTypeText: isTouchDevice() ? $t("interactionType.tap") : $t("interactionType.click")}) }}
            </v-card-subtitle>
          </v-card>
        </v-menu>
      </v-btn>
    </v-row>

    <v-row class="mt-4" no-gutters style="gap: 16px" justify="space-evenly">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import {isTouchDevice} from "~/utils/is-touch-device"
import {computed, ref} from "#imports"
import {elements, GenshinElement, WeaponType, weaponTypes} from "~/types/strings"
import {getElementImage} from "~/utils/image-getters"
import originalCharacterList from "~/assets/data/characters.yaml"

definePageMeta({
  title: "characters",
  keepalive: true,
})

const i18n = useI18n()

const sortOrderOptions = ["default", "name", "element"] as const
const rarityFilterOptions = [4, 5] as const

const sort = ref<[typeof sortOrderOptions[number]]>(["default"])
const filter = ref<{
  element: [GenshinElement | undefined]
  weaponType: [WeaponType | undefined]
  rarity: [4 | 5 | undefined]
}>({
  element: [undefined],
  weaponType: [undefined],
  rarity: [undefined],
})

const characters = computed(() => {
  let result = [...originalCharacterList]

  if (filter.value.element[0]) {
    result = result.filter(e => e.element === filter.value.element[0])
  }

  if (filter.value.weaponType[0]) {
    result = result.filter(e => e.weaponType === filter.value.weaponType[0])
  }

  if (filter.value.rarity[0]) {
    result = result.filter(e => e.rarity === filter.value.rarity[0])
  }

  switch (sort.value[0]) {
    case "default":
      // do nothing
      break
    case "name":
      result = result.sort((a, b) => {
        if (i18n.locale.value === "ja") {
          return (a.yomi ?? i18n.t(`characters.${a.id}`)) > (b.yomi ?? i18n.t(`characters.${b.id}`)) ? 1 : -1
        } else {
          return i18n.t(`characters.${a.id}`) > i18n.t(`characters.${b.id}`) ? 1 : -1
        }
      })
      break
    case "element":
      result = result.sort((a, b) => elements.indexOf(a.element) - elements.indexOf(b.element))
  }

  return result
})

</script>

<style lang="sass" scoped>
.filter-options
  & > div
    flex-grow: 1

    h4
      text-align: center
      padding: 8px 16px 0
</style>
