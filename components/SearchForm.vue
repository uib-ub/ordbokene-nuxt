<template>
<div class="py-1">
<form>
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
  // Submit fuction for dropdown selection. Remove?
  if (store.input) {
    console.log("SUBMITTED")
    store.show_autocomplete = false
    //store.autocomplete_suggestions = store.autocomplete
    console.log("")
    let url = '/' + store.dict
    url += '?q='+store.input
    store.q = store.input

    return navigateTo(url)
  }
  
}

const autocomplete_error = (error) => {
  console.log(error)
}

</script>

<style scoped lang="scss">


form {
    @apply md:mx-10;
  }

.welcome form {
  @apply md:mx-0;
}

  

</style>