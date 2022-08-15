

<script setup>
import { useSearchStore } from '~/stores/searchStore'
const store = useSearchStore()

const { data: welcome_bm } = await useFetch(() => `https://oda.uib.no/opal/dev/bm/parameters.json`)
const { data: welcome_nn } = await useFetch(() => `https://oda.uib.no/opal/dev/nn/parameters.json`)

</script>

<template>
  <div>
    <h1>Ordbøkene</h1>
    PINIA: {{store.$state}}
    
    <SearchForm @submit="store.submit"/>
    

  <main>
      <Article :article_id="welcome_nn.front_article.value"></Article>
      <Article :article_id="welcome_bm.front_article.value"></Article>
  </main>

  </div>
  
</template>