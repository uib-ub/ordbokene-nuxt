<template>
    <nav class="row" :aria-label="$t('label.dict_nav')">
    <div class="contrast-gradient"/>
    <ul class="mode-nav nav px-2 pt-3">
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
              :to="dict_link(store.dict)">{{$t('simple')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" 
              v-bind:class="{'active': advanced}" 
              :aria-current="advanced ? 'true' : 'false'" 
              @click="store.advanced = true"
              :to="advanced_link">{{$t('advanced')}}</NuxtLink>
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
