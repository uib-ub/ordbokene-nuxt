<template>
    <nav :aria-label="$t('label.dict_nav')">
      <div class="h-full md:hidden w-full">
          <button @click="search_nav_expanded = ! search_nav_expanded" class="w-full p-2 px-4 bg-primary-lighten content-left text-white" type="button" :aria-controls="search_nav_expanded ? 'searchNavContent' : null" :aria-expanded="search_nav_expanded">
            <CustomIcon :icon="search_nav_expanded ? 'bi-chevron-up' : 'bi-chevron-down'" left/>{{$t(advanced ? 'advanced' : `dicts.${store.dict}`)}}
    </button>
      </div>
  <ul id="searchNavContent" class="md:flex" v-bind:class="{hidden: !search_nav_expanded}">
  <li class="nav-item">
    <NuxtLink :aria-current="route.params.dict =='bm,nn' ? 'true' : 'false'"
              @click="dict_click('bm,nn')"
              :to="dict_link('bm,nn')">{{$t('dicts.bm,nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="route.params.dict =='bm' ? 'true' : 'false'"
              @click="dict_click('bm')"
              :to="dict_link('bm')">{{$t('dicts.bm')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="route.params.dict =='nn' ? 'true' : 'false'"
              @click="dict_click('nn')"
              :to="dict_link('nn')">{{$t('dicts.nn')}}</NuxtLink>
  </li>
  <li class="nav-item">
    <NuxtLink :aria-current="advanced ? 'true' : 'false'"
              @click="search_nav_expanded = false; store.advanced = true"
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
const search_nav_expanded = ref(false)

const props = defineProps({
    advanced: Boolean
})

const dict_click = (dict) => {
      store.advanced = false
      search_nav_expanded.value = false;
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
        if (route.name == 'dict' || route.name == 'dict-suggest') {
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
}


a {
  display: block;
  letter-spacing: .1rem;
  @apply px-4 pt-1 pb-0.5rem border-transparent bg-tertiary text-text;

  

  &[aria-current=true] {
    border-left: solid .25rem;
    
      @apply border-secondary;
  }
  &[aria-current=false] {
    padding-left: 1.25rem;
  }
}



button {
  font-weight: 600;
}

ul {

  @apply text-lg;
  
}


@screen md {
  a {
    
    @apply px-4 pt-1 pb-0.25rem border-transparent text-sm text-white bg-primary-lighten;
    height: 2rem;
    
  }

  .welcome a {
    @apply bg-primary-lighten-1 text-white;
  }

  a[aria-current=true] {
    border-left: none;
    padding-left: 1.25rem;
    @apply border-secondary bg-tertiary text-primary;
  }


  a[aria-current=false] {
    padding-left: 1.25rem;
    @apply border-secondary pb-0.25rem;

  }


}





  
</style>
