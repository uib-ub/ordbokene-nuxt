<template>
<header class="bg-primary pl-6 lg:pr-6  content-center text-white shadow-[rgba(0,_0,_0,_0.24)_0px_2px_8px]">
  <div class="flex flex-col lg:flex-row">
  <div class="flex">
  <div class="flex flex-grow py-1 items-center md:py-3 flex-auto !box-content">
  <NuxtLink :to="'/'+ i18n.locale.value" :aria-current="($route.name == 'welcome' || $route.name == 'index') && 'page'" @click="store.$reset()">
      <div> <span class="text-2xl xl:text-3xl logo-text">ordbøkene.no<span class="sr-only">, {{$t("sub_title")}}</span></span>
      <div class="text-xs xl:text-sm sr-only sm:not-sr-only" aria-hidden="true">{{$t("sub_title")}}</div>
    </div>
  </NuxtLink>
  </div>


    <div class="lg:hidden flex items-center flex-auto flex-grow-0">
      <button  type="button"
                class="text-center text-lg border-x-2 border-primary-lighten p-3"
                aria-controls="locale_menu"
                @click="toggle_locale_menu">
        <span class="relative">
        <span v-if="!locale_expanded"><span aria-hidden="true" class="absolute text-xs right-2 top-3 bg-primary rounded px-1 select-none">{{locale2lang[$i18n.locale].toUpperCase()}}</span><BiGlobe2 name="globe" class="text-2xl"/></span>
        <BiXLg v-else class="text-2xl"/>
        <span class="sr-only">
          <span lang="no">Nettsidespråk, </span>
          <span v-for="({button, lang}) in localeConfig.filter(item => item.button)" :key="lang" :lang="lang">, {{button}}</span>
        </span>
        </span>
      </button>
   

        <button type="button"
                class="flex text-center items-center text-lg p-3"
                :aria-expanded="menu_expanded"
                :aria-controls="menu_expanded? 'main_menu' : null"
                @click="toggle_menu">
          <span class="sr-only sm:inline sm:not-sr-only">{{$t('menu')}}</span><component :is="menu_expanded ? BiXLg : BiList" class="sm:ml-2 text-2xl"/>
        </button>
      </div>

      </div>

   

    
    <div id="main_menu" class="lg:flex lg:ml-auto nav-buttons flex-wrap lg:flex-row content-center text-center"  v-bind:class="{hidden: !menu_expanded}">
      <nav class="lg:mr-4 self-center" :aria-label="$t('label.nav')">
      <ul class="flex flex-col lg:flex-row gap-8 lg:gap-6 lg:space-x-3 xl:space-x-8 content-center my-6 lg:my-0 text-lg" >
        <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'help' && 'page'" :to="`/${$i18n.locale}/help`">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'about' && 'page'" :to="`/${$i18n.locale}/about`">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link"  :aria-current="$route.name == 'settings' && 'page'" :to="`/${$i18n.locale}/settings`">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'contact' && 'page'" :to="`/${$i18n.locale}/contact`">{{$t('contact')}}</NuxtLink>
        </li>

      </ul>
    </nav>
    <button  type="button" class="ml-6 hidden lg:flex" :title="$t('settings.locale.title')" @click="toggle_locale_menu" :aria-expanded="locale_expanded" aria-controls="locale_menu">
        <span class="relative">
        <span v-if="!locale_expanded"><span aria-hidden="true" class="absolute text-xs right-2 top-3 bg-primary rounded px-1 select-none">{{locale2lang[$i18n.locale].toUpperCase()}}</span><BiGlobe2 class="text-2xl"/></span>
        <BiXLg v-else class="text-2xl"/>
        <span class="sr-only">
          <span lang="no">Nettsidespråk, </span>
          <span v-for="({button, lang}) in localeConfig.filter(item => item.button)" :key="lang" :lang="lang" class="">, {{button}}</span>
        </span>
        </span>
      </button>
      <div>
      </div>
    
      </div>
  </div>


        <nav v-if="locale_expanded" :aria-label="$t('')" id="locale_menu" class="flex flex-col lg:gap-8 my-8 container container mx-auto">
          <h2 class="text-xl"><span>
          <span lang="no">Nettsidespråk</span>
          <span v-for="({button, lang}) in localeConfig.filter(item => item.button)" :key="lang" :lang="lang">| {{button}}</span>
        </span></h2>
          <ul class="flex flex-col gap-8 lg:gap-6 my-6 lg:my-0">

          <li v-for="item in locales" :key="item.id" class="nav-item flex flex-col gap-2" :lang="item.lang">
            <div class="flex">
            <a      :href="item.route"
                          class="nav-link !pt-0 text-lg"
                          :aria-describedby="item.lang + '_description'"
                          :aria-current="$i18n.locale==item.locale"
                          @click.prevent="change_locale(item.locale)">
                        <BiGlobe2 class="mr-2 mb-1"/>
                        <span>{{item.label}}</span>
                        <span><BiCheck2 v-if="$i18n.locale==item.locale" class="ml-2"/></span>
                        
                  </a></div>

                <span :id="item.lang + '_description'" class="">{{item.description}}</span>
                   
          </li>
        </ul>
      </nav> 

  </header>

</template>


<script setup>
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useSearchStore()
const route = useRoute()
const i18n = useI18n()
const menu_expanded = ref(false)
const locale_expanded = ref(false)
const locale_cookie = useCookie('currentLocale', {maxAge: 31536000})

const locale_menu = ref();
const BiXLg = resolveComponent('BiXLg')
const BiList = resolveComponent('BiList')


  watch(route, value => {
    menu_expanded.value = false
    locale_expanded.value = false
  }, {deep: true, immediate: true})

const change_locale = (lang) => {
  i18n.locale.value = lang
  locale_cookie.value = lang
  locale_expanded.value = false
  return navigateTo(localizeUrl(route.fullPath, lang))
}

const locales = ref(localeConfig.map(item => { return {route: localizeUrl(route.fullPath, item.locale), 
                                                  command: () => {change_locale(item.locale)}, 
                                                  ...item}}));


if (process.client) {
  document.addEventListener('keyup', (e) => {
    if (e.key == "Escape" || e.key == "Esc") {
      menu_expanded.value = false
      locale_expanded.value = false
  }
})
}

const toggle_locale_menu = () => {
  locale_expanded.value = !locale_expanded.value
    menu_expanded.value = false
}

const toggle_menu = () => {
  menu_expanded.value = !menu_expanded.value
  locale_expanded.value = false
}


</script>

<style scoped>


.logo-text {
    font-family: Inria Serif;
    @apply font-bold;
}

nav .nav-link {
  @apply pt-2 list-none;
}



nav .nav-link:focus {
  @apply text-white border-white;
}

nav .nav-link:hover {
  @apply underline decoration-2 underline-offset-4;
  
}
nav .nav-link[aria-current=page] {
  border-bottom: solid .125rem theme('colors.secondary.DEFAULT');
}

@media screen(lg) {
    .nav-buttons.hidden {
      @apply flex;
  }
}



</style>
