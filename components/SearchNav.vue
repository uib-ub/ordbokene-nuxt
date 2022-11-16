<template>
    <nav :aria-label="$t('label.dict_nav')">
      <div class="h-full md:hidden w-full">
          <button @click="search_nav_expanded = ! search_nav_expanded" class="w-full p-2 px-4 bg-tertiary" type="button" data-bs-toggle="collapse" aria-controls="searchNavContent" :aria-expanded="search_nav_expanded" aria-label="Toggle search navigation">
            <BootstrapIcon :icon="search_nav_expanded ? 'bi-chevron-down' : 'bi-chevron-up'" left primary/>{{$t(advanced ? 'advanced' : 'dicts.'+ store.dict)}}
    </button>
      </div>

  <ul id="searchNavContent" class="md:flex bg-secodary" v-bind:class="{expanded: search_nav_expanded}">
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
const search_nav_expanded = ref(false)

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
}


a {
  display: block;
  font-variant: all-small-caps;
  font-weight: 600;
  letter-spacing: .1rem;
  @apply px-4 pt-1 pb-0.5rem border-transparent;

  

  &[aria-current=true] {
    border-left: solid .25rem;
    
      @apply border-secondary;
  }
  &[aria-current=false] {
    padding-left: 1.25rem;
  }
}

.expanded {
  display: none;
  
}

button {
  font-weight: 600;
}

ul {

  @apply text-xl;
  
}


@screen md {
  a {
    
    @apply px-4 pt-0.25 pb-0.25rem border-transparent text-base;
    height: 2rem;
    
  }

  .welcome a {
    @apply bg-tertiary;
  }

  a[aria-current=true] {
    border-bottom: solid .17rem;
    border-left: none;
    padding-left: 1.25rem;
    @apply border-secondary pb-0.17rem bg-tertiary-darken1;
  }

  a[aria-current=false] {
    padding-left: 1.25rem;
    @apply border-secondary pb-0.25rem;

  }

  .expanded {
    display: unset;
  }
}







  
</style>
