<template>
<div class="dict-view">
  <nav aria-label="Dictionary navigation">
    <ul class="mode-nav nav px-2">
  <li class="nav-item" v-if="!store.advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced && store.dict =='bm,nn', 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">Begge ordbøkene</NuxtLink>
  </li>
  <li class="nav-item" v-if="!store.advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced  && store.dict =='bm', 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">Bokmålsordboka</NuxtLink>
  </li>
  <li class="nav-item" v-if="!store.advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced  && store.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">Nynorskordboka</NuxtLink>
  </li>
  <li class="nav-item" v-if="store.advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced  && store.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              @click="dict_click(store.dict)"
              :to="dict_link(store.dict)">Søk i oppslagsord</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': store.advanced}" 
              :aria-current="store.advanced ? 'true' : 'false'" 
              @click="store.advanced = true"
              :to="advanced_link">Avansert søk</NuxtLink>
  </li>
</ul>
</nav>
    <NuxtErrorBoundary @error="form_error">
    <SearchForm/>
    
  </NuxtErrorBoundary>
  <NuxtErrorBoundary @error="content_error">
    <NuxtChild/>
  </NuxtErrorBoundary>
    
</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const form_error = (error) => {
  console.log("FORM ERROR",error)
}
const content_error = (error) => {
  console.log("CONTENT ERROR", error)
}

const dict_click = (dict) => {
  store.advanced = false
  store.dict = dict
  if (store.q != store.input) {
    store.input = store.q
  }
}


const advanced_link = computed(() => {
  if (store.advanced) {
    return route.fullPath
  }
  else {
    let url = route.fullPath
    if (route.name == 'dict') {
      return `/${store.dict}?scope=${store.scope}`
    }
    else if (route.name == "dict-slug") {
      return  `/${store.dict}/search?q=${store.q}&scope=${store.scope}`
    }
    else if (!route.query.scope) {
      return url + "&scope=" + store.scope

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
    url = url + 'search?q=' + store.q
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