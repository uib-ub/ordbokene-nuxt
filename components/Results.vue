<template>
    <div>
    <div v-if="store.loading" class="d-flex align-items-center justify-content-center py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div v-if="!store.loading && store.articles.meta.bm" aria-live="assertive" class="visually-hidden">{{store.articles.meta.bm.total}} treff i Bokmålsordboka</div>
    <div v-if="!store.loading && store.articles.meta.nn" aria-live="assertive" class="visually-hidden">{{store.articles.meta.nn.total}} treff i Nynorskordboka</div>

    <div class="row" v-if="!store.loading && $route.params.dict == 'bm,nn'" :key = "store.searchUrl">
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span aria-hidden="true" class="result-count">  | {{store.articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
      <Article v-for="(article_id, idx) in store.articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
      </div>
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span aria-hidden="true" class="result-count"> | {{store.articles.meta.nn.total}} treff</span></div>
      <Article v-for="(article_id, idx) in store.articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
      </div>
    </div>

    <div class="row" v-if="!store.loading && store.articles.meta && $route.params.dict != 'bm,nn'" :key = "store.searchUrl">
      <div v-if="$route.params.dict == 'bm'">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span class="result-count">  | {{store.articles.meta.bm.total}} {{$t('notifications.results')}}</span></div>
      <Article v-for="(article_id, idx) in store.articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
      </div>
      <div v-if="$route.params.dict == 'nn'">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span class="result-count"> | {{store.articles.meta.nn.total}} treff</span></div>
      <Article v-for="(article_id, idx) in store.articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
      </div>
    </div>

</div>


</template>

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()


$fetch(`https://oda.uib.no/opal/dev/api/articles?&w=${store.q}&dict=${store.dict}&scope=${store.scope || 'e'}`, {key: store.searchUrl}).then(response => {
  store.articles = response
  store.loading = false
}).catch(error => {
  console.log(error)
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
