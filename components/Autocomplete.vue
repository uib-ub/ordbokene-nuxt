<template>
  <div class="fixed top-16 w-72">
    QUERY: {{query}}
    <Combobox v-model="selected" name="q">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            autofocus="true"
            :displayValue="(person) => person[0]"
            @change="query = $event.target.value"
            @keypress="fetchPeople"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >

            <ComboboxOption
              v-for="(person, idx) in people"
              as="template"
              :key="idx"
              :value="person[0]"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person[0] }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
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