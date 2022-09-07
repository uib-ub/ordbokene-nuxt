<template>
<div>
  <ArticleView v-if="store.view == 'article'"/>
  <WordView v-if="store.view == 'word'"/>
  <SearchView v-if="store.view == 'search'"/>
  <SuggestResults v-if="store.view == 'suggest'" :key ="store.q"/>

  {{$route.params}}
  {{$route.query}}
  <br>
  {{$route.name}}<br>
  {{store.suggest}}
</div>
</template>

<script setup>
// pick main component: word, article or search
import { useStore } from '~/stores/searchStore'
const store = useStore()

definePageMeta({
  middleware: 'search-middleware'
})
</script>