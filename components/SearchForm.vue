<template>
<div class="my-3">
<form class="input-group active p-md-2" :class="{activeAutocomplete: store.autocomplete.length}" @submit.prevent="submitForm" ref="form">
<select class="dropdown-toggle btn btn-outline-primary" @change="change_dict" v-model="store.$state.dict">
  <option v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx" :value="item" name="dict">{{$t(`dicts.${item}`)}}</option>
</select>
  <Autocomplete v-on:submit="submitForm"/>
  <button :aria-label="$t('search')" class="btn rounded-pill"> <i class="bi bi-search input-group-text" aria-hidden="true"/></button>
</form>

</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

async function submitForm(item) {
  store.autocomplete = []
  
    store.searchUrl = '/'+store.dict+'/'+store.input
    await navigateTo(store.searchUrl, { replace: true })
  
}

const change_dict = function(event) {
  
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
.autocomplete {
  outline: solid 1px var(--bs-primary);
  box-shadow: 2px 2px 1px var(--bs-primary);
  border-radius: 0 0 1rem 1rem;
  background-color: white;
  width: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
}

.dropdown-menu{
  padding: 0.5rem;
  border-color: var(--bs-primary);
  box-shadow: 2px 2px 1px var(--bs-primary);
  margin-top: 0.4rem !important;
}
.form-check-input:checked{
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
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
option:hover,option:focus{
  background-color: var(--bs-primary) !important;
  color: white !important;
}

.form-control{
  border: none;
  border-radius: 0 2rem 2rem 0;
  background-color: white;
}
.input-group-text{
  color: var(--bs-primary);
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0.3rem 0 0.3rem 0.5rem;
  font-size: 1.3rem;
}

.clear.btn{
  background: transparent;
  border-radius: 2rem;
}
.clear.btn:hover{
  border: transparent;
}
</style>
