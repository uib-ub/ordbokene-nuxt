<template>
    <div>     
    <div v-if="pending" class="d-flex align-items-center justify-content-center py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>

    <div>
    <div aria-live="assertive" class="visually-hidden">{{articles.meta.bm.total}} treff i Bokmålsordboka</div>
    <div aria-live="assertive" class="visually-hidden">{{articles.meta.nn.total}} treff i Nynorskordboka</div>
    </div>
    

    <div class="row" v-if="$route.params.dict == 'bm,nn'">
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span v-if="articles && articles.meta" aria-hidden="true" class="result-count">  | {{articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
        <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
    </div>
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span v-if="articles && articles.meta" aria-hidden="true" class="result-count"> | {{articles.meta.nn.total}} treff</span></div>
        <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
    </div>
    </div>

    
    <div class="row" v-if="$route.params.dict != 'bm,nn'" >
      <div v-if="$route.params.dict == 'bm'">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span class="result-count">  | {{articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
      <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
      </div>
      <div v-if="$route.params.dict == 'nn'">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span class="result-count"> | {{articles.meta.nn.total}} treff</span></div>
      <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
      </div>
    </div>
    <SuggestResults v-if="store.view == 'search' && store.q"/>

  </div>


</div>


</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

console.log("SETUP RESULTS")
const { pending, error, refresh, data: articles } = useLazyAsyncData(store.searchUrl, () => $fetch(`https://oda.uib.no/opal/dev/api/articles?&w=${store.q}&dict=${store.dict}&scope=${store.advanced? store.scope : 'e'}`))

const query = computed(() => {
  return route.query
})

watch(query, (oldParams, newParams) => {
  console.log("QUERY", query)
  if (store.advanced) {
    refresh()
  }  
})

const fetch_suggest = () => {
  console.log("FETCHING")
  fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eis`).then((response)=>{
      response.json().then((data) => {
        console.log("returned")
        
        store.suggest = data
        store.suggest_from = store.q

      })
      
    })
}

const get_suggest = (a) => {
  if(store.advanced) {
    if (a && a.value && a.value.meta.bm.total + a.value.meta.nn.total == 0) {
      fetch_suggest()
    

  }
  else  {
    store.suggest = {}
  }
  }
  else if (store.q != store.suggest_from) {
    fetch_suggest()
  }
  
}

watch(articles, (oldArticles, newArticles) => {
    get_suggest(articles)  
})

onMounted(() => {
  get_suggest(articles)
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
</style>
