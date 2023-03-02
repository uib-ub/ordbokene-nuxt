<template>
    <div v-bind:class="{'list': listView}">     
    <Spinner v-if="pending"/>
    <div ref="results"  v-if="!pending && !error && articles && articles.meta" >
    <div tabindex="0" aria-live="polite" role="status" ref="announcement" class="announcement sr-only lg:sr-only pb-2 pl-1 text-gray-900 text-md">
      <div class="sr-only" v-if="store.originalInput">Viser resultater for oppslagsordet <strong>{{$route.params.slug[0]}}.</strong></div>
    <span v-if="articles.meta.bm"><div></div>{{$t('notifications.results', {count: articles.meta.bm.total})+$t("in")+$t('dicts_inline.bm')}}</span>
    <span v-if="articles.meta.nn && articles.meta.bm"> | </span>
    <span v-if="articles.meta.nn">{{$t('notifications.results', {count: articles.meta.nn.total})+$t("in")+$t('dicts_inline.nn')}}</span>
    <div class="sr-only" v-if="listView"> Søkeresultatene ligger i en liste med lenker du kan nå med tabulatortasten.</div>
    <div class="sr-only" v-else> Søkeresultatene ligger nå i et hierarki av overskrifter du ikke kan nå med tabulatortasten.</div>
    
    <div class="hidden snackbar-search">Trykk Shift + 7 for å gå til søkefeltet</div>
    </div>


    <div class="gap-3 lg:gap-8 grid lg:grid-cols-2 mx-1" v-if="route.params.dict == 'bm,nn'">
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.bm')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Bokmålsordboka</h2>
          <span><span v-if="(articles.meta.bm.total > 1)" aria-hidden="true" class="result-count">  | {{$t('notifications.results', {count: articles.meta.bm.total})}}</span>
          </span></div>
          <div v-if="listView" class="inline-block lg:hidden"><h2>Bokmålsordboka</h2></div>
        <component :is="listView ? 'ol' : 'div'" class="article-column">
          <component v-for="(article_id, idx) in articles.articles.bm" :key="article_id" :is="listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm" :idx="idx"/>
            </NuxtErrorBoundary>
          </component>
        </component>
    </section>
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.nn')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span><span v-if="articles.meta.nn.total>1" aria-hidden="true" class="result-count">  | {{$t('notifications.results', {count: articles.meta.nn.total})}}</span>
          </span></div>
          <div  v-if="listView" class="inline-block lg:hidden"><h2>Nynorskordboka</h2></div>
        <component class="article-column" :is="listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in articles.articles.nn" :key="article_id" :is="listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'nn')">
              <Article :article_id="article_id" dict="nn" :idx="idx"/>
            </NuxtErrorBoundary>
          </component>
        </component>
    </section>
  </div>

    
    <div v-if="route.params.dict != 'bm,nn'">
      <div v-if="(route.params.dict == 'bm') && articles.meta.bm">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Bokmålsordboka</h2>
          <span v-if="(articles.meta.bm.total>1)" class="result-count">  | {{$t('notifications.results', {count: articles.meta.bm.total})}}</span>
        </div>
        <component class="article-column" :is="listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in articles.articles.bm" :key="article_id" :is="listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm" :idx="idx"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      <div v-if="(route.params.dict == 'nn')  && articles.meta.nn">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span v-if="(articles.meta.nn.total>1)" class="result-count">  | {{$t('notifications.results', {count: articles.meta.nn.total})}}</span>
        </div>
        <component class="article-column" :is="listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in articles.articles.nn" :key="article_id" :is="listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'nn')">
              <Article :article_id="article_id" dict="nn" :idx="idx"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      
    </div>
  </div>
  <div v-if="error_message">
    {{error_message}}
  </div>
  <div v-if="error" aria-live="">
    ERROR: {{error}}
  </div>

  <SuggestResults v-if="false && !pending"/>

</div>


</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import {useSettingsStore } from '~/stores/settingsStore'
const settings = useSettingsStore()
const store = useStore()
const route = useRoute()
const error_message = ref()

const listView = computed(() => {
  return store.view != "article" && route.name == 'dict-slug' && (route.query.q || route.params.slug[0]) &&  settings.simpleListView
})


const { data: articles, pending, error, refresh } = await useFetch('https://oda.uib.no/opal/prod/api/articles?',{
    query: {            
             w: route.query.q || route.params.slug[0],
            dict: route.params.dict,
            scope: "e"}
  })

const article_error = (error, article, dict) => {
  console.log("ARTICLE_ERROR", article, dict)
  console.log(error)
}


</script>

<style lang="scss" scoped>
.result-count {
    font-size: 1rem;
}

ol.article-column>li {
  list-style: none;
}

.list ol.article-column {
  margin: 0px;
  padding: 0px;
}

.list .article-column  {
    border: solid 1px rgba(0,0,0, .5);
    @apply bg-white;
    box-shadow: 2px 2px 0px rgba(0,0,0, .5);
    padding: 0rem;
    width: 100%;
}

.list .article-column:empty  {
    display: none;
}


.announcement:focus-within .snackbar-search {
  display: absolute !important;
  bottom: 1rem;

}

</style>
