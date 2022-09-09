<template>
    <div>
    <div v-if="pending" class="d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>

    </div>
    <div class="row" v-if="articles">
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span class="result-count">  | {{articles.meta.bm.total}} {{$t('results')}}</span></div>
      <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
      </div>
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span class="result-count"> | {{articles.meta.nn.total}} treff</span></div>
      <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
      </div>

    </div>

</div>


</template>

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const { pending, data: articles } = useLazyFetch(`https://oda.uib.no/opal/dev/api/articles?&w=${store.q}&dict=bm,nn&scope=ei`, {key: store.searchUrl})

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
