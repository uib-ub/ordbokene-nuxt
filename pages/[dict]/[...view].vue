<template>
<div>
  <ArticleView v-if="store.view == 'article'"/>
  <WordView v-if="store.view == 'word'"/>
  <SearchView v-if="store.view == 'search'"/>

  {{route.params}}
  {{route.query}}
  {{route.name}}
</div>
</template>

<script setup>

// pick main component: word, article or search
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

console.log(route.params.view)

// Article lookup
if (/^[0-9]+$/.test(route.params.view[0])) {
  store.view = 'article'

}
else {
  // Simple search
  if (route.params.view[0] == 'search') {
    store.view = 'search'
  }
  else {
    store.view = 'word'
  }


  // advanced search

  let q = route.params.q || route.params.view[0]
  console.log("QUERY:", q)
}



const suggest = await $fetch('https://oda.uib.no/opal/dev/bm/parameters.json')





</script>