<template>
<div class="my-2 md:my-6">
<form  @submit.prevent="submitForm" ref="form">
<NuxtErrorBoundary @error="autocomplete_error">
  <Autocomplete v-on:dropdown-submit="submitForm"/>
</NuxtErrorBoundary>

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

const autocomplete_error = (error) => {
  console.log(error)
}

</script>

<style lang="scss">

@screen md {
  form {
    @apply mx-10
  }
}

</style>