<template>
  <v-list-item
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
</template>

<script lang="ts" setup>
import {getWeaponImage} from "~/utils/image-getters"
import {Weapon as _Weapon} from "~/types/generated/weapons.g"

defineProps<{
  weapon: _Weapon
}>()
</script>
