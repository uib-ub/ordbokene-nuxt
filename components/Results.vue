<template>
    <div>     
    <div v-if="pending" class="d-flex align-items-center justify-content-center py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="store.view != 'suggest' && !pending && articles && articles.meta" :key="store.searchUrl">
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
  </div>
  <div v-if="error_message">
    {{error_message}}
  </div>
    

  <SuggestResults v-if="!pending && suggestions" :suggestions="suggestions"/>


</div>


</template>

<script setup>

import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const suggestions = ref()
const error_message = ref()


const get_articles = () => {
  if(store.q && store.view != 'suggest') {
    return $fetch('https://oda.uib.no/opal/dev/api/articles?', {
                                                                params: {
                                                                  w: store.q,
                                                                  dict: store.dict,
                                                                  scope: store.advanced ? store.scope : 'e'
                                                                },
                                                                onResponse({ request, options, response }) {
                                                                  console.log("RESPONSE INTERCEPTED", response)
                                                                }
                                                              })

  }
  else {
    error_message.value = "Ingen treff"
    get_suggestions()
    return async () => null
  }
}

const { pending, error, refresh, data: articles } = useAsyncData(store.searchUrl, get_articles)



watch(() => route.query, () => {
  if (store.advanced) {
    console.log("ROUTE WATCHER")

    refresh()
  }
  
})


const filter_suggestions = (items) => {
  let assembled = []
  let seen = new Set()
  let q = store.suggestQuery || store.q
  const { inflect, exact, similar} = items.value.a
    if (inflect) {
        inflect.forEach(item => {
            if (q != item[0]) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }
    if (exact) {
        exact.forEach(item => {
            if (!seen.has(item[0])
            && q != item[0]
            && (item[0].length <= q.length
            || (item[0].slice(0, q.length) != q && item[0] != "å " + q))) {
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
  if (!(store.advanced && specialSymbols(store.q))) {
    let key = ((store.advanced && store.pos) || '') + 'suggest_'+ (store.originalInput || store.q)
  console.log("KEY", key)
  useFetch(`https://oda.uib.no/opal/dev/api/suggest?&q=${store.originalInput || store.q}&dict=${store.dict}${store.advanced && store.pos ? '&pos=' + store.pos : ''}&n=20&dform=int&meta=n&include=eis`, { key })
                                  .then(response => {
                                    console.log("SUGGESTIONS_RESPONSE", response.data)
                                    suggestions.value = filter_suggestions(response.data)
                                  })

  }
  
  
  
}

watch(articles, (newArticles) => {
  
  if (store.advanced && newArticles) {
    console.log("ARTICLES WATCHER", articles)
    if (newArticles.meta.bm.total + newArticles.meta.nn.total == 0) get_suggestions()
  }
}, {
  deep: true,
  immediate: true
}
)

onMounted(() => {
  console.log("MOUNTED")
  if (store.view == 'word') {
    console.log("WORD GET SUGGESTIONS", store.q)
    get_suggestions()
  }
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
