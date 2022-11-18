<template>
<header>
    <nav class="bg-primary pl-3 pr-0 lg:px-5 py-1 lg:flex content-center
      text-white" :aria-label="$t('label.nav')">
      <div class="flex content-center w-full lg:w-auto">
      <NuxtLink class="navbar-brand" to="/" :aria-current="$route.name == 'dict' && 'page'">
      <div class="mx-1 md:my-1 lg:my-3 xl:my-4">
      <div><h1 class="brand-title">Ordbøkene</h1>
      <p class="hidden xl:block brand-subtitle">{{$t("sub_title")}}</p>
      </div>
    </div>
      </NuxtLink>
      <button class="lg:hidden text-lg ml-auto  p-2 px-3 rounded-4xl active:bg-primary-darken focus:bg-primary-darken" 
              @keydown="escape_menu" 
              @click="menu_expanded = !menu_expanded">
      
      <div @keydown="escapeHtmlComment" class="hidden sm:inline">{{$t('menu.title')}}</div><BootstrapIcon class="text-xl sm:pl-2" :icon="menu_expanded ? 'bi-x' : 'bi-list'"/></button>
      </div>

      <div class="nav-buttons flex-wrap lg:flex-row content-center lg:ml-auto  mr-1" v-bind:class="{hidden: !menu_expanded}">
      
        <ul class="flex flex-col lg:flex-row lg:space-x-3 xl:space-x-8 content-center" >
        <li class="nav-item">
          <NuxtLink @click="menu_expanded=false" class="nav-link" :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink @click="menu_expanded=false" class="nav-link" :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink @click="menu_expanded=false" class="nav-link"  :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink @click="menu_expanded=false" class="nav-link" :aria-current="$route.name == 'contact' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink>
        </li>
        <li class="relative nav-item">
          <BootstrapIcon icon="bi bi-globe pr-2"/>
          <label for="locale-select" class="sr-only">{{$t('settings.locale.title')}}</label>
          <select id="locale-select" class="bg-primary text-white" v-model="i18n.locale.value" @change="update_locale">
            <option class="text-text bg-canvas" value="eng" :selected="i18n.locale.value=='eng' || null">English</option>
            <option class="text-text bg-canvas" value="nob" :selected="i18n.locale.value=='nob' || null">Bokmål</option>
            <option class="text-text bg-canvas" value="nno" :selected="i18n.locale.value=='nno' || null">Nynorsk</option>
          </select> 
        </li>
      </ul>
      
 
      </div>

    </nav>
  </header>
    
</template>


<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const i18n = useI18n()

const locale_expanded = ref(false)
const menu_expanded = ref(false)
const locale = useCookie('currentLocale')

const escape_menu = (event) => {
  console.log(event.key)
  if (event.key == "Escape" || event.key == "Esc") {
    menu_expanded.value = false
  }
}

useHead({
    htmlAttrs: {
      lang: {nob: 'nb', nno: 'nn', eng: 'en'}[i18n.locale.value]
    },
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ordbøkene.no` : 'ordbøkene.no';
    }
})

const update_locale = () => {
  locale_expanded.value = false
  locale.value = i18n.locale.value
  useHead({
    htmlAttrs: {
      lang: {nob: 'nb', nno: 'nn', eng: 'en'}[i18n.locale.value]
    }
})
}


</script>

<style scoped lang="scss">


 nav {
  #locale-select {
    font-variant-caps: all-small-caps;
    letter-spacing: .1rem;
    font-weight: 600;
    font-size: 1.25rem;
    cursor: pointer;

  }
  .nav-link {
    
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;
    letter-spacing: .1rem;
    font-weight: 600;
    list-style-type: none;

    padding-top: .5rem;
    padding-bottom: .75rem;

    &:focus {
      @apply text-white;
    }

    &:hover {
      
      border-bottom: solid 0.125rem !important;
      @apply text-white border-white;
      padding-bottom: .5rem;
    }
    &[aria-current=page] {
      border-bottom: solid 0.125rem !important;
      padding-bottom: .5rem;
      @apply border-secondary !important;
    }
  }

  @media (max-width: 992px) {
    .nav-link {
      padding-left: 1.25rem;
      border-bottom: none !important;
      &:hover {
        border-left: solid 0.125rem rgba(255,255,255, .5);
        background-color: rgba(255,255,255, .1);
        border-bottom: none !important;
        padding-left: 1rem !important;
      }

      &[aria-current=page] {
        border-left: solid 0.25rem;
        padding: 0rem;
        border-bottom: none !important;
        padding-left: 1rem !important;
        @apply border-secondary;
      }
    }
  }
}

</style>