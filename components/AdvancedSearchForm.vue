<template>
<div class="mt-2">
<form  @submit.prevent="submitForm" ref="form">

  <div class="mb-3 p-3 search-toolbar container">
  <div class="row g-3 mb-3">

<div class="col-auto mt-3">
  <div class="row g-3">
    <div class="col-auto p-1 px-3">
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="inflectionCheckbox" v-model="inflection_enabled">
  <label class="form-check-label" for="inflectionCheckbox">
    {{$t('options.inflected')}}
  </label>
</div>
</div>
<div class="col-auto p-1 px-3">
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="fulltextCheckbox" v-model="fulltext_enabled">
  <label class="form-check-label" for="fulltextCheckbox">
    {{$t('options.fulltext')}}
  </label>
</div>
</div>
</div>
</div>

<div class="col-auto mt-3">
  <div class="row g-3">
    <div class="col-auto">
  <div class="dropdown">
    <button class="borderless dropdown-toggle d-flex align-items-center p-1 px-3 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-none d-lg-block">{{$t(`dicts.${store.dict}`)}}</span><span class="d-lg-none">{{$t(`dicts_short.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu">
      <li v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx"><button type='button' @click="store.dict = item" class="dropdown-item" name="dict" :value="item">{{$t(`dicts.${item}`)}}</button></li>
    </ul>
  </div>
    </div>


    <div class=" col-auto">
      <div class="dropdown">
      <button class="dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span>{{store.pos ? $t("pos_tags_plural." + store.pos) : $t("all_pos")}}</span></button>
      <ul class="dropdown-menu" name="pos">
        <li v-for="(tag, idx) in  pos_tags"
            :key="idx"><button type = "button" class="dropdown-item" name="pos" @click="store.pos = tag">{{tag ? $t("pos_tags_plural." + tag) : $t("all_pos")}}</button></li>
      </ul>
    </div>
    </div>
  </div>
</div>


</div>
<div class="row">



<div class="col">
<div class="advanced-search" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete  v-on:submit="submitForm"/>
</div>
  

</div>
<div class="col-auto">
  <button :aria-label="$t('search')" class="secondary" type="reset" @click="reset"> <BootstrapIcon icon="bi-x-lg" left/> Nullstill </button>
  <button :aria-label="$t('search')" type="submit"> <BootstrapIcon icon="bi-search" left/>Søk </button>

</div>
</div>
  </div>
</form>
<div v-if="store.q" class="d-flex mb-2 flex-wrap">
  <button class="btn btn-light btn-light-single me-auto" v-if="store.q" @click="mini_help = !mini_help"><BootstrapIcon icon="bi-question-circle" left/>{{$t('advanced_help')}}</button>

<div class="btn-group" role="group" aria-label="Basic example">
  <button @click="settings.listView = false" class="btn btn-light" v-bind:class="{active: !settings.listView}"><BootstrapIcon icon="bi-file-text" left/>Artikler</button>
  <button @click="settings.listView = true" class="btn btn-light" v-bind:class="{active: settings.listView}"><BootstrapIcon icon="bi-list" left/>Liste</button>



</div>
</div>
<div v-if="!store.q || mini_help" class="secondary-page container advanced-info">
      <h2>Avansert søk</h2>
      <p>Bla bla bla</p>

      <AdvancedHelp/>


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

const mini_help = ref(store.q == "")

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
  mini_help.value = false


  let url = `/search?q=${store.input}&dict=${store.dict}&scope=${store.scope}`
  if (store.pos) url += "&pos=" + store.pos
  return navigateTo(url)
}

</script>

<style scoped>

.btn-light-single:focus {
  border-radius: 2rem;
}
.btn-group > .btn:not(:last-child):focus {
  border-radius: 2rem 0 0 2rem;
}

.btn-group > .btn:not(:first-child):focus {
  border-radius: 0 2rem 2rem 0;
}


.dropdown-menu {
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
  border: solid 1px var(--bs-primary);
  background: var(--bs-white);
  border-radius: 2rem;

}


.btn-group, .btn-light-single {
  border: solid 1px var(--bs-primary);
}

.dropdown-toggle {
  border: none;
  background: none;

}

.dropdown-toggle:after {
  color: var(--bs-primary)
}

.clear-button {
  border: solid 2px var(--bs-secondary);
}

.submit-button {
  border: solid 2px var(--bs-primary);

}

.clear-button:focus {
  box-shadow: 2px 2px 1px var(--bs-secondary);
}

.submit-button:focus {
  box-shadow: 2px 2px 1px var(--bs-primary);
}



.form-button {
  min-width: 100px;
}







</style>
