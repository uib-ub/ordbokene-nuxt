<template>
  <div class="nav-container p-1 sm:mx-3 flex flex-col">
    <button aria-controls="ordbok-nav" :aria-expanded="ordbok_nav_expanded" class="sm:hidden text-left px-3 py-1 my-1" @click="ordbok_nav_expanded = !ordbok_nav_expanded">{{$t('label.dict_nav')}}<BiChevronUp v-if="ordbok_nav_expanded" class="text-primary ml-2 mb-1"/><BiChevronDown v-else class="text-primary ml-2 mb-1"/></button>
    <nav class="sm:flex inline-block md:justify-center mt-1 sm:!my-2 box-content px-2 md:pr-0" :class="!ordbok_nav_expanded && 'hidden sm:visible'" :aria-label="$t('label.dict_nav')">
  <ul class="flex flex-col sm:flex-row sm:gap-2 md:gap-3 mr-2 mb-4 sm:mb-0">
  <li>
    <NuxtLink class="inline-block"
              :aria-current="store.dict =='bm,nn' ? 'true' : 'false'"
              :to="dict_link('bm,nn')"
              :aria-label="$t('dicts.bm,nn')"
              @click="dict_click('bm,nn')"><span class="hidden sm:block md:hidden">{{$t('dicts_short.bm,nn')}}</span><span class="block sm:hidden md:block">{{$t('dicts.bm,nn')}}</span><BiCheck2 v-if="store.dict =='bm,nn'" class="text-[1.25em] mt-1 ml-1 sm:hidden"/></NuxtLink>
  </li>
  <li>
    <NuxtLink  :aria-current="store.dict =='bm' ? 'true' : 'false'"
              :to="dict_link('bm')"
              :aria-label="$t('dicts.bm')"
              @click="dict_click('bm')"><span class="hidden sm:block md:hidden">{{$t('dicts_short.bm')}}</span><span class="block sm:hidden md:block">{{$t('dicts.bm')}}</span><BiCheck2 v-if="store.dict =='bm'" class="text-[1.25em] mt-1 ml-1 sm:hidden"/></NuxtLink>
  </li>
  <li>
    <NuxtLink :aria-current="store.dict =='nn' ? 'true' : 'false'"
              :to="dict_link('nn')"
              :aria-label="$t('dicts.nn')"
              @click="dict_click('nn')"><span class="hidden sm:block md:hidden">{{$t('dicts_short.nn')}}</span><span class="block sm:hidden md:block">{{$t('dicts.nn')}}</span><BiCheck2 v-if="store.dict =='nn'" class="text-[1.25em] mt-1 ml-1 sm:hidden"/></NuxtLink>
  </li>
  <li>
    <NuxtLink :aria-current="advanced ? 'true' : 'false'"
              :to="advanced_link"
              class="!pr-1">{{$t('advanced')}} <BiArrowRightShort class="text-primary  text-[1.5em] self-center"/></NuxtLink>
  </li>
</ul>
</nav>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSearchStore } from '~/stores/searchStore'

const i18n = useI18n()
const store = useSearchStore()
const route = useRoute()
const props = defineProps({
    advanced: Boolean
})

const ordbok_nav_expanded = ref(false)
const BiChevronUp = resolveComponent('BiChevronUp')
const BiChevronDown = resolveComponent('BiChevronDown')

const dict_click = (dict) => {
      store.dict = dict
      store.lemmas.bm = new Set()
      store.lemmas.nn = new Set()
      if (store.q !== store.input) {
        store.input = route.query.orig || store.q
      }
    }
    
    
    const advanced_link = computed(() => {
       if (store.q) {
        return  `/${i18n.locale.value}/search?q=${store.q}&dict=${store.dict || 'bm,nn'}&scope=${store.scope || 'ei'}`
       }
       else {
        return `/${i18n.locale.value}/search`
       }
       
      
      
    })
    
    const dict_link = ((dict) => {
      let url = `/${i18n.locale.value}/${dict}`
      if (route.query.orig) {
        url += "/" + route.query.orig
      }
      else if (store.q) {
        url += "/" + store.q
      }
        return url
    })

</script>

<style scoped>

button {
  @apply font-semibold;
}

ul {
  @apply text-lg;
}

a {
@apply flex pt-2 pb-2 sm:py-1 px-4 md:text-sm text-gray-900 bg-tertiary border-gray-700 border-none sm:border md:border-none whitespace-nowrap sm:rounded;


}

a[aria-current=true] {
  @apply sm:bg-gray-700 sm:border-gray-700 sm:text-white;
}

  /* Hide scrollbar for Chrome, Safari and Opera */
.nav-container::-webkit-scrollbar {
  @apply hidden;
}

li:first-child {
    border-top: solid 1px theme('colors.gray.300');
}

li:not(:last-child) {
    border-bottom: solid 1px theme('colors.gray.300');
    @apply sm:!border-none;
}



</style>
