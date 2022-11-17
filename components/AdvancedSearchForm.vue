<template>
<div class="my-2 md:mt-0">
<form  @submit.prevent="submitForm" ref="form" class="flex gap-10 flex-wrap">

  <div class="mb-3 p-3 md:pb-5 px-4 md:px-5 advanced-search w-full flex gap-4 flex-wrap" >
    <div class="md:p-2 flex gap-4 md:gap-6 lg:gap-10 flex-wrap">

    <fieldset class="flex flex-row gap-3 flex-wrap">
    <legend class="sr-only">Ordbok</legend>
    <div v-for="(item, idx) in dicts" :key="idx">
      <input type="radio" :id="'dixt-radio-'+idx" :value="item" name="dict" v-model="store.dict"/>
      <label :for="'dixt-radio-'+idx">{{$t(`dicts.${item}`)}}</label>
    </div>
  </fieldset>


<div class="flex gap-3 flex-wrap">


<div>
  <input type="checkbox" id="inflectionCheckbox" v-model="inflection_enabled">
  <label class="form-check-label" for="inflectionCheckbox">
    {{$t('options.inflected')}}
  </label>
</div>

<div>
  <input class="form-check-input" type="checkbox" id="fulltextCheckbox" v-model="fulltext_enabled">
  <label class="form-check-label" for="fulltextCheckbox">
    {{$t('options.fulltext')}}
  </label>
</div>
</div>

   
  <select name="pos" v-model="store.pos">
    <option v-for="(tag, idx) in  pos_tags" :key="idx" :value="item">{{tag ? $t("pos_tags_plural." + tag) : $t("all_pos")}}</option>
  </select>

</div>


<div class="flex justify-between flex-wrap gap-4 md:gap-12 xl:gap-24 w-full">
<div class="flex-auto" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete  v-on:dropdown-submit="submitForm"/>
</div>
  


<div class="flex gap-2 ms-auto mt-auto justify-between md:justify-end">
  <button :aria-label="$t('search')" class="btn-secondary" type="reset" @click="reset"> <BootstrapIcon icon="bi-x-lg" left/>{{$t('reset')}}</button>
  <button :aria-label="$t('search')" class="btn-primary" type="submit"> <BootstrapIcon icon="bi-search" left/>{{$t('search')}}</button>

</div>
</div>
  </div>
</form>
<div v-if="store.q" class="flex mb-2 flex-wrap gap-2">
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

const dicts = ['bm,nn', 'bm', 'nn']

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

.advanced-search {
  @apply bg-tertiary border-gray-500 border-1 md:pt-4;
  border-radius: .25rem;
  
  

}

@screen md {
  .advanced-search {
    border-top: none;
    border-radius: 0 0 .25rem .25rem;
  }
  
}

.welcome .advanced-search {
  @apply bg-tertiary border-primary;
}


select[type=checkbox] {
  -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fdf4f5;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    border: 1px solid rgba(0,0,0,.25);
    height: 1em;
    margin-top: 0.25em;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    vertical-align: top;
    width: 1em;
}

select[type=checkbox]:checked {
    background-color:red;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3E%3C/svg%3E");
  }



  option {

    @apply text-text bg-canvas p-2;
  }

option:active, option:focus, option::before {
  color: red;
}

label {
  @apply p-2;
}





</style>
