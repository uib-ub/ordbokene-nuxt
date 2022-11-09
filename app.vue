<template>
  <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary inverted-focus" id="navbar-main" :aria-label="$t('label.nav')">
  <div class="container-fluid mx-lg-2">
    <NuxtLink class="navbar-brand text-white" to="/">
      <div class="small mx-1 my-1 my-lg-2">
      <div><h1 class="brand-title">Ordbøkene</h1>
      <p class="d-none d-xl-block brand-subtitle">{{$t("sub_title")}}</p>
      </div>
    </div>
      </NuxtLink>
        <div class="mx-auto">


    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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
      </ul>
      <div class="navbar-nav ml-auto">
        <div class="nav-item dropdown-center">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-current="true">
             <i :aria-label="$t('settings.locale.title')" aria-hidden="true" class="bi bi-globe"/> {{$t('name')}}
          </NuxtLink>
          <ul class="dropdown-menu navbar-dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button class="dropdown-item" @click="update_locale('eng')">English</button></li>
            <li><button class="dropdown-item" @click="update_locale('nob')">Bokmål</button></li>
            <li><button class="dropdown-item" @click="update_locale('nno')">Nynorsk</button></li>
        </ul>
        </div>
      </div>


    </div>
  </div>
</nav>
  </header>
<div class="container p-2 my-1 back-to-search" v-if="['article', 'settings', 'about', 'help', 'contact'].includes($route.name) && store.searchUrl">
<NuxtLink :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" primary/></strong> {{$t('notifications.back')}}</NuxtLink>
</div>
<main v-bind:class="{'welcome': !store.q && (route.name == 'search' || route.name == 'dict')}">
    <NuxtPage class="page-container  px-lg-3 pb-3" />

</main>

<footer class="p-3 bg-primary text-white inverted-focus">
  <div class="container d-grid pt-4 pt-md-0">
  <div class="d-inline-flex flex-column flex-sm-row align-items-center">
    <div class="d-inline-flex flex-column flex-sm-row m-1 align-items-center">
      <img class="srlogo m-1" src="./assets/Sprakradet_logo_neg.png" alt="Språkrådet, logo" />
      <img class="uiblogo mx-4 my-4 my-lg-0" src="./assets/uib-logo.svg" alt="Universitetet i Bergen, logo" />
    </div>
    <div class="pt-4 pt-md-0 text-center text-sm-start"><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('footer_description')}}</div>
  </div>
  <nav class="navbar" :aria-label="$t('menu.title')">
    <ul class="navbar-nav flex-md-row gap-3 mt-5 pt-2 pt-md-0 mt-md-2 mt-lg-4 mt-xl-0 text-center">
      <li class="nav-item">
        <NuxtLink class="nav-link p-1" :aria-current="$route.name == 'dict' && 'page'" to="/">{{$t('home')}}</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link p-1" :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink class="nav-link p-1" :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink class="nav-link p-1" :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink class="nav-link p-1" :aria-current="$route.name == 'contact' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink></li>
    </ul>
  </nav>
  </div>
</footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const i18n = useI18n()


const locale = useCookie("locale")

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




main {
  flex: 1;
}

.dict-view {
  height: 100%;
}


html, body, #__nuxt {
  height: 100% !important;
}

body {
  overflow-y: scroll;
}


.back-to-search {
  font-size: larger;
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
  background-color: var(--bs-secondary);
  color: var(--bs-white);
}


