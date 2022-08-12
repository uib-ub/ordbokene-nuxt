

<script setup lang="ts">
import { useSearchStore } from '~/stores/searchStore'
const store = useSearchStore()
</script>

<template>
  <div>
    <h1>Ordbøkene</h1>
    PINIA: {{store.$state}}
    
    <SearchForm @submit="store.submit"/>
    
    <NuxtLink to="/bm/search">
      <SearchResults />
    </NuxtLink><br>
    <article><NuxtLink to="/about">
      About page
    </NuxtLink></article>



  </div>
</template>