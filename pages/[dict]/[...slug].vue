<template>
  <div>
    <div class="pb-1">
      <NuxtLink v-if="store.view == 'article' && store.searchUrl" class="back-link" :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" color="primary"/></strong> {{$t('notifications.back')}}</NuxtLink></div>
<main id="main" tabindex="-1">
  
  <ArticleView v-if="store.view == 'article'"/>
  <WordView v-if="store.view == 'word'"/>
  <Results v-if="store.view != 'article'"/>

</main>
  </div>
</template>

<script setup>
// pick main component: word, article or search
import { useStore } from '~/stores/searchStore'
const store = useStore()

useHead({
  title: store.q
  })

definePageMeta({
  middleware: 'dict-middleware'
})
</script>