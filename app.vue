<template>

<div class="d-flex flex-column h-100">
      <nav role="navigation" class="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar-main">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand text-white" to="/">
      <div class="small mx-2">
      <div v-show="false"><h1>ordbøkene.no</h1></div>
      <div><h1>Ordbøkene</h1>
      <div class="d-none d-xl-block p-1">{{$t("sub_title")}}</div>
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
        <div class="nav-item dropdown">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i :aria-label="$t('settings.locale.title')" class="bi bi-globe"/> {{$t('name')}}
          </NuxtLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button class="dropdown-item" @click="update_locale('eng')">English</button></li>
            <li><button class="dropdown-item" @click="update_locale('nob')">Bokmål</button></li>
            <li><button class="dropdown-item" @click="update_locale('nno')">Nynorsk</button></li>
        </ul>
        </div>
      </div>

    </div>
  </div>
</nav>
<div class="container p-2 back-to-search" v-if="['article', 'settings', 'about', 'help', 'contact'].includes($route.name) && store.searchUrl">
<NuxtLink :to="store.searchUrl"> <strong><i class="bi bi-arrow-left primary-text" aria-hidden="true"/></strong> {{$t('notifications.back')}}</NuxtLink>
</div>
    <NuxtPage class="page-container container p-3" />


<footer class="footer mt-auto p-3 bg-primary text-white">
  <div class="container d-flex justify-content-around">
  <div class="pe-5 d-flex align-items-center">
    <img class="pe-3 srlogo" src="./assets/Sprakradet_logo_neg.png" alt="Språkrådet, logo" />
    <img class="uiblogo" src="./assets/uib-logo.svg" alt="Universitetet i Bergen, logo" />
  </div>
  <div><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('footer_description')}}
    <NuxtLink class="btn btn-outline-tertiary" :aria-current="$route.name == 'dict' && 'page'" to="/"><i class="bi bi-house-door-fill"></i> {{$t('home')}}</NuxtLink>
    <NuxtLink class="btn btn-outline-tertiary" :aria-current="$route.name == 'about' && 'page'" to="/about"><i class="bi bi-info-circle-fill"></i> {{$t('about')}}</NuxtLink>
    <NuxtLink class="btn btn-outline-tertiary" :aria-current="$route.name == 'help' && 'page'" to="/help"><i class="bi bi-question-circle-fill"></i> {{$t('help')}}</NuxtLink>
    <NuxtLink class="btn btn-outline-tertiary" :aria-current="$route.name == 'settings' && 'page'" to="/settings"><i class="bi bi-gear-fill"></i> {{$t('settings.title')}}</NuxtLink>
    <NuxtLink class="btn btn-outline-tertiary" :aria-current="$route.name == 'contact' && 'page'" to="/contact"><i class="bi bi-envelope-fill"></i> {{$t('contact.title')}}</NuxtLink>
  </div>
  </div>
<!--<div>{{store.$state}}</div>-->
</footer>
  </div>
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
    lang: i18n.locale
  }

})


const update_locale = (newLocale) => {
  i18n.locale.value = newLocale
  locale.value = newLocale
}






</script>


<style>
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


.back-to-search {
  font-size: larger;
}

h1 {
  font-family: Inria Serif;
  font-weight: bold;

}

.navbar {
  padding-top: 0.25rem;
}


.nav-link {
  font-variant-caps: all-small-caps;
  font-size: 1.25rem;
  letter-spacing: .1rem;
  font-weight: 600;
}

.navbar-expand-lg .nav-item.active {
  border-left: 0.25rem solid var(--bs-secondary);
}

.navbar-expand-lg .nav-item {
  border-left: 0.25rem solid var(--bs-primary);
  padding-left: 0.5rem;
}


@media (min-width: 992px) {
  .navbar-expand-lg .nav-item.active {
  border-bottom: 0.25rem solid var(--bs-secondary);
  border-left: 0.25rem solid var(--bs-primary);
  padding-left: 0px;
  }

  .navbar-expand-lg .nav-item {
  padding-left: 0px;
  }


}


.navbar-expand-lg .nav-item {
  border-bottom: 0.25rem solid var(--bs-primary);
}

.navbar-brand  {
  border-bottom: 0.25rem solid var(--bs-primary);
}



main a  {
  border-bottom: 2px solid var(--bs-link);
}

.secondary-page {
  background-color: white;
  padding: 3rem !important;
}

.secondary-page h2 {
  font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight:600;
}



.secondary-page h3 {
  color: var(--bs-primary);
  font-weight:600;
  font-variant: all-small-caps;
  font-weight: bold;
  font-size: 1.5rem;
}

.srlogo{
  height: 20px;
}
.uiblogo{
  height: 60px;
}

.callout {
  border-left: solid 4px var(--bs-primary);
   border-top: solid 1px rgba(0,0,0, .1);
   border-bottom: solid 1px rgba(0,0,0, .1);
   border-right: solid 1px rgba(0,0,0, .1);
   margin-top: 1rem;
   margin-bottom: 1rem;
   padding: 1rem;
   background-color: rgba(255,255,255, .5);
   box-shadow: 2px 2px 1px rgba(0,0,0, .1);
}

.callout i {
  color: var(--bs-primary);
  padding-right: 0.5rem;
  font-size: 1.25rem;
}

</style>
