

<script setup>
import { useSearchStore } from '~/stores/searchStore'
const store = useSearchStore()

const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
    useLazyAsyncData('welcome_bm', () => $fetch('https://oda.uib.no/opal/dev/bm/parameters.json')),
    useLazyAsyncData('welcome_nn', () => $fetch('https://oda.uib.no/opal/dev/nn/parameters.json'))
  ])



</script>

<template>
  <div>
    <h1>Ordbøkene</h1>
   
    PINIA: {{store.$state}}
    
    <SearchForm @submit="store.submit"/>

    NN: {{welcome_nn}}<br>
    BM: {{welcome_bm}}
    

  <main>

    <div v-if="welcome_bm || welcome_nn">
      <Article :article_id="welcome_nn.front_article.value"></Article>
      <Article :article_id="welcome_bm.front_article.value"></Article>
    </div>
        <div v-else>
    <h1>WAITING</h1>
  
    </div>
  </main>

  </div>
  
</template>