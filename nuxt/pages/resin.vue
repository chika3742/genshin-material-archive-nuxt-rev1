<template>
  <div>
    <!--suppress TypeScriptValidateTypes -->
    <v-text-field
      v-model="config.resinCount"
      class="mb-4"
      :label="$t('resinPage.currentResinCount')"
      :error-messages="error"
      style="max-width: 250px"
      suffix="/ 160"
      @update:model-value="onValueUpdate"
    />

    <client-only>
      <v-table style="max-width: 400px">
        <tbody>
          <tr>
            <td>{{ $t('resinPage.baseTime') }}</td>
            <td>{{ moment(config.resinBaseTime).format("MM/DD HH:mm") }}</td>
          </tr>
          <tr>
            <td>{{ $t('resinPage.fullReplenishmentTime') }}</td>
            <td>{{ getResinRecoveryTime(config.resinCount, moment(config.resinBaseTime))?.format("MM/DD HH:mm") ?? "--" }}</td>
          </tr>
          <tr>
            <td>{{ $t('resinPage.remainingTime') }}</td>
            <td>{{ remainingTimeString }}</td>
          </tr>
        </tbody>
      </v-table>
    </client-only>

    <div class="doc-container mt-4" v-html="marked.parse($t('resinPage.howToUse'))" />
  </div>
</template>

<script lang="ts" setup>
import moment from "moment"
import {marked} from "marked"
import {useConfigStore} from "~/store/config"
import {ref} from "#imports"

definePageMeta({
  title: "resin",
})

const config = useConfigStore()

const error = ref("")

const remainingTimeString = computed(() => {
  const remainingMinutes = getResinRecoveryRemainingMinutes(config.resinCount, moment(config.resinBaseTime))
  if (remainingMinutes === undefined || remainingMinutes < 0) {
    return "--"
  }
  return `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`
})

const onValueUpdate = (value: string) => {
  const intValue = Number(value)
  if (isNaN(intValue) || intValue < 0 || intValue > 160) {
    error.value = "0 ~ 160の範囲で入力してください"
    return
  }
  error.value = ""
  config.resinBaseTime = new Date().getTime()
}
</script>
