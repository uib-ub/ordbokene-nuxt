<template>
<div class="my-3">
<form  @submit.prevent="submitForm" ref="form">
  <div v-if="store.advanced" class="mb-3 mx-1 p-2 search-toolbar form-group row align-items-center">

    <div class="dropdown col-sm-2">
    <button class="btn rounded-pill dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-none d-lg-block">{{$t(`dicts.${store.dict}`)}}</span><span class="d-lg-none">{{$t(`dicts_short.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu">
      <li v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx"><button class="dropdown-item" name="dict" :value="item">{{$t(`dicts.${item}`)}}</button></li>
    </ul>
  </div>
  
<div class="dropdown col-sm-2 ">
  <button class="btn rounded-pill dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span>{{store.pos ? $t("pos_tags_plural." + store.pos) : $t("all_pos")}}</span></button>
  <ul class="dropdown-menu" name="pos" @submit="submitForm">
    <li v-for="(tag, idx) in  pos_tags"
        :key="idx"><button 
        class="dropdown-item" 
        @click="store.pos = tag">{{tag ? $t("pos_tags_plural." + tag) : $t("all_pos")}}</button></li>
  </ul>
</div>

<div class="form-check col-sm-2">
  <input class="form-check-input" type="checkbox" value="" id="inflectionCheckbox" v-model="inflection_enabled">
  <label class="form-check-label" for="inflectionCheckbox">
    {{$t('options.inflected')}}
  </label>
</div>

<div class="form-check col-sm-2">
  <input class="form-check-input" type="checkbox" value="" id="fulltextCheckbox" v-model="fulltext_enabled">
  <label class="form-check-label" for="fulltextCheckbox">
    {{$t('options.fulltext')}}
  </label>
</div>
</div>


  <div class="input-group active p-md-1" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
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

const pos_tags = [null, 'VERB', 'NOUN', 'ADJ', 'PRON', 'DET', 'ADV', 'ADP', 'CCONJ', 'SCONJ', 'INTJ']

const fulltext_enabled = ref(store.scope.includes('f'))
const inflection_enabled = ref(store.scope.includes('i'))

watch(fulltext_enabled, () => {
  if (fulltext_enabled.value) {
    store.scope = store.scope + "f"
  }
  else {
    store.scope = store.scope.replace('f', '')
  }
  console.log("WATCHED", fulltext_enabled)
})

watch(inflection_enabled, () => {
  if (inflection_enabled.value) {
    store.scope = store.scope + "i"
  }
  else {
    store.scope = store.scope.replace('i', '')
  }
  console.log("WATCHED", fulltext_enabled)
})

const submitForm = async (item) => {
  store.autocomplete = [] 
  let searchUrl = '/'
  if (item && item.submitter && item.submitter.name == 'dict') {
    
    store.dict = item.submitter.value
    console.log("YES", store.dict)
    

  }
  searchUrl += store.dict
  
  if (store.input) {
    searchUrl += '/search?q='+store.input
    if (store.advanced) {
      console.log("ADVANCED")
      searchUrl += "&scope="+store.scope

    }
    store.q = store.input

  }
  
    
    return navigateTo(searchUrl)
    
  
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

.search-toolbar {
  background-color: white;
  box-shadow: 2px 2px 1px rgb(0 0 0 / 30%);
  border: solid 1px rgb(0 0 0 / 30%);
}
</style>
