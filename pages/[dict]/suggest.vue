<template>
      <div class="pb-1">
        
  <main>
    <div class="callout"><i class="bi-info-circle-fill" aria-hidden="true"/> <strong>{{store.q}}</strong> er ikke et oppslagsord i {{store.dict}}.</div>
    <SuggestResults v-if="suggestions" :suggestions="suggestions" :key="store.q"/>
  
  </main>
    </div>
  </template>
  
  <script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'

import { filterSuggestions } from '~/composables/helpers.ts'
const store = useStore()
const route = useRoute()

definePageMeta({
    middleware: 'search-middleware'
  })

const suggestions = ref()  

const { data: raw_suggest, refresh } = await useAsyncData(
    'suggest_'+ store.q, 
    () => $fetch(`https://odd.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eis`))

console.log(`https://odd.uib.no/opal/dev/api/suggest?q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eis`)
console.log("DATAVALUE", raw_suggest.value)
suggestions.value = filterSuggestions(raw_suggest, store.q)

watch(() => route.query, () =>  {
    console.log("RUNNING NEW SUGGEST")
    refresh()

})

watch(raw_suggest, (new_raw_suggest) => {
    console.log("NEW SUGGEST", new_raw_suggest)
    suggestions.value = filterSuggestions(raw_suggest, store.q)
})

  </script>