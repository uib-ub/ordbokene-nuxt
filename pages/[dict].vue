<template>
<div>
    <ul class="nav px-1">
  <li class="nav-item">
    <a class="nav-link py-0 active" aria-current="page" href="/">Søk i oppslagsord</a>
  </li>
  <li class="nav-item">
    <NuxtLink class="nav-link py-0" :to="$route.path+'/search'">Avansert søk</NuxtLink>
  </li>
</ul>

    <SearchForm/>
    <NuxtChild/>
</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

    </script>

<style scoped>
.nav-link {
    color: rgba(0,0,0,.8);
    letter-spacing: .1rem;
    z-index: 2;
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;
    
}

.nav-link.active {
    border-bottom: solid 2px var(--bs-secondary);
    background-color: rgba(0,0,0,.05);;
    color: black;
}

    </style>