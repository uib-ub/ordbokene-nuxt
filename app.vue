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
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'help'}" aria-current="page" to="/help">Hjelp til søk</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'search'}" to="/bm,nn/search">Avansert søk</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'about'}" to="/about">Om ordbøkene</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'settings'}" to="/settings">Innstillinger</NuxtLink>
        </li>
                <li class="nav-item">
          <NuxtLink class="nav-link" v-bind:class="{'active': $route.name == 'contact'}" to="/contact">Kontakt oss</NuxtLink>
        </li>
        <li class="nav-item dropdown">
          <NuxtLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i class="bi bi-globe"/>Bokmål
          </NuxtLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</nav>
<br>
{{concepts_nn}}
    <NuxtPage />


  <footer>
    test
  </footer>
  </div>
</template>

<script setup>
const { concepts_nn } = await useAsyncData('count', () => $fetch('https://oda.uib.no/opal/dev/nn/concepts.json'))
const { concepts_bm } = await useAsyncData('count', () => $fetch('https://oda.uib.no/opal/dev/bm/concepts.json'))

</script>

<style>

main {
  position: relative;
  padding-left: calc((100vw - 1200px) / 2);
  padding-right: calc((100vw - 1200px) / 2);
}

</style>