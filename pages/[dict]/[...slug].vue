<template>
  <div>
    <NuxtLink v-if="store.view == 'article' && store.searchUrl" class="back-link" :to="store.searchUrl"> <strong><i class="bi bi-arrow-left primary-text" aria-hidden="true"/></strong> {{$t('notifications.back')}}</NuxtLink>
<main>
  <ArticleView v-if="store.view == 'article'"/>
  <WordView v-if="store.view == 'word'"/>
  <SearchView v-if="store.view == 'search'"/>
  <SuggestResults v-if="store.view == 'suggest'"/>
</main>
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