<template>
  <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar-main" :aria-label="$t('label.nav')">
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
      <ul class="navbar-nav navbar-secondary-pages ms-auto mb-2 mb-lg-0">
        <li class="nav-item" v-bind:class="{'active': $route.name == 'help'}">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item" v-bind:class="{'active': $route.name == 'about'}">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'settings'}">
          <NuxtLink class="nav-link"  :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'contact'}">
          <NuxtLink class="nav-link" :aria-current="$route.name == 'contacthelp' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink>
        </li>
      </ul>
      <div class="navbar-nav ml-auto">
        <div class="nav-item dropdown-center">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
<NuxtLink :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" color="primary"/></strong> {{$t('notifications.back')}}</NuxtLink>
</div>
<main v-bind:class="{'welcome': !store.q && (route.name == 'search' || route.name == 'dict')}">
    <NuxtPage class="page-container  px-3 pb-3" />

</main>

<footer class="p-3 bg-primary text-white">
  <div class="container d-flex flex-column flex-md-row">
  <div class="text-width mb-3 mb-xl-2">
    <div class="d-flex align-items-center">
      <img class="pe-5 srlogo" src="./assets/Sprakradet_logo_neg.png" alt="Språkrådet, logo" />
      <img class="uiblogo" src="./assets/uib-logo.svg" alt="Universitetet i Bergen, logo" />
    </div>
    <div class="pt-4 pt-md-0"><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('footer_description')}}</div>
  </div>
  <nav class="navbar footer-navbar" :aria-label="$t('menu.title')">
    <span aria-hidden="true" class="footer-nav menu-title d-md-none pb-2 mt-4">{{$t('menu.title')}}:</span>
    <ul class="navbar-nav navbar-secondary-pages">
      <li class="footer-nav-item">
        <NuxtLink class="nav-link py-1" :aria-current="$route.name == 'dict' && 'page'" to="/">{{$t('home')}}</NuxtLink>
      </li>
      <li class="footer-nav-item">
        <NuxtLink class="nav-link py-1" :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink></li>
      <li class="footer-nav-item">
        <NuxtLink class="nav-link py-1" :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink></li>
      <li class="footer-nav-item">
        <NuxtLink class="nav-link py-1" :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink></li>
      <li class="footer-nav-item">
        <NuxtLink class="nav-link py-1" :aria-current="$route.name == 'contact' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink></li>
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

await Promise.all([$fetch('https://odd.uib.no/opal/dev/bm/concepts.json'), $fetch('https://odd.uib.no/opal/dev/nn/concepts.json')]).then(response => {
  store.concepts_bm = response[0].concepts
  store.concepts_nn = response[1].concepts
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


<style>
*:focus{
  outline: solid white 1px;
  box-shadow: 0px 0px 1px 2px black;
  border-radius: 5px;
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

.btn-outline-tertiary{
  border: none;
}

::selection {
  background-color: var(--bs-secondary);
  color: white;
}

html, body, #__nuxt {
  height: 100% !important;
}

body {
  overflow-y: scroll;
}




.navbar-dropdown-menu{
  min-width: 8rem !important;
}

.back-to-search {
  font-size: larger;
}

h1 {
  font-family: Inria Serif;
  font-weight: bold;

}


.text-width{
  width: 60%;
}
.footer-navbar{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.footer-nav{
  text-transform: uppercase;
  letter-spacing: .1rem;
  font-weight: 600;
}

.navbar .footer-nav-item {
  padding-bottom: 0.25rem;
  list-style-type: none;
}

.navbar .nav-item {
  padding-bottom: 0.25rem;
  font-variant-caps: all-small-caps;
  font-size: 1.25rem;
  letter-spacing: .1rem;
  font-weight: 600;
  list-style-type: none;
}

.navbar .nav-link{
  color: white;
}
.navbar .nav-link:hover {
  color: white;
}

.navbar-secondary-pages .nav-item:hover,.navbar-secondary-pages .footer-nav-item:hover {
  border-bottom: solid 0.25rem rgba(255,255,255, .5);
  background-color: rgba(255,255,255, .1);
  padding-bottom: 0rem;
}

.navbar-secondary-pages .nav-item.active,.navbar-secondary-pages .footer-nav-item.active {
  border-bottom: solid 0.25rem var(--bs-secondary);
  padding-bottom: 0rem;
}

@media (min-width: 768px) {
  .text-width {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    width: 100%;
  }

  footer .flex-md-row {
    flex-direction: column !important;
  }

  .footer-navbar {
    flex-direction: row !important;
    justify-content: center;
    margin-top: 0.5rem;
  }

  footer ul {
    flex-direction: row !important;
    gap: 2rem;
    
    
  }
  footer li {
    font-variant: all-small-caps;
    font-size: 1.25rem !important;
  }
}

@media (max-width: 992px) {
  .nav-item {
    padding-left: 1.25rem;
  }
  .navbar-secondary-pages .nav-item {
    font-variant-caps: all-small-caps;
    border-bottom: 0px;
    padding: 0rem;
    padding-left: 1.25rem;
  }


  .navbar-secondary-pages .nav-item:hover {
    border-left: solid 0.25rem rgba(255,255,255, .5);
    background-color: rgba(255,255,255, .1);
    padding-left: 1rem;
    border-bottom: 0rem;
    
  }

  .navbar-secondary-pages .nav-item.active {
    border-left: solid 0.25rem var(--bs-secondary);
    padding: 0rem;
    padding-left: 1rem;
    border-bottom: 0rem;
  }

}

@media(max-width: 768px) {
.text-width{
  width: 100%;
}
.menu-title{
  margin-top: 1rem;
}
}


.navbar-brand  {
  border-bottom: 0.25rem solid var(--bs-primary);
}



section a, .secondary-page a  {
  border-bottom: 2px solid var(--bs-link);
}

.secondary-page {
  background-color: white;
  padding: 3rem !important;
}

.container.secondary-page {
  border-bottom: none !important;
  border-top: none !important;
}



.secondary-page h2 {
  font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight: bold;
}

.secondary-page h4 {
  color: var(--bs-primary);
  font-weight: 600;
  font-size: 1rem;
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

.secondary-page summary::marker {
  font-size: 1.5rem;
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
   background-color: rgba(255,255,255, .5);
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


</style>
