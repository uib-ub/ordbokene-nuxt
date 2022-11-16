<template>
  <header>
    <nav class="bg-primary pl-3 pr-0 lg:px-5 py-1 md:flex
      text-white" :aria-label="$t('label.nav')">
      <div class="flex content-center w-full lg:w-auto">
      <NuxtLink class="navbar-brand" to="/" :aria-current="$route.name == 'dict' && 'page'">
      <div class="mx-1 md:my-1 lg:my-3 xl:my-4">
      <div><h1 class="brand-title">Ordbøkene</h1>
      <p class="hidden xl:block brand-subtitle">{{$t("sub_title")}}</p>
      </div>
    </div>
      </NuxtLink>
      <button class="lg:hidden text-lg ml-auto  p-2 px-3 rounded-4xl active:bg-primary-darken focus:bg-primary-darken" @click="menu_expanded = !menu_expanded">
      
      <div class="hidden sm:inline">{{$t('menu.title')}}</div><BootstrapIcon class="text-xl sm:pl-2" :icon="menu_expanded ? 'bi-x' : 'bi-list'"/></button>
      </div>

      <div class="nav-buttons flex-wrap lg:flex-row content-center lg:ml-auto  mr-1" v-bind:class="{hidden: !menu_expanded}">
      

        <ul class="flex flex-col lg:flex-row lg:space-x-3 xl:space-x-8 content-center" >
        <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link"  :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'contact' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink>
        </li>
        <li class="relative">
          
          <button @click="locale_expanded=!locale_expanded" :aria-controls="locale_expanded ? 'locale-dropdown' : null" :aria-expanded="locale_expanded">
             <BootstrapIcon :aria-label="$t('settings.locale.title')" icon="bi bi-globe" left/>{{$t('name')}}
          </button>
          <ul id="locale-dropdown" class="dropdown-list" v-if="locale_expanded">
            <li><button :aria-current="i18n.locale.value == 'eng'" @click="update_locale('eng')">English</button></li>
            <li><button :aria-current="i18n.locale.value == 'nob'" @click="update_locale('nob')">Bokmål</button></li>
            <li><button :aria-current="i18n.locale.value == 'nno'" @click="update_locale('nno')">Nynorsk</button></li>
        </ul>

        </li>
      </ul>
      
 
      </div>

    </nav>
  </header>
<div class="ord-container p-2 my-1 back-to-search" v-if="['article', 'settings', 'about', 'help', 'contact'].includes($route.name) && store.searchUrl">
<NuxtLink :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" primary/></strong> {{$t('notifications.back')}}</NuxtLink>
</div>
    <NuxtPage v-bind:class="{'welcome': !store.q && (route.name == 'search' || route.name == 'dict')}"/>


<Footer/>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const i18n = useI18n()


const locale = useCookie("locale")

const locale_expanded = ref(false)
const menu_expanded = ref(false)

// Default to bokmål on odd days
locale.value = locale.value || (new Date().getDate() % 2 ? 'nno' : 'nob')
i18n.locale.value = locale.value

