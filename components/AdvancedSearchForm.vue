<template>
<div class="my-2 md:mt-0">
<form  @submit.prevent="submitForm" ref="form" class="flex gap-10 flex-wrap">

  <div class="mb-3 p-3 md:pb-5 px-4 md:px-5 advanced-search w-full flex gap-4 flex-wrap" >
    <div class="md:p-2 flex gap-4 md:gap-6 lg:gap-10 flex-wrap">
  <fieldset class="flex flex-row gap-3 flex-wrap">
  <legend class="sr-only">Ordbok</legend>
    <FormRadio v-for="(item, idx) in dicts" :key="store.dict + idx" :model="store.dict || 'bm,nn'" @change="dict_radio" :value="item" name="dict" :labelId="'dict-radio-'+idx">
      {{$t(`dicts.${item}`)}}
    </FormRadio>
  </fieldset>


<div class="flex gap-3 flex-wrap">
<FormCheckbox labelId="inflectedCheckbox" :checked="inflection_enabled" v-model="inflection_enabled">
    {{$t('options.inflected')}}
</FormCheckbox>
<FormCheckbox labelId="fulltextCheckbox" :checked="fulltext_enabled" v-model="fulltext_enabled">
    {{$t('options.fulltext')}}
</FormCheckbox>
</div>
  <label for="pos-select">{{$t('pos')}}:</label>
  <div class="select-wrapper" v-bind:class="{not_null: store.pos}">
  <select id="pos-select" name="pos" class="bg-tertiary" @change="store.pos = $event.target.value">
    <option v-for="(tag, idx) in  pos_tags" :key="idx" :value="tag" :selected="store.pos == tag" v-bind:class="{selected: store.pos == tag}">{{tag ? $t("tags." + tag) : $t("all_pos")}}</option>
  </select>
  </div>

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
      <p>Enkelt søk viser kun treff på oppslagsord i resultatlisten, og vi prøver å gi deg det beste alternativet hvis det du søker etter ikke er et oppslagsord. I avansert søk kan du derimot vise treff på bøyde former og i definisjonene (fritekstsøk). Du kan også filtrere etter ordklasse, og trunkere og kombinere søkene med spesialtegn.</p>

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
const pos_tags = ['', 'VERB', 'NOUN', 'ADJ', 'PRON', 'DET', 'ADV', 'ADP', 'CCONJ', 'SCONJ', 'INTJ']

const fulltext_enabled = ref(store.scope.includes('f'))
const inflection_enabled = ref(store.scope.includes('i'))

const mini_help = ref(store.q == "")

const dict_radio = (value) => {
  store.dict = value

}

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
  //store.autocomplete = []
  store.q = store.input
  mini_help.value = false
  let query = {q: store.input, dict: store.dict, scope: store.scope}
  if (store.pos) {
    query.pos = store.pos
  }
  return navigateTo({query})
}

</script>

<style lang="scss" scoped>

.advanced-search {
  @apply bg-tertiary border-gray-500 border-1 md:pt-4;
  
  

}

@screen md {
  .advanced-search {
    border-top: none;
  }
  
}

.welcome .advanced-search {
  @apply bg-tertiary border-primary-lighten;
  border: none;
}


  option {
    @apply text-text bg-canvas;
  }


  option.selected {
    @apply text-white bg-primary;
  }

.select-wrapper {
  @apply bg-none p-1 rounded-1xl;

  }

  .select-wrapper.not_null {
    @apply bg-primary;
    select {
      @apply bg-primary text-white
    }
  }

 



</style>
