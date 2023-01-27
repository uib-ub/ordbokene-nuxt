<template>
<div class="my-2 md:mt-0">
<form  @submit.prevent="submitForm" ref="form" class="flex flex-row flex-wrap my-2 justify-between">
    <div class="flex flex-row gap-2">
  <fieldset class="">
  <legend class="sr-only">Ordbok</legend>
    <FormRadio v-for="(item, idx) in dicts" :key="store.dict + idx" :model="store.dict || 'bm,nn'" @change="dict_radio" :value="item" name="dict" :labelId="'dict-radio-'+idx">
      {{$t(`dicts.${item}`)}}
    </FormRadio>
  </fieldset>

<div class="">
<div class="">
<FormCheckbox labelId="inflectedCheckbox" :checked="inflection_enabled" v-model="inflection_enabled">
    {{$t('options.inflected')}}
</FormCheckbox>
<FormCheckbox labelId="fulltextCheckbox" :checked="fulltext_enabled" v-model="fulltext_enabled">
    {{$t('options.fulltext')}}
</FormCheckbox>
</div>
<div class="flex flex-row gap-2">
  <label for="pos-select">{{$t('pos')}}:</label>
  <div class="select-wrapper" v-bind:class="{not_null: store.pos}">
  <select id="pos-select" name="pos" class="bg-tertiary" @change="store.pos = $event.target.value">
    <option v-for="(tag, idx) in  pos_tags" :key="idx" :value="tag" :selected="store.pos == tag" v-bind:class="{selected: store.pos == tag}">{{tag ? $t("tags." + tag) : $t("all_pos")}}</option>
  </select>
  </div>
</div>

</div>

</div>


<div class="flex-1">
<div class="flex-auto" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
  <Autocomplete  v-on:dropdown-submit="submitForm"/>
</div>
  <div class="flex flex-auto gap-2 justify-end mt-2 flex-wrap">
  <button v-if="!(store.pos == null &&  store.scope == 'ei' && fulltext_enabled == false && inflection_enabled == true && store.dict == 'bm,nn')" class="btn btn-secondary bg-gray-500 border-gray-600 text-white" type="reset" @click="reset"> <Icon name="bi:trash" size="1.25rem" class="mr-3" />{{$t('reset')}}</button>
  <button type="button" class="btn btn-light me-auto" v-if="store.q" @click="mini_help = !mini_help"><Icon name="bi:question-circle" class="mb-1 mr-2"/>{{$t(mini_help ? 'advanced_help_hide' : 'advanced_help')}}</button>
  <button type="button" @click="(settings.listView = !settings.listView)" class="btn btn-light"><Icon :name='settings.listView ? "bi:list" : "bi:file-text"' class="mb-1 mr-2"/>{{settings.listView ? $t('show_articles') : $t('show_list',store.dict==='bm,nn'? 0 : 1)}}</button>
  
  <button class="btn btn-primary bg-primary text-white border-primary-lighten px-3" type="submit"> <Icon name="bi:search" size="1.25rem" class="mr-3"/>{{$t('search')}}</button>
  </div>
</div>
</form>
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
  store.pos = null
  store.scope = "ei"
  fulltext_enabled.value = false
  inflection_enabled.value = true
  store.dict = "bm,nn"
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
  if (store.input) {
    store.q = store.input
    mini_help.value = false
    let query = {q: store.input, dict: store.dict, scope: store.scope}
    if (store.pos) {
      query.pos = store.pos
    }
    return navigateTo({query})
  }
}

</script>

<style lang="scss" scoped>

.welcome .advanced-search {
  @apply bg-tertiary border-tertiary-darken2;

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




  .btn-light {
    border-radius: 2rem;
    padding: .25rem;
    padding-right: 1rem;
    padding-left: 1rem;

  }


.btn-primary i, button.btn-secondary i {
  @apply text-white

}


.btn-primary:hover {
  @apply bg-primary-lighten;
}

.btn-primary:focus {
  @apply bg-primary-lighten2;

  i {
    @apply text-white
  }
}

.btn-secondary:hover {
  @apply bg-secondary;
}

.btn-secondary:focus {
  @apply bg-secondary-darken;
}

 



</style>
