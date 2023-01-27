<template>
  <div class="md:mx-10">
      <NuxtLink v-if="store.view == 'article' && store.searchUrl" class="back-link pb-1 border-none" :to="store.searchUrl"> <strong><Icon name="bi:arrow-left" size="1.25em" class="mb-1 text-primary"/></strong> {{$t('notifications.back')}}</NuxtLink>

  <ArticleView v-if="store.view == 'article'"/>
  <WordView v-if="store.view == 'word'"/>
  <Results v-if="store.view != 'article'"/>

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
  middleware: ['endpoint-middleware', 'dict-middleware']
})
</script>