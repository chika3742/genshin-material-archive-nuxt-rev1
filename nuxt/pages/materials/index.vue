<template>
  <div>
    <v-list>
      <v-list-group v-for="materialList in materialGroups" :key="materialList[0].type">
        <template #activator="{props}">
          <v-list-item v-bind="props" :title="$t(`materialCategories.${materialList[0].type}`)">
            <template #prepend>
              <v-img :src="getMaterialImage(materialList[0].id)" aspect-ratio="1" class="mr-4" width="30" />
            </template>
          </v-list-item>
        </template>

        <v-list-item v-for="item in materialList" :key="item.id" :title="$t(`materials.${item.id}`)" :to="localePath(`/materials/${item.id}`)">
          <template #prepend>
            <v-img :src="getMaterialImage(item.id)" aspect-ratio="1" class="mr-4" width="30" />
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import {Material} from "~/types/generated/materials.g"
import materials from "~/assets/data/materials.yaml"
import {getWeaponImage} from "~/utils/image-getters"

definePageMeta({
  title: "materials",
})

const materialGroups = (() => {
  const groups: Material[][] = []
  for (const material of materials) {
    const group = groups.find(group => group[0].type === material.type)
    if (group) {
      group.push(material)
    } else {
      groups.push([material])
    }
  }
  return groups
})()
</script>
