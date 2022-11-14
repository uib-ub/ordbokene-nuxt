<template>
    <nav class="inline-block" :aria-label="$t('label.dict_nav')">
      <div class="h-full md:hidden w-full">
          <button @click="search_nav_toggle = ! search_nav_toggle" class="ordbok-btn primary w-full p-2 px-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapsableSearchNav" aria-controls="collapsableSearchNav" aria-expanded="false" aria-label="Toggle search navigation">
            {{$t(advanced ? 'advanced' : 'dicts.'+ store.dict)}}<BootstrapIcon icon="bi-caret-down-fill" right/>
    </button>
    <div class="collapse navbar-collapse m-2" id="collapsableSearchNav">
      <ul class="inline">
  <li class="nav-item">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='bm,nn' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='bm' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='nn' ? 'true' : 'false'"
              @click="search_nav_toggle = false; dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="advanced ? 'true' : 'false'" 
              @click="search_nav_toggle = false; store.advanced = true"
              :to="advanced_link">{{$t('advanced')}}</NuxtLink>
  </li>
</ul>
      
    </div>
  </div>
    <ul class="hidden md:flex">
  <li class="nav-item" v-if="!advanced">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='bm,nn' ? 'true' : 'false'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='bm' ? 'true' : 'false'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="!advanced">
    <NuxtLink :aria-current="!advanced  && route.params.dict =='nn' ? 'true' : 'false'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item" v-if="advanced">
    <NuxtLink :aria-current="advanced ? 'false' : 'true'"
              @click="dict_click(store.dict)"
              :to="dict_link(store.dict)"><BootstrapIcon v-if="advanced" icon="bi-arrow-left small" left/>{{$t('simple')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="advanced ? 'true' : 'false'" 
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

nav {
  padding: 0;
  height: 100% !important;
}

a {
  @apply bg-tertiary bg-opacity-75;
}


@screen md {
  a {
    @apply px-3 py-2;
  }
}
  
</style>
