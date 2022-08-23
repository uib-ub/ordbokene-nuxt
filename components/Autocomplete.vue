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
    store.autocomplete.value = await $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${q}&dict=${store.dict}&n=20&dform=int&meta=n&include=e`)
    store.autocomplete = store.autocomplete.value.a.exact || []
    

}

const input = ref(null)
defineExpose({ input })
const emit = defineEmits(['submit'])
const submit = () => {
  input.value.$el.select()
  emit('submit')

}

</script>

<template>
  <div class="searchField">
    <Combobox v-model="store.q" v-on:update:modelValue="submit">
      <div>
        <div>
          <ComboboxInput
            class="form-control"
            name="q"
            :value="store.q"
            autofocus="true"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            required="true"
            ref="input"
            @input="store.q = $event.target.value; fetchAutocomplete($event.target.value)"
            

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
              :value="item[0]"
              v-slot="{ active }"
            >
              <li
                class="list-group-item"
                :class="{'active': active, '': !active,}">
                <span class="">{{ item[0] }}</span> <span class="dict-parentheses">({{["bokmål","nynorsk","bokmål, nynorsk"][item[1]-1]}})</span>
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

.list-group-item .exact {
    color: var(--bs-primary);
    font-weight: bolder;
}
.dict-parentheses {
    color: rgba(0,0,0,.6);
    font-size: 85%;
    font-weight: 400;
}
</style>
