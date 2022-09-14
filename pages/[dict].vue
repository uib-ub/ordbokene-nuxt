<template>
<div class="dict-view">
    <ul class="nav px-2">
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !store.advanced, 'welcome': !$route.params.slug}" 
              :aria-current="store.advanced ? 'false' : 'true'"
              v-on:click="store.advanced = false; " 
              :to="simple_link">Søk i oppslagsord</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': store.advanced}" 
              :aria-current="store.advanced ? 'true' : 'false'" 
              v-on:click="store.advanced = true"  
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
  let url = `/${store.dict}/search?`
  if (store.q) {
    url = url + 'q=' + store.q + "&"
  }
  return url + "scope="+store.scope
  
})

const simple_link = computed(() => {

  let url = `/${store.dict}/`
  if (store.q) {
    url = url + 'submit?q=' + store.q
  }
  return url
  
})



</script>

<style scoped>
.nav-link {
    color: rgba(0,0,0,.8);
    letter-spacing: .1rem;
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;
    font-weight: 600;
}

.nav-link.active {
    border-bottom: solid 2px var(--bs-secondary);
    background-color: rgba(0,0,0,.05);
    color: black;
}

.welcome .nav-link.active {
    border-bottom: solid 2px var(--bs-secondary);
    background-color: rgba(0,0,0,.2);
    color: white;
}

.welcome .nav-link {
  color: white;
}

    </style>