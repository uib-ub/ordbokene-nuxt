<template>
    <div>
      <div class="pb-1">
        <NuxtLink v-if="store.view == 'article' && store.searchUrl" class="back-link" :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" color="primary"/></strong> {{$t('notifications.back')}}</NuxtLink></div>
        <main>
    
    <Results/>
  
  </main>
    </div>
  </template>
  
  <script setup>
  // pick main component: word, article or search
  import { useStore } from '~/stores/searchStore'
  const store = useStore()
  
  definePageMeta({
    middleware: 'search-middleware'
  })
  </script>