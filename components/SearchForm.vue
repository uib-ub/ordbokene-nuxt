<template>
<div class="py-1">
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
  if (store.input) {
    console.log("SUBMITTED")
    store.show_autocomplete = false
    store.autocomplete_suggestions = store.autocomplete
    console.log("")
    //let url = '/' + store.dict
    //url += '/search?q='+store.input
    store.q = store.input
    if (store.autocomplete_suggestions.exact && store.autocomplete_suggestions.exact[0][0].length == store.q.length) {
      if (store.q != store.autocomplete_suggestions.exact[0][0]) {
        store.originalInput = store.q
      }
      else {
        store.originalInput = ""
      }
      
      return navigateTo("/" + store.dict + "/" +  store.autocomplete_suggestions.exact[0][0])
    }
    else if (store.autocomplete_suggestions.inflect) {
      store.originalInput = store.q
      return navigateTo("/" + store.dict + "/" + store.autocomplete_suggestions.inflect[0][0])
    }
    else {
      store.originalInput = ""
      return navigateTo("/" + store.dict + "/" + store.q )
    }
    

    //return navigateTo(url)
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