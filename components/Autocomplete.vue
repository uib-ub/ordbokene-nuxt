<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'


let selected = ref('')

async function fetchAutocomplete(q) {
  store.suggestion = true
    q = q.target.value.trim()
    if (q.length == 0) {
      store.autocomplete = [];
      return
    }
    const time = Date.now()
    if (store.autocomplete[0]) {
      if (store.autocomplete[0].time < time) {
        store.autocomplete.splice(0,1, {q, time, type: "empty"})
      }
    }
    else {
      store.autocomplete.push({q, time, type: "empty"})
    }

    // Intercept queries containing too many words or characters
    let words = q.split(/ |\|/)
    if (words.length > 20) {
      store.autocomplete = [{q, time, type: "empty"}]
      return
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 40) {
        store.autocomplete = [{q, time, type: "empty"}]
        return
      }
    }
    
    let response = ref([])
    response.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${q}&dict=${store.dict}&n=20&dform=int&meta=n&include=e`)
    
    // prevent suggestions after submit
    if (store.suggesting && q == store.q) {
      let autocomplete_suggestions = []
      if (store.q.trim() == q && response.value.a.exact) {
        autocomplete_suggestions = response.value.a.exact.map(item => ({q: item[0], time: time, dict: [item[1]], type: "word"}))
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


const emit = defineEmits(['submit'])
const submit = (item) => {
  emit('submit', item)
  store.autocomplete = []
  store.suggesting = false
}

</script>

<template>
  <div class="searchField">
    <Combobox v-model="store.selected" v-on:update:modelValue="submit" @submit.prevent="submit">
      <div>
        <div>
          <ComboboxInput
            class="form-control"
            name="q"
            :displayValue="(item) => item.q"
            autofocus="true"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            required="true"
            ref="input"
            @input="store.q = $event.target.value; fetchAutocomplete($event)"
            

          />
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="store.autocomplete=[]">
          <ComboboxOptions class="list-group autocomplete" v-show="store.autocomplete[0]">

            <ComboboxOption
              v-for="(item, idx) in store.autocomplete"
              as="template"
              :key="idx"
              :value="item"
              v-slot="{ active }"
            >
              <li
                class="list-group-item"
                :class="{'active': active, '': !active,}">

                <span :class="item.type">{{ item.q }}</span> <span class="dict-parentheses" v-if="item.dict && store.dict =='bm,nn'">({{["bokmål","nynorsk","bokmål, nynorsk"][item.dict-1]}})</span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<style scoped>
.searchField{
    width: 100%;
}
.form-control{
  border: none;
  border-radius: 0 2rem 2rem 0;
  background-color: white;
  position: relative;
}
.autocomplete {
  outline: solid 1px var(--bs-primary);
  box-shadow: 2px 2px 1px var(--bs-primary);
  border-radius: 0 0 1rem 1rem;
  background-color: white;
  width: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
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
</style>
