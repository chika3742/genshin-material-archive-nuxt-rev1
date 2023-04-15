<template>
  <v-row class="cards" no-gutters style="gap: 16px">
    <v-card>
      <div class="card">
        <h4>{{ i18n.t("wishesPage.pityCount", {star: "5"}) }}</h4>
        <div class="card__content">
          <span
            :class="pityInfo[5].count > pseudoPityBorder
              ? 'text-red' : pityInfo[5].count > pseudoPityBorder - 10
                ? 'text-orange-darken-2' : ''"
          >{{ pityInfo[5].count }}</span> / {{ star5Pity }}
        </div>
      </div>
      <div class="card__bar card__bar--rank5" />
    </v-card>

    <v-card>
      <div class="card">
        <h4>{{ i18n.t("wishesPage.lastPulled", {star: "5"}) }}</h4>
        <div class="card__content">
          {{ $t(pityInfo[5].lastPulled) }}
        </div>
      </div>
      <div class="card__bar card__bar--rank5" />
    </v-card>

    <v-card>
      <div class="card">
        <h4>{{ i18n.t("wishesPage.pityCount", {star: "4"}) }}</h4>
        <div class="card__content">
          <span>{{ pityInfo[4].count }}</span> / {{ star4Pity }}
        </div>
      </div>
      <div class="card__bar card__bar--rank4" />
    </v-card>

    <v-card>
      <div class="card">
        <h4>{{ i18n.t("wishesPage.lastPulled", {star: "4"}) }}</h4>
        <div class="card__content">
          {{ $t(pityInfo[4].lastPulled) }}
        </div>
      </div>
      <div class="card__bar card__bar--rank4" />
    </v-card>

    <v-card>
      <div class="card">
        <h4>{{ i18n.t("wishesPage.prob") }}</h4>
        <div class="card__content">
          <span>{{ (rank5Prob * 100).toFixed(2) }}</span>%
        </div>
      </div>
      <div class="card__bar card__bar--rank5" />
    </v-card>
  </v-row>
</template>

<script lang="ts" setup>
import {Wish} from "#shared/wish"
import characters from "~/assets/data/characters.yaml"
import weapons from "~/assets/data/weapons.yaml"

const props = defineProps<{
  wishes: Wish[]
  star5Pity: number
  singleProb: number
  pseudoPityBorder: number
}>()

const i18n = useI18n()

const star4Pity = 10

const pityInfo = computed<Record<number, { count: number, lastPulled: string }>>(() => {
  const pityInfo: Record<number, { count: number, lastPulled: string }> = {
    5: {
      count: 0,
      lastPulled: "-",
    },
    4: {
      count: 0,
      lastPulled: "-",
    },
  }

  for (let i = 0; i < props.wishes.length; i++) {
    const wish = props.wishes[props.wishes.length - 1 - i]

    if (pityInfo[5].count === 0 && wish.rankType === "5") {
      pityInfo[5] = {
        count: i + 1,
        lastPulled: getItemNameI18nKey(wish),
      }
    } else if (pityInfo[4].count === 0 && wish.rankType === "4") {
      pityInfo[4] = {
        count: i + 1,
        lastPulled: getItemNameI18nKey(wish),
      }
    }

    if (pityInfo[5].count !== 0 && pityInfo[4].count !== 0) {
      break
    }
  }

  return pityInfo
})

const getItemNameI18nKey = (wish: Wish) => {
  switch (wish.itemType) {
    case "キャラクター":
      return `characters.${characters.find(e => e.nameJP === wish.name)?.id}`
    case "武器":
      return `weapons.${weapons.find(e => e.nameJP === wish.name)?.id}`
  }
}

const rank5Prob = computed(() => {
  const trial = pityInfo.value[5].count + 10

  if (trial <= props.pseudoPityBorder) {
    return 1 - Math.pow(1 - props.singleProb, trial)
  } else {
    let prob = Math.pow(1 - props.singleProb, props.pseudoPityBorder)
    for (let i = 1; i <= trial - props.pseudoPityBorder; i++) {
      prob *= 1 - (0.06 * i)
    }
    return 1 - prob
  }
})

</script>

<style lang="sass" scoped>
.cards
  .card
    padding: 8px 16px

    h4
      font-weight: normal
      font-size: 0.9rem

    &__content
      text-align: center
      font-size: 1.1rem
      font-weight: bold
      margin-top: 4px

      span
        font-size: 1.8rem
        margin-right: 4px
        font-family: "Cairo", "M PLUS 2", sans-serif

    &__bar
      height: 4px
      width: 100%
      position: absolute
      bottom: 0

      &--rank5
        background-color: rgb(var(--v-theme-rank5))

      &--rank4
        background-color: rgb(var(--v-theme-rank4))
</style>
