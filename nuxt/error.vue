<template>
  <div class="ma-4">
    <h1>{{ error.statusCode }} {{ error.statusMessage }}</h1>
    <p>{{ error.message }}</p>
    <v-btn class="mt-4" @click="handleError">
      {{ $t("common.backToHome") }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import {NuxtError} from "#app"

defineProps<{
  error: NuxtError
}>()

const localePath = useLocalePath()

const handleError = () => {
  clearError({redirect: localePath("/")})
}
</script>
