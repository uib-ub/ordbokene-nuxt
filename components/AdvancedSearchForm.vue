<template>
<div class="mt-2">
<form  @submit.prevent="submitForm" ref="form">

  <div class="mb-3 p-3 advanced-search container">
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
    <button class="btn-borderless dropdown-toggle d-flex align-items-center p-1 px-3 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="d-block">{{$t(`dicts.${store.dict}`)}}</span></button>
    <ul class="dropdown-menu">
      <li v-for="(item, idx) in  ['bm,nn', 'bm', 'nn']" :key="idx"><button type='button' @click="store.dict = item" class="dropdown-item" name="dict" :value="item">{{$t(`dicts.${item}`)}}</button></li>
    </ul>
  </div>
    </div>


    <div class=" col-auto">
      <div class="dropdown">
      <button class="btn-borderless dropdown-toggle d-flex align-items-center p-1 px-3 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span>{{store.pos ? $t("pos_tags_plural." + store.pos) : $t("all_pos")}}</span></button>
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



<div class="d-flex justify-between flex-wrap gap-3 md:gap-4">
<div class="flex-grow-1" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete  v-on:dropdown-submit="submitForm"/>
</div>
  


<div class="d-flex gap-2 ms-auto mt-auto justify-between md:justify-end">
  <button :aria-label="$t('search')" class="btn-secondary" type="reset" @click="reset"> <BootstrapIcon icon="bi-x-lg" left/>{{$t('reset')}}</button>
  <button :aria-label="$t('search')" class="btn-primary" type="submit"> <BootstrapIcon icon="bi-search" left/>{{$t('search')}}</button>

</div>
</div>
</div>
  </div>
</form>
<div v-if="store.q" class="d-flex mb-2 flex-wrap gap-2">
  <button class="btn-light me-auto" v-if="store.q" @click="mini_help = !mini_help"><BootstrapIcon icon="bi-question-circle" left/>{{$t('advanced_help')}}</button>


  <button v-if="settings.listView" @click="settings.listView = false" class="btn-light" v-bind:class="{active: !settings.listView}"><BootstrapIcon icon="bi-file-text" left/>{{$t('show_articles')}}</button>
  <button v-else @click="settings.listView = true" class="btn-light" v-bind:class="{active: settings.listView}"><BootstrapIcon icon="bi-list" left/>{{$t(store.dict=='bm,nn'? 'show_lists' : 'show_list')}}</button>



</div>
<div v-if="!store.q || mini_help" class="secondary-page container advanced-info">
      <h2>{{$t('advanced_help')}}</h2>
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

<style lang="scss" scoped>

.advanced-search, .suggestions {
  background-color: rgba(var(--bs-white-rgb), .75) !important;
  border: solid 1px rgba(0,0,0,.75);
  border-radius: .25rem;
}

.dropdown-menu {
  border: solid 1px var(--bs-primary);
  box-shadow: 1.5px 1.5px 1px var(--bs-primary);
}

.input-group-text{
  @apply text-primary;
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0.3rem 0 0.3rem 0.5rem;
  font-size: 1.3rem;
}





.dropdown-toggle {
  border: solid 1px var(--bs-white);
  background: none;
  font-weight: normal;
}

.dropdown-toggle:after {
  @apply text-primary
}

.dropdown-toggle[aria-expanded=true] {
  @apply text-white);
  @apply bg-primary);
  border: solid 1px var(--bs-primary);
  &:after {
    @apply text-white)
  }
}

</style>
