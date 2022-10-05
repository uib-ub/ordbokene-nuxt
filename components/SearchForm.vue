<template>
<div class="my-3">
<form  @submit.prevent="submitForm" ref="form">
  <div class="input-group p-md-1" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete v-on:submit="submitForm"/>
  <button :aria-label="$t('search')" class="btn btn-outline-primary rounded-pill"> <BootstrapIcon icon="bi-search" class="input-group-text"/></button>
  </div>
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

<style scoped>
.input-group{
  outline: solid 1px var(--bs-primary);
  border-radius: 2rem;
  background-color: white;
  flex-wrap: unset;
}
.input-group:focus-within{
  box-shadow: 2px 2px 1px var(--bs-primary);
} 
.activeAutocomplete{
  border-radius: 1rem 1rem 0 0;
}

.dropdown-menu{
  border: solid 1px var(--bs-primary);
  box-shadow: 1.5px 1.5px 1px var(--bs-primary);
}
.dict-button {
  border: none;
  border-right: solid 1px var(--bs-primary);
  height: 100%;
  border-radius: 2rem 0 0 2rem;
}

.btn:hover,.btn:focus{
  background-color: white;
  color: var(--bs-primary);
}
.rounded-pill{
  border: none;
}

.input-group-text{
  color: var(--bs-primary);
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0.3rem 0 0.3rem 0.5rem;
  font-size: 1.3rem;
}
</style>
