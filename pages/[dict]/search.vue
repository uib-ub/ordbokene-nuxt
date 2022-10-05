<template>
  </template>
  
  <script setup>
  // pick main component: word, article or search
  import { useStore } from '~/stores/searchStore'
  const store = useStore()
  
  definePageMeta({
    middleware: 'dict-middleware'
  })
  </script>