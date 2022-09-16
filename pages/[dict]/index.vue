<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

definePageMeta({
  middleware: 'search-middleware'
})


const [{ bm_pending, data: welcome_bm },  { nn_pending, data: welcome_nn }] = await Promise.all([
    useLazyAsyncData('welcome_bm', () => $fetch('https://odd.uib.no/opal/dev/bm/parameters.json')),
    useLazyAsyncData('welcome_nn', () => $fetch('https://odd.uib.no/opal/dev/nn/parameters.json'))
  ])

</script>

<template>

  <main class="m-lg-5 p-lg-5">
    <div class="row" v-if="welcome_bm && welcome_nn">
      <div class="col-lg">
      <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm"/>
      </div>
      <div class="col-lg">
      <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn"/>
      </div>
    </div>
        <div v-else>
    <h1>WAITING</h1>
  
    </div>
  </main> 
</template>
