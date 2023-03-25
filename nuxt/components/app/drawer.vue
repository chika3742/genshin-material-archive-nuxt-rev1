<template>
  <v-navigation-drawer v-model="isOpen">
    <v-list nav>
      <template v-for="(item, i) in drawerItems">
        <v-list-item
          v-if="item !== '---'"
          :key="i"
          :href="item.href"
          :prepend-icon="item.icon"
          :target="item.target"
          :title="item.title ? $t(`navDrawer.${item.title}`) : $t(`pageTitle.${$router.resolve(item.to).meta.title}`)"
          :to="item.to ? localePath(item.to) : undefined"
          density="comfortable"
          @click="item.onClick?.(); isOpen = false"
        />
        <v-divider v-else :key="i * 2" class="mb-1" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDisplay} from "vuetify"
import {computed} from "#imports"

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const display = useDisplay()

const isOpen = computed({
  get() {
    return display.mobile.value ? props.modelValue : true
  },
  set(value: boolean) {
    emit("update:modelValue", value)
  },
})

interface DrawerItem {
  icon: string
  title?: string
  to?: string
  href?: string
  target?: string
  onClick?: () => void
}

type Divider = "---"

const drawerItems: (DrawerItem | Divider)[] = [
  {
    icon: "mdi-home",
    to: "/",
  },
  "---" as const,
  {
    icon: "mdi-account",
    to: "/characters",
  },
  "---" as const,
  {
    icon: "mdi-information",
    to: "/about",
  },
  {
    icon: "mdi-coffee",
    title: "buyMeCoffee",
    href: "https://ko-fi.com/chika3742",
    target: "gms-ko-fi",
  },
]
</script>
