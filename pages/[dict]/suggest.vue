<template>
      <div class="pb-1">
        
  
    <div class="callout"><BootstrapIcon icon="bi-info-circle-fill" left/> <strong>{{store.q}}</strong> er ikke et oppslagsord i {{store.dict}}.</div>
    <SuggestResults v-if="suggestions" :suggestions="suggestions" :key="store.q"/>
  

    </div>
  </template>
  
  <script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'

import { filterSuggestions } from '~/composables/helpers.ts'
const store = useStore()
const route = useRoute()

definePageMeta({
  middleware: ['endpoint-middleware', 'dict-middleware']
  })

const suggestions = ref()  

const { data: raw_suggest, refresh } = await useAsyncData(
    'suggest_'+ store.q + "_" + store.dict, 
    () => $fetch(`${store.endpoint}api/suggest?&q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eis`))

suggestions.value = filterSuggestions(raw_suggest.value, store.q)

watch(() => route.query, () =>  {
    refresh()

})

watch(raw_suggest, (new_raw_suggest) => {
    suggestions.value = filterSuggestions(raw_suggest.value, store.q)
})

  </script>