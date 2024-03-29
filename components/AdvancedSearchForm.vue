<template>
    <form  ref="form" class="flex flex-col gap-4 grow mt-2" @submit.prevent="submitForm">
        <div class="flex flex-col md:flex-row sm:flex-wrap w-full gap-3 mt-2 lg:mt-0">
        <div class="whitespace-nowrap p-1 xl:bg-tertiary xl:shadow-none flex flex-grow-0 items-baseline"> 
          
            <label for="dict-select">{{ $t('options.dict') }} </label>
            <select id="dict-select" class="bg-tertiary flex-grow md:grow-0 p-2 md:p-0" name="dict" @change="update_dict">
                <option v-for="(dict, idx) in  dicts" :key="idx" :value="dict" :selected="store.dict == dict" :class="{selected: store.dict == dict}">{{$t("dicts." + dict)}}</option>
            </select>

        </div>


        <div class="whitespace-nowrap p-1 xl:bg-tertiary xl:shadow-none  flex flex-grow-0 items-baseline"> 
            <label for="scope-select">{{ $t('options.scope.title') }}</label>
            <select id="scope-select" name="scope" class="bg-tertiary flex-grow md:grow-0 p-2 md:p-0" @change="update_scope">
                <option v-for="(scope, idx) in  ['e', 'ei', 'eif']" :key="idx" :value="scope" :selected="store.scope == scope" :class="{selected: store.scope == scope}">{{$t("options.scope.value." + scope)}}</option>
            </select>
        </div>


        <div class="whitespace-nowrap p-1 xl:bg-tertiary xl:shadow-none flex xl:flex-grow-0 items-baseline"> 
            <label for="pos-select">{{ $t('pos') }}</label>
            <select id="pos-select" name="pos" class="bg-tertiary flex-grow md:grow-0 p-2 md:p-0" @change="update_pos">
                <option v-for="(tag, idx) in  pos_tags" :key="idx" :value="tag" :selected="store.pos == tag" :class="{selected: store.pos == tag}">{{tag ? $t("tags." + tag, 2) : $t("all_pos")}}</option>
            </select>
        </div>
        <div  v-if="!(store.pos == null &&  store.scope == 'e' && store.dict == 'bm,nn')"  class="flex w-full sm:w-[128px] sm:min-w-[128px] sm:max-w-[128px] !py-0">
            <button class="btn w-full py-2 lg:py-0" type="reset" @click="reset"><BiArrowClockwise class="mr-3 text-primary text-xl align-text-bottom" />{{$t('reset')}}</button>
          </div>

        </div>
      

        <div class="flex flex-col lg:flex-row grow lg:flex-wrap w-full gap-x-6 gap-y-3">
          <div class="grow" :class="{activeAutocomplete: store.autocomplete && store.autocomplete.length}">
            <Autocomplete  @dropdown-submit="submitForm"/>
          </div>

          <div v-if="store.q" class="flex gap-6">
            <div class="flex justify-center items-center">
                <label class="checkbox-label">
                <input  v-model="settings.listView" type="checkbox">
                  {{$t('show_list')}}
                </label>
            </div>
            <div class="flex justify-center items-center"><NuxtLink :to="`/${$i18n.locale}/help/advanced`"><BiInfoCircleFill class="mr-2 mb-1 text-primary"/><span class="hoverlink">{{$t('advanced_help')}}</span></NuxtLink></div>
          </div>
        </div>
    </form>
</template>
  
<script setup>
import { useRoute } from 'vue-router'
import { useSearchStore } from '~/stores/searchStore'
import {useSettingsStore } from '~/stores/settingsStore'
const settings = useSettingsStore()
const store = useSearchStore()
const route = useRoute()

const dicts = ['bm,nn', 'bm', 'nn']
const pos_tags = ['', 'VERB', 'NOUN', 'ADJ', 'PRON', 'DET', 'ADV', 'ADP', 'CCONJ', 'SCONJ', 'INTJ']
const input_element = useState('input_element')


const mini_help = ref(!store.q)

const update_pos = event => {
  store.pos = event.target.value
  submitForm()

}

const update_dict = (event) => {
  store.dict = event.target.value
  if (store.q) {
    submitForm()
  }
  
}

const update_scope = (event) => {
  store.scope = event.target.value
  if (store.q) {
    submitForm()
  }
}


const reset = () => {
  store.pos = null
  store.scope = "e"
  store.dict = "bm,nn"

  if (store.q) {
    submitForm()
  }

}


const submitForm =  (item) => {
  if (store.input && input_element.value) {
    store.input = store.input.trim()
    if (!settings.disableAutoSelect && !isMobileDevice()) {
      input_element.value.select()
    }
    else {
      input_element.value.blur()
    }
    
    store.q = store.input
    mini_help.value = false
    const query = {q: store.input, dict: store.dict, scope: store.scope}
    if (store.pos) {
      query.pos = store.pos
    }
    return navigateTo({query})
  }
}

</script>

<style scoped>

.welcome .advanced-search {
  @apply bg-tertiary border-tertiary-darken2;

}

option {
  @apply text-text bg-canvas-darken;
}

option:hover {
  @apply text-text bg-tertiary;
}

option.selected {
  @apply text-white bg-primary;
}

.select-wrapper:focus-within {
  box-shadow: 2px 2px 0px theme("colors.primary.DEFAULT");

}


label {
  @apply px-1 whitespace-nowrap font-semibold;
}

</style>
  