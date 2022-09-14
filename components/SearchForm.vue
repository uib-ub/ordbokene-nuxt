<template>
<div class="my-3">
<form  @submit.prevent="submitForm" ref="form">
  <div class="input-group active p-md-2" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <div class="dropdown">
    <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-none d-lg-block">{{$t(`dicts.${store.dict}`)}}</span><span class="d-lg-none">{{$t(`dicts_short.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu" name="dict" @submit="submitForm">
      <li v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx"><button class="dropdown-item" @click="store.dict = item">{{$t(`dicts.${item}`)}}</button></li>
    </ul>
  </div>

  <Autocomplete v-on:submit="submitForm"/>
  <button :aria-label="$t('search')" class="btn btn-outline-primary rounded-pill"> <i class="bi bi-search input-group-text" aria-hidden="true"/></button>
  </div>


  <div v-if="store.advanced" class="dropdown">
    <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-none d-lg-block">{{store.pos ? $t("pos_tags_plural." + store.pos) : $t("all_pos")}}</span><span class="d-lg-none">{{$t(`dicts_short.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu" name="pos" @submit="submitForm">
      <li v-for="(tag, idx) in  pos_tags" a
          :key="idx"><button 
          class="dropdown-item" 
          @click="store.pos = tag">{{tag ? $t("pos_tags_plural." + tag) : $t("all_pos")}}</button></li>
    </ul>
  </div>

</form>

</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const pos_tags = [null, 'VERB', 'NOUN', 'ADJ', 'PRON', 'DET', 'ADV', 'ADP', 'CCONJ', 'SCONJ', 'INTJ']


function submitForm(item) {
  store.autocomplete = [] 

    let searchUrl = '/'+store.dict+'/submit?q='+store.input
    if (store.advanced) {
      searchUrl += "&scope="+store.scope

    }
    store.q = store.input
    navigateTo(searchUrl)
    
  
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

.dropdown-menu{
  border: solid 1px var(--bs-primary);
  box-shadow: 1.5px 1.5px 1px var(--bs-primary);
}
.btn-outline-primary{
  border: none;
  border-right: solid 1px var(--bs-primary);
  height: 100%;
}
.btn{
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
