<template>
<footer class="p-3 bg-primary text-white">
  <div class="container grid grid-col-2 pt-4 md:pt-0">
  <div class="inline-flex  flex-col sm:flex-row items-center">
    <div class="inline-flex  flex-col sm:flex-row m-1 items-center">
      <img class="srlogo m-1" src="../assets/Sprakradet_logo_neg.png" alt="Språkrådet, logo" />
      <img class="uiblogo mx-4 my-4 lg:my-0" src="../assets/uib-logo.svg" alt="Universitetet i Bergen, logo" />
    </div>
    <div class="pt-4 md:pt-0 text-center sm:text-start"><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('footer_description')}}</div>
  </div>
  <nav class="navbar" :aria-label="$t('navigation.site')">
    <ul class="navbar-nav flex-row md:flex-col gap-3 mt-5 pt-2 md:pt-0 md:mt-2 lg:mt-4 mt-xl-0 content-center">
      <li class="nav-item">
        <NuxtLink :aria-current="$route.name == 'dict' && 'page'" to="/">{{$t('home')}}</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink :aria-current="$route.name == 'help' && 'page'" to="/help">{{$t('help')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink :aria-current="$route.name == 'about' && 'page'" to="/about">{{$t('about')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink :aria-current="$route.name == 'settings' && 'page'" to="/settings">{{$t('settings.title')}}</NuxtLink></li>
      <li class="nav-item">
        <NuxtLink :aria-current="$route.name == 'contact' && 'page'" to="/contact">{{$t('contact.title')}}</NuxtLink></li>
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
 @apply pb-0.25rem ;
list-style-type: none;
 a {
  @apply p-1;

 }
}



</style>