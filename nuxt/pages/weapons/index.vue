<template>
  <div>
    <v-btn prepend-icon="ms:filter_alt">
      {{ $t("common.filter") }}
      <!-- avoid node mismatch error -->
      <client-only>
        <v-menu activator="parent">
          <v-list v-model:selected="rarityFilter" mandatory select-strategy="single-independent">
            <v-list-item
              v-for="item in rarityFilterOptions"
              :key="item"
              :value="item"
            >
              <v-list-item-title v-if="item === -1">
                {{ $t("weaponsPage.filterOptions.none") }}
              </v-list-item-title>
              <v-row v-else no-gutters>
                <v-icon v-for="i of item" :key="i" color="star" size="18">
                  mdi-star
                </v-icon>
              </v-row>
            </v-list-item>
          </v-list>
        </v-menu>
      </client-only>
    </v-btn>

    <v-list class="mt-4">
      <v-list-group v-for="weaponList in separatedWeapons" :key="weaponList[0].type">
        <template #activator="{props}">
          <v-list-item :title="$t(`weaponTypes.${weaponList[0].type}`)" v-bind="props">
            <template #prepend>
              <v-img :src="getWeaponImage(weaponList[0].id)" aspect-ratio="1" class="mr-4" width="30" />
            </template>
          </v-list-item>
        </template>

        <WeaponListItem
          v-for="weapon in weaponList.filter(e => rarityFilter[0] === e.rarity || rarityFilter[0] === -1)"
          :key="weapon.id"
          :weapon="weapon"
        />
      </v-list-group>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "#imports"
import {weaponTypes} from "~/types/strings"
import {getWeaponImage} from "~/utils/image-getters"
import weapons from "~/assets/data/weapons.yaml"
import WeaponListItem from "~/components/weapon-list-item.vue"

definePageMeta({
  title: "weapons",
})

const rarityFilterOptions = [-1, 5, 4, 3, 2, 1] as const

const rarityFilter = ref<[typeof rarityFilterOptions[number]]>([-1])

const separatedWeapons = computed(() => {
  return separateAndSortWeapons(weapons)
})

</script>
