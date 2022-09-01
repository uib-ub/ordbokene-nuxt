<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

definePageMeta({
  middleware: 'search-middleware'
})


const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
    useLazyAsyncData('welcome_bm', () => $fetch('https://oda.uib.no/opal/dev/bm/parameters.json')),
    useLazyAsyncData('welcome_nn', () => $fetch('https://oda.uib.no/opal/dev/nn/parameters.json'))
  ])





</script>

<template>
  <div>
  <main>
    <div class="row" v-if="welcome_bm && welcome_nn">
      <div class="col-lg">
      <Article :article_id="welcome_bm.front_article.value" dict="bm"/>
      <Article :article_id="'60484'" dict="bm"/>
      <Article :article_id="'60494'" dict="bm"/>
      </div>
      <div class="col-lg">
      <Article :article_id="welcome_nn.front_article.value" dict="nn"/>
      <Article :article_id="'78569'" dict="nn"/>
      <Article :article_id="'78586'" dict="nn"/>
      </div>
    </div>
        <div v-else>
    <h1>WAITING</h1>
  
    </div>
  </main>

  </div>
  
</template>
