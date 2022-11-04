<template>
    <nav class=" align-items-start" :aria-label="$t('label.dict_nav')">
      <div class="d-inline-block d-md-none w-100 mt-2">
          <button @click="search_nav_toggle = ! search_nav_toggle" class="secondary w-100 p-2 px-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapsableSearchNav" aria-controls="collapsableSearchNav" aria-expanded="false" aria-label="Toggle search navigation">
            {{$t(advanced ? 'advanced' : 'dicts.'+ store.dict)}}<BootstrapIcon icon="bi-caret-down-fill" right/>
    </button>
    <div class="collapse navbar-collapse" id="collapsableSearchNav">
      <ul class="mode-nav nav">
  <li class="nav-item center">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced && route.params.dict =='bm,nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="search_nav_toggle = false; dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && route.params.dict =='bm', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="search_nav_toggle = false; dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && route.params.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="search_nav_toggle = false; dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': advanced}" 
              :aria-current="advanced ? 'true' : 'false'" 
              @click="search_nav_toggle = false; store.advanced = true"
              :to="advanced_link">{{$t('advanced')}}</NuxtLink>
  </li>
</ul>
      
    </div>
  </div>
    <div class="contrast-gradient"/>
    <ul class="d-none d-md-flex mode-nav nav px-2 pt-3">
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced && route.params.dict =='bm,nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && route.params.dict =='bm', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': !advanced  && route.params.dict =='nn', 'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="advanced">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'welcome': !$route.params.slug}" 
              :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click(store.dict)"
              :to="dict_link(store.dict)"><BootstrapIcon v-if="advanced" icon="bi-arrow-left small" left/>{{$t('simple')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': advanced}" 
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
