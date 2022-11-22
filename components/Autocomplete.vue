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
      store.show_autocomplete = false;
      return
    }

    const advanced = specialSymbols(q)
    const time = Date.now()
    if (advanced && (!store.autocomplete[0] || store.autocomplete[0].time < time)) {
      store.autocomplete = [{q, time, type: "advanced"}]
    }
    


    // Intercept queries containing too many words or characters
    let words = q.split(/ |\|/)
    if (words.length > 20) {
      store.autocomplete = []
      store.show_autocomplete = false;
      return
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 40) {
        store.autocomplete = []
        store.show_autocomplete = false;
        return
      }
    }

    if (!advanced) {

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

        if (autocomplete_suggestions.length && store.input.trim() == q) {

          store.autocomplete = autocomplete_suggestions
          store.show_autocomplete = true;
        }
        else {
          store.show_autocomplete = false
        }


      }
    }
}


const emit = defineEmits(['dropdown-submit'])


const clearText = () => {
  store.input = ""
  input_element.value.select()
}


onBeforeMount(() => {    
    nextTick(function () {
    input_element.value.select()
  })
})



const keys = (event) => {
  
  if (store.show_autocomplete) {
    if (event.key == "ArrowDown" || event.key == "Down") {
    
    if (selected_option.value <  store.autocomplete.length -1) {
      selected_option.value += 1;
    }
    else {
      selected_option.value = 0;      
    }
    
    store.input = store.autocomplete[selected_option.value].q

    //event.stopPropagation()
    event.preventDefault()
  }
  else if (event.key == "ArrowUp" || event.key == "Up") {
    if (selected_option.value > -1) {
    
    selected_option.value -= 1;

    if (selected_option.value > -1) {
    store.input = store.autocomplete[selected_option.value].q
    
    }
    
    }
    //event.stopPropagation()
    event.preventDefault()
  }
  else if (event.key == "Escape" || event.key == "Esc") {
    selected_option.value = -1
    store.show_autocomplete = false
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
    selected_option.value = -1
    
    }

    // Scroll if necessary
    if (process.client && selected_option.value > -1) {
        document.getElementById('autocomplete-item-'+selected_option.value).scrollIntoView({block: 'nearest'})
      }
  }

}

const input_sync = (event) => {
  store.input = event.target.value
  fetchAutocomplete(store.input)
  if (event.target.value) {
    input_element.value.setAttribute('value', event.target.value)
  }
  else {
    input_element.value.removeAttribute('value')
  }
}

const dropdown_select = (q) => {
  console.log("DROPDOWN: Input from", store.input, "to", q)
  store.input= q
  store.show_autocomplete = false
  emit('dropdown-submit')
  console.log("NEXT")
  console.log("AFTER")
}


const exit_input = event => {
  if (!(event.relatedTarget && event.relatedTarget.hasAttribute('data-dropdown-item'))) {
    store.show_autocomplete = false
  }
}


watch(() => store.q, () => {
  console.log("MEDIA", document)
  // 
  if (!navigator || navigator.userAgentData? navigator.userAgentData.mobile : !window.matchMedia('(pointer: fine)').matches) {
    input_element.value.blur()
  }
  else {
    input_element.value.select()
  }
  
})



</script>

<template>
  <div class="search-container">
  <div class="input-wrapper border-1 bg-canvas border-primary flex content-center justify-between  pr-2 lg:pr-4" v-bind="{'data-dropdown-open': store.show_autocomplete > 0}">
  <div class="sr-only" id="header_info">{{$t('search_nav_hint')}}</div>
   <input class="input-element p-3 pl-6 lg:p-4 lg:px-8"
          :value="store.input"
          ref="input_element" 
          @input="input_sync"
          role="combobox" 
          :aria-activedescendant="selected_option >= 0 ? 'autocomplete-item-'+selected_option : null"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          maxlength="200"
          enterkeyhint="search"
          :aria-label="$t('search_placeholder') + $t(`dicts_inline.${store.dict}`)"
          :placeholder="$t('search_placeholder') + $t(`dicts_inline.${store.dict}`)"
          aria-describedby="header_info"
          autocomplete="off"
          autocapitalize="off"
          @keydown="keys"
          :aria-expanded="store.autocomplete.length > 0" 
          :aria-controls="store.autocomplete.length > 0 ? 'autocomplete-dropdown' : null"/>
          <button type="button" :title="$t('clear')" class="appended-button px-2 py-0" v-if="store.input.length > 0" :aria-label="$t('clear')" v-on:click="clearText"><BootstrapIcon icon="bi-x-lg"/></button>
          <button class="appended-button px-2 py-1" type="submit" v-bind:class="{'sr-only': store.advanced}" :aria-label="$t('search')"> <BootstrapIcon icon="bi-search"/></button>

  </div>
  <div class="dropdown-wrapper" v-show="store.show_autocomplete">
   <ul id="autocomplete-dropdown" role="listbox" ref="autocomplete_dropdown" aria-live="polite">
    <li v-for="(item, idx) in store.autocomplete" 
        :key="idx" 
        :aria-selected="idx == selected_option"
        role="option"
        tabindex="-1"
        :id="'autocomplete-item-'+idx"
        >
        <!-- button hidden from screen readers? -->
        <button class="w-full" data-dropdown-item tabindex="-1" @click="dropdown_select(item.q)"><span :class="item.type">{{ item.q }}</span> <span class="dict-parentheses" v-if="item.dict && store.dict =='bm,nn'">({{["bokmål","nynorsk","bokmål, nynorsk"][item.dict-1]}})</span><span v-if="item.type == 'advanced' && !store.advanced" class="badge bg-primary">{{$t('advanced')}} <BootstrapIcon icon="bi-arrow-right" /></span></button>
   </li>
  </ul>
  </div>
  </div>


</template>


<style lang="scss" scoped>

.search-container {
  position: relative;
  left: 50%;
transform: translateX(-50%);
}

.dropdown-wrapper {
  position: absolute;
  width: 100%;
  z-index: 1000;
  left: 0;
  border-radius: 0 0 2rem 2rem ;
  padding-bottom: 1.75rem;
  padding-left: .5rem;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;   
  box-shadow: 2px 2px 1px theme("colors.primary.DEFAULT");

  @apply border-primary bg-canvas block;
}


#autocomplete-dropdown {
  overflow-y: auto;
  max-height: 50vh;
  @apply px-0 mx-0 flex flex-col;
}


#autocomplete-dropdown li {
  position: relative;
  width: calc(100% - 1rem);
}


#autocomplete-dropdown button {
  text-align: left;
  @apply p-2 mx-2;

  .word {
    @apply text-primary;
    font-weight: bolder;
}
}

#autocomplete-dropdown li:not(:last-child) button {
  border-bottom: solid 1px;
  @apply border-gray-300;

}

#autocomplete-dropdown li[aria-selected=true] button {
  @apply bg-gray-50;
}

#autocomplete-dropdown button:hover  {
    @apply bg-gray-100;
}


.dict-parentheses {
    @apply text-gray-900
    font-size: 85%;
    font-weight: 400;
}

.input-wrapper {
    width: 100%;
    border-radius: 2rem;
}

.input-wrapper:focus-within {
  box-shadow: 2px 2px 1px theme("colors.primary.DEFAULT");
  
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


 

.combobox:focus-within .input-wrapper, .combobox:focus-within .autocomplete-dropdown {
  box-shadow: 2px 2px 1px var(--bs-primary);
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
  @apply bg-gray-300;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
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
