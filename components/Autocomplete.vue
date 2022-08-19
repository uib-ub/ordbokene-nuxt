<template>
  <div class="searchField">
    <Combobox v-model="selected" nullable>
      <div class="">
        <div class="">
          <ComboboxInput
            class="form-control"
            autofocus="true"
            :displayValue="(person) => person[0]"
            @change="query = $event.target.value"
            @keypress="fetchPeople"
          />
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''">
          <ComboboxOptions class="list-group autocomplete">

            <ComboboxOption
              v-for="(person, idx) in people"
              as="template"
              :key="idx"
              :value="person[0]"
              v-slot="{ active }"
            >
              <li
                class="list-group-item"
                :class="{'active': active, '': !active,}">
                <span class="">
                  {{ person[0] }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
    PEOPLE2:{{people}}
  </div>
</template>

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

let people = ref([])

let selected = ref('')
let query = ref('')

async function fetchPeople() {
    people.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${query.value}&dict=${store.dict}&n=20&dform=int&meta=n&include=e`)
    console.log("PEOPLE", people.value)
    people.value = people.value.a.exact

}




</script>
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
.active{
    background-color: rgb(225, 225, 225);
    border: none;
}
.list-group-item{
    color: var(--bs-primary);
    font-weight: bolder;
}
</style>
