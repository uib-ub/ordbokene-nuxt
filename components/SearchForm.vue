<template>
<div class="row my-3">
<form  @submit.prevent="submitForm" ref="form">

  <Autocomplete v-on:submit="submitForm"/>

</form>
</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const submitForm = async (item) => {
  store.autocomplete = [] 
  let url = '/' + store.dict
  
  if (store.input) {
    url += '/search?q='+store.input
    store.q = store.input
  }
  return navigateTo(url)
}

</script>
