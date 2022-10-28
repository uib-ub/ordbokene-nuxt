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
  <div class="search-container">
    <Combobox v-model="store.input" @update:modelValue="submit">
      <div>
        <div class="height d-flex align-items-center justify-content-between">
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
          <button class="btn-input" v-if="store.input.length > 0" :aria-label="$t('clear')" v-on:click="clearText"><BootstrapIcon icon="bi-x-lg"/></button>
          <button class="btn-input" type="submit" v-if="!store.advanced" :aria-label="$t('search')"> <BootstrapIcon icon="bi-search"/></button>
        </div>
        
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="store.autocomplete=[]">

          <ComboboxOptions class="list-group list-group-flush autocomplete overflow-auto" v-show="store.autocomplete[0]">

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
  </div>
</template>

<style scoped>
.btn-close:focus{
  outline: solid 1px var(--bs-primary);
}
.search-container {
    width: 100%;
}
.height{
    height: 42.391px;
}
.form-control{
  border: none;
  background-color: white;
  position: relative;
  width: 95%;
}
.form-control:focus{
    box-shadow: none;
}
.form-control::placeholder{
    color: var(--bs-primary);
    font-style: italic;
}
.form-control:focus::placeholder{
    opacity: 0.5;
}
.searchField .ul {
  outline: solid 1px var(--bs-primary);
  box-shadow: 2px 2px 1px var(--bs-primary);
  border-radius: 0 0 1.75rem 1.75rem;
  background-color: white;
  width: 100%;
  position: relative;
  padding-bottom: 1.5rem;

}


.list-group{
  max-height: 50vh;
}

.list-group-item  {
  cursor: pointer;
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
  width: 10px;
  border-radius: 0 0 1rem 0;
}
::-webkit-scrollbar-track {
  background: #ffff;
  border-radius: 0 0 1rem 0;
}
::-webkit-scrollbar-thumb {
  background: rgb(189, 189, 189);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(141, 141, 141);
}

.btn-input {
  font-size: 1.5rem;
  color: var(--bs-primary);
  border: none;
  border-radius: 2rem;
  padding-right: .5rem;
  padding-left: .5rem;
  margin-right: .17rem;
  background: white;


}

.search-toolbar .btn-input  {
  font-size: 1.25rem;
  margin-right: .34rem;
}

.btn-input:hover {
  background-color: rgba(0,0,0,.25);
  
}




</style>
