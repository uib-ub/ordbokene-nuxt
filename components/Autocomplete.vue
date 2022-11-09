<script setup>
import { onMounted } from 'vue';
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

const store = useStore()
const route = useRoute()



async function fetchAutocomplete(q) {
  store.autocompletePending = true
  q = q.trim()
    if (q.length == 0) {
      store.autocomplete = [];
      return
    }
    let blank = specialSymbols(q) ? "advanced" : "empty"
    const time = Date.now()
    if (store.autocomplete[0]) {
      if (store.autocomplete[0].time < time) {
        store.autocomplete.splice(0,1, {q, time, type: blank})
      }
    }
    else {
      store.autocomplete.push({q, time, type: blank})
    }

    // Intercept queries containing too many words or characters
    let words = q.split(/ |\|/)
    if (words.length > 20) {
      store.autocomplete = [{q, time, type: blank}]
      return
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 40) {
        store.autocomplete = [{q, time, type: blank}]
        return
      }
    }

    if (blank != "advanced") {

      let response = ref([])
      let url = `${store.endpoint}api/suggest?&q=${q}&dict=${store.dict}&n=20&dform=int&meta=n&include=${store.advanced ? store.scope + (store.pos ? '&wc='+store.pos : '') : 'e'}`
      response.value = await $fetch(url)

      // prevent suggestions after submit
      if (store.autocompletePending && q == store.input) {
        let autocomplete_suggestions = []
        if (store.input.trim() == q && response.value.a.exact) {
          let { exact, inflect, freetext } = response.value.a
          autocomplete_suggestions = exact.map(item => ({q: item[0], time: time, dict: [item[1]], type: "word"}))
          if (inflect) {
            let inflection_suggestions = response.value.a.inflect.map(item => ({q: item[0], time: time, dict: [item[1]], type: "inflect"}))
            autocomplete_suggestions = autocomplete_suggestions.concat(inflection_suggestions)
          }
          if (freetext) {
            let inflection_suggestions = response.value.a.freetext.map(item => ({q: item[0], time: time, dict: [item[1]], type: "freetext"}))
            autocomplete_suggestions = autocomplete_suggestions.concat(inflection_suggestions)
          }
        }

        if (autocomplete_suggestions.length) {
          if (autocomplete_suggestions[0].q.toLowerCase() != q.toLowerCase()) {
            autocomplete_suggestions.unshift({q, time, type: "empty"})
          }
          store.autocomplete = autocomplete_suggestions
        }
        else {
          store.autocomplete = [{q, time, type: "empty"}]
        }

      }
    }
}

const input = ref(null)

const emit = defineEmits(['submit'])
const submit = (data) => {
  store.autocompletePending = false
  //todo: plausible
  input.value.$el.select()
  emit('submit')

  //console.log("SELECTING3")
}



const dropdownSelect = () => {

  console.log("SELECTING")
  input.value.$el.select()
}


const clearText = () => {
 store.input = ""
}


onMounted(() => {
  if (store.input) {
    input.value.$el.select()

  }
})

</script>

<template>
      <Combobox v-model="store.input" @update:modelValue="submit" as="div" class="combobox" style="position:relative" v-bind:class="{'has-input': store.input}">
        <div class="input-wrapper p-1 p-lg-2 d-flex align-items-center justify-content-between">
    <ComboboxInput
      class="form-control mx-3"
      @change="store.input = $event.target.value; fetchAutocomplete($event.target.value)"
      ref="input"
      :placeholder="$t('search_placeholder')"
      :aria-label="$t('search_placeholder')"
      name="q"
      autocomplete="off"
    />
    <button data-bs-toggle="tooltip" data-bs-placement="left" :title="$t('clear')" class="appended-button px-2 py-0" v-if="store.input.length > 0" :aria-label="$t('clear')" v-on:click="clearText"><BootstrapIcon icon="bi-x-lg"/></button>
    <button class="appended-button px-2 py-1" type="submit" v-if="!store.advanced" :aria-label="$t('search')"> <BootstrapIcon icon="bi-search"/></button>
        </div>


    <div class="autocomplete-dropdown">
    <ComboboxOptions class="list-group list-group-flush autocomplete overflow-auto">
      <ComboboxOption
        v-for="(item, idx) in store.autocomplete"
        :key="idx"
        :value="item.q"
        class="list-group-item"
      >
      <span :class="item.type">{{ item.q }}</span> <span class="dict-parentheses" v-if="item.dict && store.dict =='bm,nn'">({{["bokmål","nynorsk","bokmål, nynorsk"][item.dict-1]}})</span><span v-if="item.type == 'advanced' && !store.advanced" class="badge bg-primary">{{$t('advanced')}} <BootstrapIcon icon="bi-arrow-right" /></span>
      </ComboboxOption>
    </ComboboxOptions>
  </div>
  </Combobox>
