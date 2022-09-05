<template>

<div class="d-flex flex-column h-100">
      <nav role="navigation" class="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar-main">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand text-white" to="/">
      <div class="small mx-2">
      <div v-show="false"><h1>ordbøkene.no</h1></div>
      <div><h1>Ordbøkene</h1>
      <p class="d-none d-sm-block">{{$t("sub_title")}}</p>
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
          <NuxtLink class="nav-link" aria-current="page" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item" v-bind:class="{'active': $route.name == 'about'}">
          <NuxtLink class="nav-link" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'settings'}">
          <NuxtLink class="nav-link"  to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item" v-bind:class="{'active': $route.name == 'contact'}">
          <NuxtLink class="nav-link" to="/contact">{{$t('contact.title')}}</NuxtLink>
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
<div>{{store.$state}}</div>
</footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const locale = useCookie("locale")

// Default to bokmål on odd days
locale.value = locale.value || (new Date().getDate() % 2 ? 'nno' : 'nob')
i18n.locale.value = locale.value


import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

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
/*input[type="text"]:focus,input[type="radio"]:focus,.btn:focus,input[type="checkbox"]:focus{
  box-shadow: none;
}*/

html, body, #__nuxt {
  height: 100% !important;
}

body {
  overflow-y: scroll;
}

.visually-hidden {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
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
  border-bottom: 1px solid var(--bs-link);
}

.secondary-page {
  background-color: white;
}

.secondary-page h2 {
  font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight:600;
}

.secondary-page h3 {
  color: var(--bs-primary);
  font-weight:600;
  text-transform: uppercase;
  font-size: 1rem;
}


</style>