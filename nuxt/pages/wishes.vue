<template>
  <div class="doc-container">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>{{ $t("wishesPage.aboutTitle") }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="marked.parse($t('wishesPage.about'))" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>{{ $t("wishesPage.howToGetUrl.windows.h") }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ol>
            <li>{{ $t("wishesPage.howToGetUrl.windows.s1") }}</li>
            <li>
              <span>{{ $t("wishesPage.howToGetUrl.windows.s2") }}</span>
              <div class="d-flex flex-nowrap align-center">
                <pre>
                  <code ref="windowsCommandCode">powershell -Command "iex ""&{$(irm https://gist.githubusercontent.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/702e34117b07294e6959928963b76cfdafdd94f3/getlink.ps1)} global"""</code>
                </pre>
                <v-btn class="ml-2" flat icon="ms:content_copy" @click="copyWindowsCommand" />
              </div>
            </li>
            <li>{{ $t("wishesPage.howToGetUrl.windows.s3") }}</li>
          </ol>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>{{ $t("wishesPage.howToGetUrl.ios.h") }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="marked.parse($t('wishesPage.howToGetUrl.ios.contents'))" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <client-only>
      <section>
        <h2>{{ $t("wishesPage.urlInput") }}</h2>
        <v-text-field
          v-model="url"
          :disabled="fetching"
          :error-messages="error"
          class="ma-2"
          clearable
          label="URL"
        />
        <div class="mb-4">
          <v-checkbox
            v-model="wishes.untilLatestRare"
            :disabled="wishes.wishes.length > 0 || fetching"
            :label="$t('wishesPage.getUntilLatestRare')"
            color="primary"
            density="compact"
            hide-details
          />
          <div style="font-size: 0.9em">
            {{ $t('wishesPage.getUntilLatestRareDesc') }}
          </div>
        </div>
        <v-row no-gutters style="gap: 16px">
          <v-spacer />
          <v-btn @click="clearWishes">
            {{ $t("wishesPage.clearWishes") }}
          </v-btn>
          <v-btn :loading="fetching" color="primary" @click="getWishes">
            {{ $t("wishesPage.getWishes") }}
          </v-btn>
        </v-row>
        <div v-show="fetching" class="mt-2" style="text-align: end">
          {{
            fetchedCount !== null ? i18n.t("wishesPage.progress", {count: fetchedCount}) : $t('wishesPage.preparing')
          }}
        </div>
      </section>
    </client-only>

    <client-only>
      <section v-for="wishType in wishTypes" :key="wishType.type">
        <h2>{{ wishType.title }}</h2>
        <WishCounters
          :pseudo-pity-border="wishType.pseudoPityBorder"
          :single-prob="wishType.singleProb"
          :star5-pity="wishType.star5Pity"
          :wishes="wishes.wishes.filter(e => wishType.type === e.gachaType)"
          class="my-2"
        />
      </section>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import {doc, onSnapshot} from "@firebase/firestore"
import {marked} from "marked"
import {ref} from "#imports"
import {WishHistoryApi} from "~/libs/wish-history-api"
import {useConfigStore} from "~/store/config"
import {useWishesStore} from "~/store/wishes"
import {wishHistoryTicketConverter} from "~/utils/wish-history-ticket-converter"

marked.options({
  gfm: false,
})

definePageMeta({
  title: "wishes",
})

const config = useConfigStore()
const i18n = useI18n()
const wishes = useWishesStore()
const snackbar = useSnackbar()
const dialog = useDialog()
const {$functions, $firestore} = useNuxtApp()

const url = ref(config.wishHistoryUrl)
const error = ref("")
const fetchedCount = ref<number | null>(null)
const fetching = ref(false)
const windowsCommandCode = ref<HTMLElement>()

const wishTypes: {
  type: string
  title: string
  star5Pity: number
  pseudoPityBorder: number
  singleProb: number
}[] = [
  {
    type: "301",
    title: i18n.t("wishesPage.wishTypes.301"),
    star5Pity: 90,
    pseudoPityBorder: 73,
    singleProb: 0.006,
  },
  {
    type: "302",
    title: i18n.t("wishesPage.wishTypes.302"),
    star5Pity: 80,
    pseudoPityBorder: 63,
    singleProb: 0.007,
  },
  {
    type: "200",
    title: i18n.t("wishesPage.wishTypes.200"),
    star5Pity: 90,
    pseudoPityBorder: 73,
    singleProb: 0.006,
  },
]

const getWishes = () => {
  fetchedCount.value = null
  error.value = ""
  fetching.value = true

  const api = new WishHistoryApi($functions, url.value)

  api.createTicket(wishes.lastIds, wishes.untilLatestRare).then(() => {
    config.wishHistoryUrl = url.value

    registerStatusListener(api)
    return null
  }).catch((e) => {
    console.error(e)
    error.value = i18n.t("wishesPage.invalidUrl")
    fetching.value = false
  })
}

const clearWishes = () => {
  dialog.show(i18n.t("wishesPage.clearWishes"), i18n.t("wishesPage.clearWishesDialog"), () => {
    wishes.wishes.splice(0)
    snackbar.show(i18n.t("wishesPage.clearedWishes"))
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
        snackbar.show(i18n.t(`wishesPage.errors.${data.errorCode}`), "error")
        unsubscribe()
        break
    }
  })
}

const copyWindowsCommand = () => {
  window.navigator.clipboard.writeText(windowsCommandCode.value!.innerText)
  snackbar.show("コピーしました")
}
</script>
