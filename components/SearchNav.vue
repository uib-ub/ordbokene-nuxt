<template>
    <nav class="pb-1" :aria-label="$t('label.dict_nav')">
      <div class="inline-block md:hidden w-full mt-2">
          <button @click="search_nav_toggle = ! search_nav_toggle" class="ordbok-btn primary w-full p-2 px-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapsableSearchNav" aria-controls="collapsableSearchNav" aria-expanded="false" aria-label="Toggle search navigation">
            {{$t(advanced ? 'advanced' : 'dicts.'+ store.dict)}}<BootstrapIcon icon="bi-caret-down-fill" right/>
    </button>
    <div class="collapse navbar-collapse m-2" id="collapsableSearchNav">
      <ul class="collapsed-mode-nav nav d-block mx-2">
  <li class="nav-item">
    <NuxtLink class="nav-link py-1 pb-2" 
              :aria-current="!advanced  && route.params.dict =='bm,nn' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-1 pb-2" 
              :aria-current="!advanced  && route.params.dict =='bm' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-1 pb-2" 
              :aria-current="!advanced  && route.params.dict =='nn' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-1 pb-2" 
              :aria-current="advanced ? 'true' : 'false'" 
              @click="search_nav_toggle = false; store.advanced = true"
              :to="advanced_link">{{$t('advanced')}}</NuxtLink>
  </li>
</ul>
      
    </div>
  </div>
    <ul class="hidden md:flex mode-nav nav px-2 pt-3">
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link" 
              :aria-current="!advanced  && route.params.dict =='bm,nn' ? 'true' : 'false'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link" 
              :aria-current="!advanced  && route.params.dict =='bm' ? 'true' : 'false'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link" 
              :aria-current="!advanced  && route.params.dict =='nn' ? 'true' : 'false'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="advanced">
    <NuxtLink class="nav-link" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click(store.dict)"
              :to="dict_link(store.dict)"><BootstrapIcon v-if="advanced" icon="bi-arrow-left small" left/>{{$t('simple')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link" 
              :aria-current="advanced ? 'true' : 'false'" 
              @click="store.advanced = true"
              :to="advanced_link">{{$t('advanced')}}<BootstrapIcon v-if="!advanced" icon="bi-arrow-right small" right/></NuxtLink>
  </li>
</ul>
</nav>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const search_nav_toggle = ref(false)

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

<style scoped lang="scss" >

.nav-link {
  @apply px-3;
  padding-bottom: 0.125rem !important;
  padding-top: 0;
  letter-spacing: .1rem;
  font-variant-caps: all-small-caps;
  font-weight: 600;
  -webkit-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
  -webkit-transition: color 100ms linear;
  -ms-transition: color 100ms linear;
  transition: color 100ms linear;

  &[aria-current=true] {
    border-bottom: solid 2px;
    @apply border-secondary bg-secondary bg-opacity-25;
    padding-bottom: 0 !important;
  }

  &[aria-current=false]:hover {
    padding-bottom: 0 !important;
    border-bottom: solid 0.125rem var(--bs-primary);
    background-color: rgba(var(--bs-primary-rgb), .1);
  }

  &:focus{
    @apply bg-primary);
    outline: none !important;
    padding-bottom: 0.125rem !important;
    box-shadow: none;
    @apply text-white);

    &:hover {
      @apply text-black);
      
    }
    
    &[aria-current=true] {
      
      padding-bottom: 0 !important;
    }
  }

  &:active {
    background-color: rgba(var(--bs-primary-rgb), .5);
    padding-bottom: 0px !important;
    @apply text-black);
    outline: none !important;
    box-shadow: none !important;
    &[aria-current=true] {
      background-color: rgba(var(--bs-secondary-rgb), .5);
    }
  }
}

.collapsed-mode-nav {
  li a {
    font-size: 150%;
  }
  .nav-link {
    border-left: solid .25rem transparent;
    border-bottom: none;
    padding-bottom: .5rem !important;

    &[aria-current=true] {
      border: none;
      padding-bottom: .5rem !important;
      border-left: solid .25rem var(--bs-secondary);
      background-color: rgba(var(--bs-secondary-rgb), .1);
      &:focus {
        @apply text-white);
        @apply bg-secondary)
      }
    }
    &[aria-current=false]:hover {
      border: none;
      border-left: solid .25rem var(--bs-primary);
      background-color: rgba(var(--bs-primary-rgb), .25);
    }
    &:active, &:hover {
      padding-bottom: .5rem !important;
    }
  }
}
  
</style>
