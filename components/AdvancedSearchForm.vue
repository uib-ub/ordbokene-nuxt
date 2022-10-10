<template>
<div class="my-3">
<form  @submit.prevent="submitForm" ref="form">

  <div class="mb-3 mx-1 p-2 search-toolbar container">
  <div class="row form-group align-items-center">

  <div class="dropdown col-sm-2">
    <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-none d-lg-block">{{$t(`dicts.${store.dict}`)}}</span><span class="d-lg-none">{{$t(`dicts_short.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu">
      <li v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx"><button type='button' @click="store.dict = item" class="dropdown-item" name="dict" :value="item">{{$t(`dicts.${item}`)}}</button></li>
    </ul>
  </div>
  
<div class="dropdown col-sm-2 ">
  <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span>{{store.pos ? $t("pos_tags_plural." + store.pos) : $t("all_pos")}}</span></button>
  <ul class="dropdown-menu" name="pos">
    <li v-for="(tag, idx) in  pos_tags"
        :key="idx"><button type = "button" class="dropdown-item" name="pos" @click="store.pos = tag">{{tag ? $t("pos_tags_plural." + tag) : $t("all_pos")}}</button></li>
  </ul>
</div>

<div class="form-check col-sm-2">
  <input class="form-check-input" type="checkbox" id="inflectionCheckbox" v-model="inflection_enabled">
  <label class="form-check-label" for="inflectionCheckbox">
    {{$t('options.inflected')}}
  </label>
</div>

<div class="form-check col-sm-2">
  <input class="form-check-input" type="checkbox" id="fulltextCheckbox" v-model="fulltext_enabled">
  <label class="form-check-label" for="fulltextCheckbox">
    {{$t('options.fulltext')}}
  </label>
</div>
  </div>
<div class="row p-md-3 g-3">
<div class="advanced-search active col-7 flex-md-fill" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete  v-on:submit="submitForm"/>
  
 
  </div>
  <button :aria-label="$t('search')" class="btn btn-secondary rounded-pill col-1 mx-2" type="reset" @click="reset"> <BootstrapIcon icon="bi-cancel"/> Nullstill </button>
  <button :aria-label="$t('search')" class="btn btn-primary rounded-pill col-1 mx-2" type="submit"> <BootstrapIcon icon="bi-search"/> Søk </button>

</div>
</div>
</form>
<div v-if="store.q" class="d-flex justify-content-end">
<div class="btn-group" role="group" aria-label="Basic example">
  <button @click="settings.listView = false" class="btn btn-light" v-bind:class="{active: !settings.listView}"><i class="bi-file-text"/> Artikler</button>
  <button @click="settings.listView = true" class="btn btn-light" v-bind:class="{active: settings.listView}"><i class="bi-list"/> Liste</button>



</div>
</div>
</div>
</template>

<script setup>
  
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
import {useSettingsStore } from '~/stores/settingsStore'
const settings = useSettingsStore()
const store = useStore()
const route = useRoute()

const pos_tags = [null, 'VERB', 'NOUN', 'ADJ', 'PRON', 'DET', 'ADV', 'ADP', 'CCONJ', 'SCONJ', 'INTJ']

const fulltext_enabled = ref(store.scope.includes('f'))
const inflection_enabled = ref(store.scope.includes('i'))

const reset = () => {
  store.input = ""
  store.pos = null
  store.dict = "bm,nn"
  store.input = ""
}

watch(fulltext_enabled, () => {
  if (fulltext_enabled.value) {
    store.scope = store.scope + "f"
  }
  else {
    store.scope = store.scope.replace('f', '')
  }
})

watch(inflection_enabled, () => {
  if (inflection_enabled.value) {
    store.scope = store.scope + "i"
  }
  else {
    store.scope = store.scope.replace('i', '')
  }
})


const submitForm = async (item) => {
  store.autocomplete = []
  store.q = store.input


  let url = `/search?q=${store.input}&dict=${store.dict}&scope=${store.scope}`
  if (store.pos) url += "&pos=" + store.pos
  return navigateTo(url)
}

</script>

<style scoped>

.advanced-search {
  outline: solid 1px var(--bs-primary);
  border-radius: 2rem;
}
.input-group{
  outline: solid 1px var(--bs-primary);
  border-radius: 2rem;
  background-color: white;
  flex-wrap: unset;
}
.advanced-search:focus-within{
  box-shadow: 1px 2px 1px var(--bs-primary);
} 
.activeAutocomplete{
  border-radius: 1rem 1rem 0 0;
}

.dropdown-menu{
  border: solid 1px var(--bs-primary);
  box-shadow: 1.5px 1.5px 1px var(--bs-primary);
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
  border-radius: 2rem;
}
.btn-group {
  border: solid 1px rgba(0,0,0, .3);
  box-shadow: 2px 2px 1px rgba(0,0,0, .3);
}

</style>
