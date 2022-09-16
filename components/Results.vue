<template>
    <div>
    <div v-if="pending" class="d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>

    </div>

  <!--<div class="d-lg-none">
    <div class="row" v-if="articles">
      <div  class="col-lg" v-for="(article_id, idx) in articles.articles.bm.concat(articles.articles.nn)" :key="idx + both_hash"
        :style="'order:'+(idx < articles.articles.bm.length ? 2*idx : ((idx-articles.articles.bm.length)*2) + 1)">
        <Article :key="idx + both_hash" :article_id="article_id" dict="bm,nn" />
      </div>
    </div>
  </div>-->

  <div class="d-none d-lg-block">
    <div class="row" v-if="articles">
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Bokmålsordboka</h2><span class="result-count">  | {{articles.meta.bm.total}} treff</span></div>
      <Article v-for="(article_id, idx) in articles.articles.bm" :key="idx" :article_id="article_id" dict="bm"/>
      </div>
      <div class="col-lg-6">
        <div class="d-none d-lg-inline-block p-2"><h2 class="d-lg-inline-block">Nynorskordboka</h2><span class="result-count"> | {{articles.meta.nn.total}} treff</span></div>
      <Article v-for="(article_id, idx) in articles.articles.nn" :key="idx" :article_id="article_id" dict="nn"/>
      </div>

    </div>
  </div>

</div>


</template>

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const { pending, data: articles } = useLazyFetch(`https://oda.uib.no/opal/dev/api/articles?&w=${store.q}&dict=bm,nn&scope=ei`, {key: store.searchUrl})

const both_hash = computed(() => {
      return articles.articles.bm.concat(articles.articles.nn).reduce((hash, hit) => (hash + hit.article_id) % 10000, 0)
    })


</script>

<style scoped>
    .spinner-border {
        width: 18rem;
        height: 18rem;
    }

h2 {
    color: var(--bs-primary);
    font-weight: 600 !important;
    letter-spacing: .1rem;
    font-variant: all-small-caps;
    font-weight: bold;
    font-size: 1.5rem;

}

.result-count {
    font-size: 1rem;
}
</style>
