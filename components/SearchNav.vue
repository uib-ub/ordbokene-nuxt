<template>
      <nav aria-label="Dictionary navigation">
    <ul class="mode-nav nav px-2">
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced && store.dict =='bm,nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">Begge ordbøkene</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && store.dict =='bm', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">Bokmålsordboka</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && store.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">Nynorskordboka</NuxtLink>
  </li>
  <li class="nav-item" v-if="advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && store.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click(store.dict)"
              :to="dict_link(store.dict)">Enkelt søk</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': advanced}" 
              :aria-current="advanced ? 'true' : 'false'" 
              @click="store.advanced = true"
              :to="advanced_link">Avansert søk</NuxtLink>
  </li>
</ul>
</nav>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const props = defineProps({
    advanced: Boolean
})

const dict_click = (dict) => {
      store.advanced = false
      store.dict = dict
      if (store.q != store.input) {
        store.input = store.q
      }
    }
    
    
    const advanced_link = computed(() => {
      if (route.name == 'search') {
        return route.fullPath
      }
      else {
        let url = route.fullPath
        if (route.name == 'dict') {
          return `/search`
        }
        else if (route.name == "dict-slug") {
          return  `/search?q=${store.q}&dict=${store.dict}&scope=${store.scope}`
        }
        else {
          return url
        }
      }
      
    })
    
    const dict_link = ((dict) => {
      let url = `/${dict}/`
      if (specialSymbols(store.q)) {
        return  url
      }
      if (store.q) {
        url = url + `search?q=${store.q}`
      }
      return url
      
    })

</script>


<style scoped>

.mode-nav .nav-link {
        color: rgba(0,0,0,.9);
        letter-spacing: .1rem;
        font-variant-caps: all-small-caps;
        font-size: 1.25rem;
        font-weight: 600;
    }
    
    .mode-nav .nav-link.active {
        border-bottom: solid 2px var(--bs-secondary);
        background-color: rgba(0,0,0,.05);
        color: black;
    }
    
    .welcome .mode-nav .nav-link.active {
        border-bottom: solid 2px var(--bs-secondary);
        background-color: rgba(0,0,0,.2);
        color: white;
    }
    
    .welcome .mode-nav .nav-link {
      color: white;
      text-shadow: 1px 1px 1px black;
    }
    
    
    
    .mode-nav .nav-link:hover {
      border-bottom: solid 2px var(--bs-primary);;
      background-color: rgba(0,0,0,.1);
    }
    
    .welcome .mode-nav .nav-link:hover {
      border-bottom: solid 2px;
      background-color: rgba(0,0,0,.5);
    }

</style>