.ordbok-btn {
    border-radius: 2rem;
    padding: .25rem 1rem .25rem 1rem;
    font-weight: 600;
    background-color: var(--bs-white);
    border: solid 1px var(--bs-primary);
    -webkit-transition: background-color 100ms linear;
    -ms-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
    -webkit-transition: color 100ms linear;
    -ms-transition: color 100ms linear;
    transition: color 100ms linear;

    i {
        color: var(--bs-primary)
      }

    &:focus {
      box-shadow: 2px 2px 1px var(--bs-primary);
      border-color: var(--bs-primary);
      outline: none;
    }

    &.secondary {
      border: solid 1px var(--bs-secondary);
      &:focus {
        box-shadow: 2px 2px 1px var(--bs-secondary);
      }
      &:hover {
        background-color: rgba(var(--bs-secondary-rgb), .25);
      }

      i {
        color: var(--bs-secondary)
      }
    }

    &.light {
      border: solid 1px var(--bs-gray-600);
      &:focus {
        box-shadow: 2px 2px 1px var(--bs-gray-600);
      }

      i {
        color: var(--bs-gray-700)
      }

      &[aria-current] {
        box-shadow: 2px 2px 1px var(--bs-gray-600);
      }

      

    }

    &.borderless {
      border-color: transparent;
      background: unset;
      
      &:hover, &:focus {
      border-color: var(--bs-primary);
    }
    }

    

    &:hover {
      background-color: rgba(var(--bs-primary-rgb), .25);
    }

    &:active {
      background-color: rgba(0,0,0,.5);
    }

    &[aria-expanded=true] {
      background-color: var(--bs-primary);
      outline: none;
      color: var(--bs-white);
      &:focus {
        border: solid 1px var(--bs-secondary) !important;
        box-shadow: 2px 2px 1px var(--bs-secondary);
      
      }

      &.secondary {
        background-color: var(--bs-secondary);
        
        &:focus {
          box-shadow: 2px 2px 1px var(--bs-primary);
          border: solid 1px var(--bs-primary) !important;
        }
      }
      
      i {
        color: var(--bs-white) !important;
      }
      
    }
}


footer nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-variant: all-small-caps;
  font-weight: 600;

  .nav-item {
    padding-bottom: 0.25rem;
    list-style-type: none;
    a {
      color: var(--bs-white) !important;
    }
  }
  
}


header nav {
  .nav-link {
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;
    letter-spacing: .1rem;
    font-weight: 600;
    list-style-type: none;
    color: var(--bs-white);
    padding-top: .5rem;
    padding-bottom: .75rem;

    &:focus {
      color: var(--bs-white)
    }

    &:hover {
      background-color: rgba(255,255,255, .1);
      border-bottom: solid 0.125rem var(--bs-white) !important;
      color: var(--bs-white);
      padding-bottom: .5rem;
    }
    &[aria-current=page] {
      border-bottom: solid 0.125rem var(--bs-secondary) !important;
      padding-bottom: .5rem;
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
        border-left: solid 0.25rem var(--bs-secondary);
        padding: 0rem;
        border-bottom: none !important;
        padding-left: 1rem !important;
      }
    }
  }
}


section a, .secondary-page a  {
  border-bottom: 2px solid var(--link-decoration);
}

.secondary-page {
  background-color: var(--bs-white);
  padding: 3rem !important;

  h2 {
    font-family: Inria Serif;
    color: var(--bs-primary);
    font-weight: bold;
  }

  h4 {
    color: var(--bs-primary);
    font-weight: 600;
    font-size: 1rem;
  }

  

  summary::marker {
    font-size: 1.5rem;
  }

}

.secondary-page h3, .dict-view h2 {
    color: var(--bs-primary);
    font-weight: 600;
    font-variant: all-small-caps;
    font-size: 1.75rem;
  }


.advanced-info h2 {
  font-family: Inria Serif;
  font-variant: normal;
  color: var(--bs-primary);
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
  border-left: solid 4px var(--bs-primary);
   border-top: solid 1px rgba(0,0,0, .5);
   border-bottom: solid 1px rgba(0,0,0, .5);
   border-right: solid 1px rgba(0,0,0, .5);
   margin-top: 1rem;
   margin-bottom: 1rem;
   padding: 1rem;
   background-color: var(--bs-white);
   box-shadow: 2px 2px 1px rgba(0,0,0, .5);
}

.callout i {
  color: var(--bs-primary);
  padding-right: 0.5rem;
  font-size: 1.25rem;
}

.article h5 {
  color: var(--bs-primary);
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


section {
  padding-top: 10px;
  padding-bottom: 10px
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
  color: var(--bs-primary);
  font-weight: bold;
}

li.level2>div {
  padding-left: 0.5rem;
}

ol.sub_definitions {
  padding-left: 1.25rem;
}


.article-view .article, .secondary-page {
    border-radius: 0rem;
    border: solid 1px rgba(0,0,0, .5) !important;
    box-shadow: 2px 2px 1px rgba(0,0,0, .5) !important;

}

.spinner-border {
        width: 12em;
        height: 12rem;
    }





</style>
