<template>
    <div v-bind:class="{'list': listView}">     
    <div v-if="pending" class="d-flex align-items-center justify-content-center py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="store.view != 'suggest' && !pending && !error && articles && articles.meta">
    <div>
    <div aria-live="assertive" class="visually-hidden" v-if="articles.meta.bm">{{articles.meta.bm.total}} treff i Bokmålsordboka</div>
    <div aria-live="assertive" class="visually-hidden" v-if="articles.meta.nn">{{articles.meta.nn.total}} treff i Nynorskordboka</div>
    </div>


    <div class="row" v-if="route.params.dict == 'bm,nn' || route.query.dict == 'bm,nn' ">
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span  aria-hidden="true" class="result-count">  | {{articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
        <div class="article-column">
          <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
        </div>
    </div>
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span aria-hidden="true" class="result-count"> | {{articles.meta.nn.total}} {{$t('notifications.results')}}</span></div>
        <div class="article-column">
          <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
        </div>
    </div>
  </div>

    
    <div class="row" v-if="route.params.dict != 'bm,nn' && route.query.dict != 'bm,nn' " >
      <div v-if="(route.params.dict == 'bm' || route.query.dict == 'bm') && articles.meta.bm">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span class="result-count">  | {{articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
        <div class="article-column">
          <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
        </div>
      </div>
      <div v-if="(route.params.dict == 'nn' || route.query.dict == 'nn' )  && articles.meta.nn">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span class="result-count"> | {{articles.meta.nn.total}} treff</span></div>
        <div class="article-column">
          <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
        </div>
      </div>
    </div>
  </div>
  <div v-if="error_message">
    {{error_message}}
  </div>
  <div v-if="error">
    ERROR: {{error}}
  </div>

  <SuggestResults v-if="!pending" :suggestions="suggestions"/>


</div>


</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
import {useSettingsStore } from '~/stores/settingsStore'

const settings = useSettingsStore()
const store = useStore()
const route = useRoute()

const suggestions = ref()
const error_message = ref()

const get_suggestions = async () => {
  if (!(store.advanced && specialSymbols(store.q))) {
  let key = ((store.advanced && store.pos) || '') + 'suggest_'+ (store.originalInput || store.q)

  const response = await $fetch(`https://odd.uib.no/opal/dev/api/suggest?&q=${store.originalInput || store.q}&dict=${store.dict}${store.advanced && store.pos ? '&pos=' + store.pos : ''}&n=20&dform=int&meta=n&include=eis`)                                
  suggestions.value = filterSuggestions(response, store.originalInput || store.q)
  }
  else {
    suggestions.value = null
  }
  
  
  
}
const { pending, error, refresh, data: articles } = await useAsyncData("articles_"+ store.searchUrl, ()=> 
      $fetch('https://odd.uib.no/opal/dev/api/articles?', {
          params: {
            w: store.q,
            dict: store.dict,
            scope: store.advanced ? store.scope : 'e',
            wc: store.advanced ? store.pos : ''
          },
          onRequestError({ request, options, error}) {
            console.log("ERROR")
          },

          onResponse({ request, options, response }) {
            get_suggestions()
          }
        }))



watch(() => store.searchUrl, () => {
  if (store.advanced) {
    refresh()
  }
})

onMounted(() => {
    get_suggestions()
})







watch(articles, (newArticles) => {
  if (store.advanced && newArticles) {
    let total_bm = newArticles.meta.bm ? newArticles.meta.bm.total : 0
    let total_nn = newArticles.meta.nn ? newArticles.meta.nn.total : 0
    
    if (total_bm + total_nn == 0) get_suggestions()
  }
}, {
  deep: true,
  immediate: true
}
)

const listView = computed(() => {
  return settings.listView && store.advanced == true && route.name == 'search' && store.q
})

</script>

<style scoped>
    .spinner-border {
        width: 18rem;
        height: 18rem;
    }

.result-count {
    font-size: 1rem;
}

.list .article-column  {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .3);
    background-color: white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .3);
    padding: 0.5rem;
}

</style>
