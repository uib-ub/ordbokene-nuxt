<template>
  <Header/>
<div class="ord-container p-2 my-1 back-to-search" v-if="['article', 'settings', 'about', 'help', 'contact'].includes($route.name)">
  <NuxtLink v-if="store.searchUrl" :to="store.searchUrl"> <strong><BootstrapIcon icon="bi-arrow-left" primary/></strong> {{$t('notifications.back')}}</NuxtLink>
<NuxtLink v-else to="/"> <strong><BootstrapIcon icon="bi-arrow-left" primary/></strong> {{$t('home')}}</NuxtLink>
</div>
    <NuxtPage @click="menu_expanded=false" 
              v-bind:class="{'welcome': !store.q && (route.name == 'search' || route.name == 'dict')}"/>
<Footer/>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()


useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ordbøkene.no` : 'ordbøkene.no';
    }
})


if (process.client) {
  document.addEventListener('click', () => {
  store.show_autocomplete = false
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
  background-image: url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'); // url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80');
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


section a, .secondary-page a  {
  border-bottom: 2px solid;
  @apply border-anchor;
}

.secondary-page {
  @apply bg-white mb-4 p-4 py-8 md:p-12 md:pt-10;
  
  ul {
    list-style: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
  }


  h2 {
    font-family: Inria Serif;
    @apply text-primary test-base;
    font-weight: bold;
    font-size: 2rem;
  }

  h4 {
    @apply text-primary;
    font-weight: 600;
    font-size: 1.125rem;
    padding-top: 1rem;
  }
}

.dict-view h3 {
    font-size: calc(1.3rem + .6vw);
  }


.secondary-page h3 button, .secondary-page h3, .dict-view h2 {
    @apply text-primary;
    font-weight: 600;
    font-variant: all-small-caps;
    font-size: 1.75rem;
  }

.secondary-page h3 button {
  font-size: 1.5rem;
}




.advanced-info h2 {
  font-family: Inria Serif;
  font-variant: normal;
  @apply text-primary;
  font-weight: bold;
}


.srlogo{
  width: 156px;
  height: 28px;
}
.uiblogo{
  height: 80px;
  width: 80px
}

.callout {
  border-left: solid 4px theme("colors.primary.DEFAULT");

   margin-top: 1rem;
   margin-bottom: 1rem;
   padding: 1rem;
   @apply bg-tertiary-darken1;

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

li::marker {
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




</style>