useHead({
    htmlAttrs: {
      lang: {nob: 'nb', nno: 'nn', eng: 'en'}[i18n.locale.value]
    },
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ordbøkene.no` : 'ordbøkene.no';
    }
})

const update_locale = (newLocale) => {
  i18n.locale.value = newLocale
  locale.value = newLocale
  locale_expanded.value = false
  useHead({
    htmlAttrs: {
      lang: {nob: 'nb', nno: 'nn', eng: 'en'}[i18n.locale.value]
    }
})
}


</script>


<style lang="scss">

#__nuxt {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

body {
  overflow-y: scroll;
}


body, html, main {
  height: 100% !important;
}

body {
  @apply bg-tertiary;
}

main {
  flex: 1;
}

@screen md {
  main.welcome {
  background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80');
  @apply flex-col content-between;
  }



  
}




.ord-container, .secondary-page {
  @apply container mx-auto px-2;
}



h1 {
  font-family: Inria Serif;
  font-weight: bold;

}


.brand-title {
  font-size: 2rem;
  margin-bottom: 0.125rem;
}

.brand-subtitle {
  margin-left: 0.125rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}


::selection {
  @apply bg-secondary text-white;
}


.btn-primary, .btn-secondary, .btn-borderless {
    border-radius: 2rem;
    padding: .25rem 1rem .25rem 1rem;
    font-weight: 600;
    
    -webkit-transition: background-color 100ms linear;
    -ms-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
    -webkit-transition: color 100ms linear;
    -ms-transition: color 100ms linear;
    transition: color 100ms linear;
}

.btn-primary {
  @apply bg-white border-1 border-primary;
  i {
    @apply primary;
  }
}

.btn-primary:focus, .btn-borderless:focus, .btn-primary:active, .btn-borderless:active {
  @apply bg-primary bg-opacity-25;
}

.btn-secondary {
  @apply bg-white border-1 border-secondary;

  &:focus, &:active {
    @apply bg-secondary bg-opacity-25;

  }
}

.btn-light {
  @apply bg-white border-1 border-secondary;
}





.ordbok-btn[aria-expanded=true] {

    @apply bg-primary text-white border-1 border-primary;

}


@screen lg {
  .nav-buttons.hidden {
    display: flex;
}

}



header nav {
  .nav-link {
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;
    letter-spacing: .1rem;
    font-weight: 600;
    list-style-type: none;
    @apply text-white;
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


section a, .secondary-page a  {

  border-bottom: 2px solid;
  @apply border-anchor;
}

.secondary-page {
  @apply bg-white;
  padding: 3rem !important;

  h2 {
    font-family: Inria Serif;
    @apply text-primary;
    font-weight: bold;
  }

  h4 {
    @apply text-primary;
    font-weight: 600;
    font-size: 1rem;
  }

  

  summary::marker {
    font-size: 1.5rem;
  }

}

.dict-view h3 {
    font-size: calc(1.3rem + .6vw);
  }


.secondary-page h3, .dict-view h2 {
    @apply text-primary;
    font-weight: 600;
    font-variant: all-small-caps;
    font-size: 1.75rem;
  }




.advanced-info h2 {
  font-family: Inria Serif;
  font-variant: normal;
  @apply text-primary;
  font-weight: bold;
}


.srlogo{
  height: 1.75rem;
  width: fit-content;
}
.uiblogo{
  height: 5rem;
   width: fit-content;
}

.callout {
  border-left: solid 4px theme("colors.primary.DEFAULT");
   border-top: solid 1px rgba(0,0,0, .5);
   border-bottom: solid 1px rgba(0,0,0, .5);
   border-right: solid 1px rgba(0,0,0, .5);
   margin-top: 1rem;
   margin-bottom: 1rem;
   padding: 1rem;
   @apply bg-white;
   box-shadow: 2px 2px 1px rgba(0,0,0, .5);
}

.callout i {
  @apply text-primary;
  padding-right: 0.5rem;
  font-size: 1.25rem;
}

.article h5 {
  @apply text-primary;
  font-weight: 600;
  font-size: 1rem;
  padding-top: 1rem;
}

.article .level1>ol {
  padding-left: 1.25rem;
}

.article li {
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
}

.article ul {
  margin-bottom: 1rem;
}

.article ol {
  margin-bottom: 2rem;
}


.article section {
  padding-top: .5rem;
  padding-bottom: .5rem;
}


.article section.etymology > h4, section.pronunciation > h4 {
  display: inline;
}

.article section.etymology ul, section.pronunciation ul, section.etymology li, section.pronunciation li {
  display: inline;
}

.article section.etymology li:not(:first-child):not(:last-child):before, section.pronunciation li:not(:first-child):not(:last-child):before {
  content: ", ";
}

.article section.etymology li:not(:first-child):last-child:before, section.pronunciation li:not(:first-child):last-child:before {
  content: "; ";
  font-size: smaller;
}



li.level1.definition {
  list-style: upper-alpha;
}


li.level3.definition {
  /* Norsk ordbok skal ha "lower.alpha" her */
  list-style: disc;
}

li.sub_article > ul {
  padding-left: 0px;
}

.article li::marker {
  @apply text-primary;
  font-weight: bold;
}

li.level2>div {
  padding-left: 0.5rem;
}

ol.sub_definitions {
  padding-left: 1.25rem;
}


.article-view .article, .secondary-page {
    border-radius: .25rem;
    border: solid 1px rgba(0,0,0, .5) !important;
    box-shadow: 2px 2px 1px rgba(0,0,0, .5) !important;

}

.spinner-border {
        width: 12em;
        height: 12rem;
    }




.dropdown-list {
  border-radius: 1rem;
  padding: .5rem;
  width: 100%;
  position: absolute;
  z-index: 1000;
  @apply bg-canvas text-text border-primary border-1;

}


</style>
