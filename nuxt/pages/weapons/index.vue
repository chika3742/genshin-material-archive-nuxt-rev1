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

    <v-list class="mt-4" open-strategy="single">
      <v-list-group v-for="type in weaponTypes" :key="type">
        <template #activator="{props}">
          <v-list-item :title="$t(`weaponTypes.${type}`)" v-bind="props">
            <template #prepend>
              <v-img :src="getWeaponImage(dividedWeapons[type][0].id)" aspect-ratio="1" class="mr-4" width="30" />
            </template>
          </v-list-item>
        </template>

        <v-list-item
          v-for="weapon in dividedWeapons[type].filter(e => rarityFilter[0] === e.rarity || rarityFilter[0] === -1)"
          :key="weapon.id"
          :title="$t(`weapons.${weapon.id}`)"
          :to="localePath(`/weapons/${weapon.id}`)"
        >
          <template #prepend>
            <v-row align="center" no-gutters>
              <v-img :src="getWeaponImage(weapon.id)" aspect-ratio="1" class="mr-2" width="30" />
              <v-icon color="star" size="18" style="margin-right: 2px">
                mdi-star
              </v-icon>
              <span :class="{'mr-2': true, 'text-red': weapon.rarity === 5, 'text-orange': weapon.rarity === 4}">{{
                weapon.rarity
              }}</span>
            </v-row>
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "#imports"
import {weaponTypes} from "~/types/strings"
import {getWeaponImage} from "~/utils/image-getters"
import weapons from "~/assets/data/weapons.yaml"
import {Weapon} from "~/types/generated/weapons.g"

definePageMeta({
  title: "weapons",
})

const rarityFilterOptions = [-1, 5, 4, 3, 2, 1] as const
const dividedWeapons = (() => {
  const result: Record<string, Weapon[]> = {}

  for (const type of weaponTypes) {
    result[type] = weapons.filter(e => e.type === type).sort((a, b) => b.rarity - a.rarity)
  }

  return result
})()

const rarityFilter = ref<[typeof rarityFilterOptions[number]]>([-1])

</script>
