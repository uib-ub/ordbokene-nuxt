<template>
<footer class="p-3 bg-primary text-white">
  <div class="container d-grid pt-4 pt-md-0">
  <div class="d-inline-flex flex-column flex-sm-row align-items-center">
    <div class="d-inline-flex flex-column flex-sm-row m-1 align-items-center">
      <img class="srlogo m-1" src="../assets/Sprakradet_logo_neg.png" alt="Språkrådet, logo" />
      <img class="uiblogo mx-4 my-4 my-lg-0" src="../assets/uib-logo.svg" alt="Universitetet i Bergen, logo" />
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

<style scoped>

nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-variant: all-small-caps;
  font-weight: 600;

}

.nav-item {
padding-bottom: 0.25rem;
list-style-type: none;

}

a {
    color: var(--bs-white) !important;
}


</style>