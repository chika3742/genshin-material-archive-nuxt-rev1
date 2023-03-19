<template>
  <div class="doc-container">
    <section>
      <h2>{{ $t("about.settings.heading") }}</h2>
    </section>

    <section v-html="marked.parse($t('about.feedback'))" />

    <section>
      <div v-html="marked.parse($t('about.buyMeCoffee'), )" />
      <a href="https://ko-fi.com/F2F26RSKD" target="_blank"><img
        alt="Buy Me a Coffee at ko-fi.com"
        height="36"
        src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
        style="border:0;height:36px;"
      ></a>
    </section>

    <section>
      <div v-html="marked.parse($t('about.aboutDeveloper'))" />
      <v-row class="mt-2" no-gutters style="gap: 8px">
        <v-btn href="https://chikach.net/about" icon="mdi-web" target="_blank" />
        <v-btn href="https://www.youtube.com/@chikach3742" icon="mdi-youtube" target="_blank" />
        <v-btn href="https://twitter.com/chikavoid" icon="mdi-twitter" target="_blank" />
      </v-row>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {marked} from "marked"

const renderer = new marked.Renderer()
renderer.link = (href, _, text) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
}

marked.setOptions({
  renderer,
})

definePageMeta({
  title: "about",
})
</script>
