

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
    PENDING{{nn_pending}}
    PINIA: {{store.$state}}
    
    <SearchForm @submit="store.submit"/>
    

  <main>
    <div v-if="bm_pending || nn_pending">
    <h1>WAITING</h1>
  
    </div>
    <div v-else>
      <Article :article_id="welcome_nn.front_article.value"></Article>
      <Article :article_id="welcome_bm.front_article.value"></Article>
    </div>
  </main>

  </div>
  
</template>