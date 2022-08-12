<template>
<div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar-main">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand" to="/">Ordbøkene.no</NuxtLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'help'}" aria-current="page" to="/help">{{$t('help')}}</NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'about'}" to="/about">{{$t('about')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'settings'}" to="/settings">{{$t('settings.title')}}</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'contact'}" to="/contact">{{$t('contact.title')}}</NuxtLink>
        </li>
      </ul>
      <div class="navbar-nav ml-auto">
        <div class="nav-item dropdown">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i :aria-label="$t('settings.locale.title')" class="bi bi-globe"/> {{$t('name')}}
          </NuxtLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button class="dropdown-item" @click="$i18n.locale = 'eng'">English</button></li>
            <li><button class="dropdown-item" @click="$i18n.locale = 'nob'">Norsk (bokmål)</button></li>
            <li><button class="dropdown-item" @click="$i18n.locale = 'nno'">Norsk (nynorsk)</button></li>
        </ul>
        </div>
      </div>

    </div>
  </div>
</nav>

<br>
    <NuxtPage />


  <footer>
<div>test</div>
</footer>
  </div>
</template>


<style>

main, #navbar-main, footer>div {
  position: relative;
  padding-left: calc((100vw - 1200px) / 2);
  padding-right: calc((100vw - 1200px) / 2);
}

footer {
  background-color: var(--bs-primary);
  color: white;
}

</style>