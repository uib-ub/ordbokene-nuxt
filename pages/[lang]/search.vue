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
</div>
</template>


<script setup lang="ts">
import { useSearchStore } from '~/stores/searchStore'
const store = useSearchStore()
</script>