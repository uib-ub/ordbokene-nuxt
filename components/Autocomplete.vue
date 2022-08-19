<template>
  <div class="searchField">
    <Combobox v-model="selected" nullable>
      <div class="">
        <div class="">
          <ComboboxInput
            class="form-control"
            :displayValue="(person) => person.name"
            @change="query = $event.target.value"
          />
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''">
          <ComboboxOptions class="list-group autocomplete">

            <ComboboxOption
              v-for="person in filteredPeople"
              as="template"
              :key="person.id"
              :value="person"
              v-slot="{ active }"
            >
              <li
                class="list-group-item"
                :class="{'active': active, '': !active,}">
                <span class="">
                  {{ person.name }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

let selected = ref(people[0])
let query = ref('')

let filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
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