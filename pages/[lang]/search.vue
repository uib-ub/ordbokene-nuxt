<template>
<div>
  <h1>Advanced search</h1>
  <NuxtLink to="/">
    Index page
  </NuxtLink>
  <br>
  {{$route.params}}
  {{$route.query}}
  her {{store.query}} hei
  PINIA: {{store.$state}}
</div>
</template>


<script setup lang="ts">
import { useStore } from '~/stores/searchStore'
const store = useStore()
</script>