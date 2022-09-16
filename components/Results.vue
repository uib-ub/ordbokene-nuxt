<template>
    <div>     
    <div v-if="pending" class="d-flex align-items-center justify-content-center py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="!pending && store.q" :key="store.searchUrl">

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
    <SuggestResults :suggestions="suggestions"/>

  </div>


</div>


</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const suggestions = ref()

console.log("SETUP RESULTS")
const { pending, error, refresh, data: articles } = useLazyAsyncData(store.searchUrl, () => $fetch(`https://oda.uib.no/opal/dev/api/articles?&w=${store.q}&dict=${store.dict}&scope=${store.advanced? store.scope : 'e'}`))


const filter_suggestions = (items) => {
  let assembled = []
  let seen = new Set()
  console.log("unfiltered_suggestions", items.value.a.exact)

  const { inflect, exact, similar} = items.value.a
  console.log("INFLECT", inflect)



    if (inflect) {
        inflect.forEach(item => {
            if (store.q != item[0]) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }

    if (exact) {
        exact.forEach(item => {
            if (!seen.has(item[0])
            && store.q != item[0]
            && (item[0].length <= store.q.length
            || (item[0].slice(0, store.q.length) != store.q && item[0] != "å "+store.q))) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }

    if (similar) {
        similar.forEach(item => {
                if (!seen.has(item[0])) {
                assembled.push(item)
                }
        })
    }
    

    return assembled
}

const get_suggestions = () => {
  useAsyncData(((store.advanced && store.pos) || '') + 'suggest_'+store.q, () => {
                                $fetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.q}&dict=${store.dict}${store.advanced && store.pos ? '&pos=' + store.pos : ''}&n=20&dform=int&meta=n&include=eis`)
                                  }).then(response => {
                                    suggestions.value = filter_suggestions(response.data)
                                  })
  
  
}

watch(articles, (newArticles) => {
  console.log("SUGGESTION WATCHER", articles)
  console.log("NEW", newArticles)
  /*if (store.advanced) {
    refresh()
  }*/
  get_suggestions()
  
}, {
  deep: true,
  immediate: true
}
)



onMounted(() => {
  console.log("mounted")
  //get_suggest(articles)
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
