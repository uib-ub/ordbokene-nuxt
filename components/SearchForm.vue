<template>
<div class="my-3">
<form class="input-group active p-md-2" :class="{activeAutocomplete: store.autocomplete.length}" @submit.prevent="submitForm" ref="form">
<select class="dropdown-toggle btn btn-outline-primary" v-model="store.$state.dict">
  <option v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx" :value="item" name="dict">{{$t(`dicts.${item}`)}}</option>
</select>
  <Autocomplete v-on:submit="submitForm"/>
  <button :aria-label="$t('search')" class="btn rounded-pill"> <i class="bi bi-search input-group-text" aria-hidden="true"/></button>
</form>

</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const submitForm = (item) => {
  store.autocomplete = []
  
  if (store.selected && store.selected.q && store.selected.q != store.q) {
    //TODO: logging in plausible
    store.q = store.selected.q
  }


  if (store.selected.type == "word") {
    let searchUrl = '/'+store.dict+'/'+store.q
    console.log("SUBMITTING", item)
    store.searchUrl = searchUrl
    navigateTo(searchUrl, { replace: true })
  }
  
  if (store.selected.type == "empty") {
    console.log("SHOW SUGGESTIONS")
  }
  
  
}

</script>

<style scoped>

.input-group{
  outline: solid 1px var(--bs-primary);
  border-radius: 2rem;
  background-color: white;
  flex-wrap: unset;
}
.active:focus-within{
  box-shadow: 2px 2px 1px var(--bs-primary);
} 
.activeAutocomplete{
  border-radius: 1rem 1rem 0 0;
}

.btn-outline-primary{
  border: none;
  border-right: solid 1px var(--bs-primary);
}
.btn{
  border-radius: 2rem 0 0 2rem;
}
.btn:hover,.btn:focus{
  background-color: white;
  color: var(--bs-primary);
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
