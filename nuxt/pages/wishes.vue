<template>
  <div class="doc-container">
    <section>
      <h2>{{ $t("wishesPage.urlInput") }}</h2>
      <v-text-field
        v-model="url"
        class="ma-2"
        label="URL"
        :disabled="fetching"
        :error-messages="error"
        clearable
      />
      <v-row no-gutters style="gap: 16px">
        <v-spacer />
        <v-btn>{{ $t("wishesPage.clearWishes") }}</v-btn>
        <v-btn color="primary" :loading="fetching" @click="getWishes">
          {{ $t("wishesPage.getWishes") }}
        </v-btn>
      </v-row>
      <div v-show="fetching" class="mt-2" style="text-align: end">
        {{ i18n.t("wishesPage.progress", {count: fetchedCount}) }}
      </div>
    </section>

    <section>
      <h2>{{ $t("wishesPage.") }}</h2>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {doc, onSnapshot} from "@firebase/firestore"
import {ref} from "#imports"
import {WishHistoryApi} from "~/libs/wish-history-api"
import {useConfigStore} from "~/store/config"
import {useWishesStore} from "~/store/wishes"
import {wishHistoryTicketConverter} from "~/utils/wish-history-ticket-converter"

definePageMeta({
  title: "wishes",
})

const config = useConfigStore()
const i18n = useI18n()
const wishes = useWishesStore()
const snackbar = useSnackbar()
const {$functions, $firestore} = useNuxtApp()

const url = ref(config.wishHistoryUrl)
const error = ref("")
const fetchedCount = ref(0)
const fetching = ref(false)

const wishTypes: {
  id: string
  title: string
} = [
  {
    id: "301",
    title: i18n.t("wishesPage.wishType.301"),
  },
  {
    id: "302",
    title: i18n.t("wishesPage.wishType.302"),
  },
  {
    id: "200",
    title: i18n.t("wishesPage.wishType.200"),
  },
]

const getWishes = async() => {
  fetchedCount.value = 0
  error.value = ""
  fetching.value = true

  const api = new WishHistoryApi($functions, url.value)

  api.createTicket(wishes.lastIds).then(() => {
    config.wishHistoryUrl = url.value

    registerStatusListener(api)
    return null
  }).catch((e) => {
    console.error(e)
    error.value = i18n.t("wishesPage.invalidUrl")
    fetching.value = false
  })
}

const registerStatusListener = (api: WishHistoryApi) => {
  const ticketDoc = doc($firestore, "wishHistoryTickets", api.currentTicket!).withConverter(wishHistoryTicketConverter)

  const unsubscribe = onSnapshot(ticketDoc, (snapshot) => {
    const data = snapshot.data()

    if (!data) {
      return
    }

    switch (data.status) {
      case "processing":
        fetchedCount.value = data.count
        break

      case "done":
        wishes.wishes.push(...data.result!)
        fetching.value = false
        unsubscribe()

        if (data.result!.length === 0) {
          snackbar.show(i18n.t("wishesPage.noNewWishes"))
        }
        break

      case "error":
        fetching.value = false
        snackbar.show(i18n.t("wishesPage.error"), "error")
        unsubscribe()
        break
    }
  })
}

const registerStatusInterval = (api: WishHistoryApi) => {
  const timer = setInterval(async() => {
    const status = await api.getStatus()

    switch (status.status) {
      case "processing":
        fetchedCount.value = status.count
        break

      case "done":
        wishes.wishes.push(...status.result!)
        fetching.value = false
        clearInterval(timer)

        if (status.result!.length === 0) {
          snackbar.show(i18n.t("wishesPage.noNewWishes"))
        }
        break

      case "error":
        fetching.value = false
        snackbar.show(i18n.t("wishesPage.error"), "error")
        clearInterval(timer)
        break
    }
  }, 2000)
}
</script>
