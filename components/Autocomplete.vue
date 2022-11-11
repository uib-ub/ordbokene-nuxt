<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const input_element = ref('')
const selected_option = ref(-1)

async function fetchAutocomplete(q) {

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
      if (q == store.input) {
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

        if (autocomplete_suggestions.length && store.input.trim() == q && response.value.a.exact) {

          store.autocomplete = autocomplete_suggestions
        }
        else {
          store.autocomplete = []
        }


      }
    }
}


const emit = defineEmits(['dropdown-submit'])


const clearText = () => {
  console.log("CLEARING")
  store.input = ""
}


onBeforeMount(() => {    
    nextTick(function () {
    input_element.value.select()
  })
})



const keys = (event) => {
  
  if (store.autocomplete.length > 0) {
    if (event.key == "ArrowDown") {
    
    if (selected_option.value <  store.autocomplete.length -1) {
      selected_option.value += 1;
    }
    else {
      selected_option.value = 0;      
    }
    console.log("COMPARISON", selected_option.value, store.autocomplete.length)
    
    store.input = store.autocomplete[selected_option.value].q

    //event.stopPropagation()
    event.preventDefault()
  }
  else if (event.key == "ArrowUp") {
    console.log(event, selected_option)
    if (selected_option.value > -1) {
    
    selected_option.value -= 1;

    if (selected_option.value > -1) {
    store.input = store.autocomplete[selected_option.value].q
    
    }
    
    }
    //event.stopPropagation()
    event.preventDefault()
  }
  else if (event.key == "Escape") {
    selected_option.value = -1
    store.autocomplete = []
  }
  else if (event.key == "Home" && selected_option.value > -1) {
    selected_option.value = 0
    event.preventDefault()

  }
  else if (event.key == "End" && selected_option.value > -1) {
    selected_option.value = store.autocomplete.length - 1
    event.preventDefault()

  }
  else {
    console.log("KEYUP", event)
    selected_option.value = -1
    
    }
  }

}

const input_sync = (event) => {
  console.log("INOPUT_SUBMIT", event)
  console.log(event.target.value)
  console.log("INPUT SYNC: input from", store.input, "to", event.target.value)
  store.input = event.target.value
  fetchAutocomplete(store.input)
  if (event.target.value) {
    input_element.value.setAttribute('value', event.target.value)
  }
  else {
    input_element.value.removeAttribute('value')
  }
}

const dropdown_select = (event, q) => {
  console.log("DROPDOWN: Input from", store.input, "to", q)
  store.input= q
  store.autocomplete = []
  emit('dropdown-submit')
  console.log("NEXT")
  input_element.value.select()
  console.log("AFTER")
}


const exit_input = event => {
  console.log("BLURRED", event.relatedTarget)
  if (!(event.relatedTarget && event.relatedTarget.hasAttribute('data-dropdown-item'))) {
    console.log("PASSED"), event.relatedTarget
    store.autocomplete = []

  }

}


</script>

<template>
  <div class="search-container">
  <div class="input-wrapper border-1 border-primary flex content-center justify-between" v-bind="{'data-dropdown-open': store.autocomplete.length > 0}" aria-label="Søkefelt">
   <input class="input-element p-3 lg:p-4 px-5"
          :value="store.input"
          ref="input_element" 
          @input="input_sync"
          role="combobox" 
          :aria-activedescendant="selected_option >= 0 ? 'autocomplete-item-'+selected_option : null"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          placeholder="Search here"
          autocomplete="off"
          autocapitalize="off"
          @blur="exit_input"
          @keydown="keys"
          :aria-expanded="store.autocomplete.length > 0" 
          :aria-controls="store.autocomplete.length > 0 ? 'autocomplete-dropdown' : null"/>
          <button type="submit">Submit</button>
  </div>
   <ul id="autocomplete-dropdown" role="listbox">
    <li v-for="(item, idx) in store.autocomplete" 
        :key="idx" 
        :aria-selected="idx == selected_option"
        role="option"
        tabindex="-1"
        :id="'autocomplete-item-'+idx"
        >
        <!-- button hidden from screen readers? -->
        <button data-dropdown-item tabindex="-1" @click="dropdown_select($event, item.q)"><span :class="item.type">{{ item.q }}</span> <span class="dict-parentheses" v-if="item.dict && store.dict =='bm,nn'">({{["bokmål","nynorsk","bokmål, nynorsk"][item.dict-1]}})</span><span v-if="item.type == 'advanced' && !store.advanced" class="badge bg-primary">{{$t('advanced')}} <BootstrapIcon icon="bi-arrow-right" /></span></button>
   </li>
  </ul>
  </div>


</template>


<style lang="scss" scoped>

.search-container {
  position: relative;

}

#autocomplete-dropdown {
  z-index: 1000;
  width: 100%;
  background-color: white;
  position: absolute !important;
  left: 0;
}

.input-wrapper {

    width: 100%;
    border-radius: 2rem;

}

.input-wrapper:focus-within {
  box-shadow: 2px 2px 1px;
  @apply shadow-primary shadow;
}



.input-element {
  border-radius: 2rem 0 0 2rem;
  background: none;
  outline: none;
  width: 100%;

}






.input-wrapper {
    width: 100%;
    border-radius: 2rem;


}



.input-wrapper[data-dropdown-open=true] {
  border-radius: 1.75rem 1.75rem 0 0;
  border-bottom: solid 1px white !important;
}


.combobox[data-headlessui-state=open].has-input .autocomplete-dropdown {

    position: absolute;
    width: 100%;
    z-index: 1000;
    left: 0;
    border-radius: 0 0 2rem 2rem ;
    border: solid 1px inherti;
    @apply bg-white border-primary;
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
  @apply text-black;
}
.form-control:focus{
    box-shadow: none;
}
.form-control::placeholder{
    @apply text-black;
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
    @apply bg-gray-200 border-gray-700;
    z-index: 2;
}

.list-group-item .word {
    @apply text-primary;
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
  @apply text-primary;
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