<!--
      
    <Combobox v-model="store.input" @update:modelValue="submit" class="search-container" v-bind:class="{active: store.autocomplete && store.autocomplete.length}">
      <div>
        <div class="input-wrapper p-1 p-lg-2 d-flex align-items-center justify-content-between">
          <ComboboxInput
            class="form-control mx-3"
            name="q"
            :value="store.input"
            autofocus="true"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            maxlength="200"
            ref="input"
            @input="store.input = $event.target.value; fetchAutocomplete($event.target.value)"
            :placeholder="$t('search_placeholder')"
            :aria-label="$t('search_placeholder')"
          />
          <button data-bs-toggle="tooltip" data-bs-placement="left" :title="$t('clear')" class="appended-button px-2 py-1" v-if="store.input.length > 0" :aria-label="$t('clear')" v-on:click="clearText"><BootstrapIcon icon="bi-x-lg"/></button>
          <button class="appended-button px-2 py-1" type="submit" v-if="!store.advanced" :aria-label="$t('search')"> <BootstrapIcon icon="bi-search"/></button>
        </div>
        
        <TransitionRoot
          v-show="store.autocomplete[0]"
          class="autocomplete-dropdown"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="store.autocomplete=[]">

          <ComboboxOptions class="list-group list-group-flush autocomplete overflow-auto">

            <ComboboxOption
              v-for="(item, idx) in store.autocomplete"
              as="template"
              :key="idx"
              :value="item.q"
              v-slot="{ active }"
              @click="dropdownSelect"
            >
              <li
                class="list-group-item"
                :class="{'active': active, '': !active,}">

                <span :class="item.type">{{ item.q }}</span> <span class="dict-parentheses" v-if="item.dict && store.dict =='bm,nn'">({{["bokmål","nynorsk","bokmål, nynorsk"][item.dict-1]}})</span><span v-if="item.type == 'advanced' && !store.advanced" class="badge bg-primary">{{$t('advanced')}} <BootstrapIcon icon="bi-arrow-right" /></span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

  -->

</template>


<style lang="scss" scoped>

.input-wrapper {
    width: 100%;
    border-radius: 2rem;
    border: 1px solid var(--bs-primary) !important;
    background-color: var(--bs-white) !important;
}



.combobox[data-headlessui-state=open].has-input .autocomplete-dropdown {

    position: absolute;
    width: 100%;
    z-index: 1000;
    left: 0;
    border-radius: 0 0 2rem 2rem ;
    border: solid 1px var(--bs-primary);
    background-color: var(--bs-white);
    padding-bottom: 1.75rem;
    padding-left: .5rem;
    border-top: unset;    
  }    


.combobox[data-headlessui-state=open].has-input .input-wrapper {
  border-radius: 1.75rem 1.75rem 0 0;
  border-bottom: solid 1px white !important;
}


.combobox:focus-within .input-wrapper, .combobox:focus-within .autocomplete-dropdown {
  box-shadow: 2px 2px 1px var(--bs-primary);
}  


.form-control{
  border: none;
  background-color: unset;
  color: var(--bs-black)
}
.form-control:focus{
    box-shadow: none;
}
.form-control::placeholder{
    color: var(--bs-black);
    font-style: italic;
}
.form-control:focus::placeholder{
    opacity: 0.75;
}


.list-group{
  max-height: 50vh;
}

.list-group-item  {
  cursor: pointer;
}

.list-group-item[data-headlessui-state=active], .list-group-item[data-headlessui-state="active selected"] {
    background-color: var(--bs-list-group-active-bg);
    border-color: var(--bs-list-group-active-border-color);
    color: var(--bs-list-group-active-color);
    z-index: 2;
}

.list-group-item .word {
    color: var(--bs-primary);
    font-weight: bolder;
}
.dict-parentheses {
    color: rgba(0,0,0,.6);
    font-size: 85%;
    font-weight: 400;
}


::-webkit-scrollbar {
  width: 1rem;
  border-radius: 0 0 1rem 0;
}
::-webkit-scrollbar-track {
  background: #ffff;
  border-radius: 0 0 1rem 0;
}
::-webkit-scrollbar-thumb {
  background: var(--bs-gray-500);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--bs-gray-600);
}




.appended-button {
  font-size: 1.25rem;
  color: var(--bs-primary);
  border: none;
  border-radius: 2rem; 
  background: unset;
  &:hover {
    background-color: rgba(0,0,0,.25);
  }
  &:active {
    background-color: rgba(0,0,0,.5);
  }
}

.advanced-search .appended-button  {
  font-size: 1.25rem;
  margin-right: .34rem;
}



</style>
