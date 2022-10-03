<template>
<div class="dict-view">
    <ul class="mode-nav nav px-2">
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced, 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              @click="store.advanced = false"
              :to="simple_link">Søk i oppslagsord</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': store.advanced}" 
              :aria-current="store.advanced ? 'true' : 'false'" 
              @click="store.advanced = true"
              :to="advanced_link">Avansert søk</NuxtLink>
  </li>
</ul>
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


const advanced_link = computed(() => {
  if (store.advanced) {
    return route.fullPath
  }
  else {
    let url = route.fullPath
    if (route.name == 'dict') {
      return `/${store.dict}?${store.q? store.q + '&' : ''}scope=${store.scope}`
    }
    else if (!route.query.scope) {
      return url + "&scope=" + store.scope

    }
    else {
      return url
    }
  }
  
})

const simple_link = computed(() => {
  let url = `/${store.dict}/`
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
    color: rgba(0,0,0,.8);
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
}



.mode-nav .nav-link:hover {
  border-bottom: solid 2px;
  background-color: rgba(0,0,0,.1);
}

    </style>