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

async function fetchPeople(q) {
    store.autocomplete.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${q}&dict=${store.dict}&n=20&dform=int&meta=n&include=e`)
    console.log("PEOPLE", store.autocomplete.value)
    store.autocomplete.value = store.autocomplete.value.a.exact || []
    

}
</script>

<template>
  <div class="searchField">
    <Combobox nullable>
      <div class="">
        <div class="">
          <ComboboxInput
            class="form-control"
            autofocus="true"
            :displayValue="(person) => person[0]"
            @change="query = $event.target.value; fetchPeople($event.target.value);"
            @submit="alert($event.target.value)"
          />
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''">
          <ComboboxOptions class="list-group autocomplete">

            <ComboboxOption
              v-for="person in store.autocomplete.value"
              as="template"
              :key="person[0]"
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
    </Combobox>{{selected}}
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
.active{
    background-color: rgb(225, 225, 225);
    border: none;
}
.list-group-item{
    color: var(--bs-primary);
    font-weight: bolder;
}
</style>
