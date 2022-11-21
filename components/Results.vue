<template>
    <div v-bind:class="{'list': listView}">     
    <div v-if="pending" class="flex align-items-center justifycenter py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading</span>
        </div>
    </div>
    <div v-if="store.view != 'suggest' && !pending && !error && articles && articles.meta">
    <div>
    <div id="" aria-live="assertive" class="md:sr-only" v-if="articles.meta.bm">{{articles.meta.bm.total}} {{$t(articles.meta.bm.total == 1? 'notifications.result' : 'notifications.results')+$t("in")+$t('dicts_inline.bm')}}</div>
    <div id="" aria-live="assertive" class="md:sr-only" v-if="articles.meta.nn">{{articles.meta.nn.total}} {{$t(articles.meta.nn.total == 1? 'notifications.result' : 'notifications.results')+$t("in")+$t('dicts_inline.nn')}}</div>
    </div>


    <div class="gap-3 lg:gap-8 grid lg:grid-cols-2 mx-1" v-if="route.params.dict == 'bm,nn' || route.query.dict == 'bm,nn' ">
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.bm')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Bokmålsordboka</h2>
          <span v-if="articles.meta.bm.total" aria-hidden="true" class="result-count">  | {{articles.meta.bm.total}} {{$t(articles.meta.bm.total == 1? 'notifications.result' : 'notifications.results')}}</span>
          <span v-else aria-hidden="true" class="result-count">  | {{$t('notifications.no_results')}}</span></div>
        <component :is="store.advanced && listView ? 'ol' : 'div'" class="article-column">
          <component v-for="(article_id, idx) in store.advanced ? bm_articles : articles.articles.bm" :key="idx" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm"/>
            </NuxtErrorBoundary>
          </component>
        </component>
    </section>
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.nn')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span v-if="articles.meta.nn.total" aria-hidden="true" class="result-count">  | {{articles.meta.nn.total}} {{$t(articles.meta.nn.total == 1? 'notifications.result' : 'notifications.results')}}</span>
          <span v-else aria-hidden="true" class="result-count">  | {{$t('notifications.no_results')}}</span></div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in store.advanced ? nn_articles : articles.articles.nn" :key="idx" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'nn')">
              <Article :article_id="article_id" dict="nn"/>
            </NuxtErrorBoundary>
          </component>
        </component>
    </section>
  </div>

    
    <div v-if="route.params.dict != 'bm,nn' && route.query.dict != 'bm,nn' ">
      <div v-if="(route.params.dict == 'bm' || route.query.dict == 'bm') && articles.meta.bm">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Bokmålsordboka</h2>
          <span v-if="articles.meta.bm.total" class="result-count">  | {{articles.meta.bm.total}} {{$t(articles.meta.bm.total == 1? 'notifications.result' : 'notifications.results')}}</span>
          <span v-else class="result-count">  | {{$t('notifications.no_results')}}</span>
        </div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in store.advanced ? bm_articles : articles.articles.bm" :key="idx" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      <div v-if="(route.params.dict == 'nn' || route.query.dict == 'nn' )  && articles.meta.nn">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span v-if="articles.meta.nn.total" class="result-count">  | {{articles.meta.nn.total}} {{$t(articles.meta.nn.total == 1? 'notifications.result' : 'notifications.results')}}</span>
          <span v-else class="result-count">  | {{$t('notifications.no_results')}}</span>
        </div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in store.advanced ? nn_articles : articles.articles.nn" :key="idx" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'nn')">
              <Article :article_id="article_id" dict="nn"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      
    </div>
    <div v-if="store.advanced && pages > 1" class="p-8 flex flex-wrap justify-center flex-col flex sm:flex-row gap-4 content-center align-middle">
    <button :disabled="page == 0" @click="page -= 1" class="bg-primary text-white rounded-4xl p-3 px-8">
      <BootstrapIcon icon="bi-chevron-left" left/>forrige side
    </button>
    <div class="align-middle text-center mx-8">Side {{page + 1}} av {{pages}}</div>
    <button :disabled="page == pages-1" @click="page += 1" class="bg-primary text-white rounded-4xl p-3 px-8">
      neste side<BootstrapIcon icon="bi-chevron-right" right/>
    </button>
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
const per_page = 3
const page = ref((parseInt(route.query.page || "1") - 1))
const pages = ref(0)
const offset = ref(per_page * page)


const bm_articles = ref([])
const nn_articles = ref([])


const get_suggestions = async () => {
  if (!(store.advanced && specialSymbols(store.q))) {
  let key = ((store.advanced && store.pos) || '') + 'suggest_'+ (store.originalInput || store.q)

  const response = await $fetch(`${store.endpoint}api/suggest?&q=${store.originalInput || store.q}&dict=${store.dict}${store.advanced && store.pos ? '&pos=' + store.pos : ''}&n=20&dform=int&meta=n&include=eis`)                                
  suggestions.value = filterSuggestions(response, store.originalInput || store.q)
  }
  else {
    suggestions.value = null
  }
  
  
  
}
const { pending, error, refresh, data: articles } = await useAsyncData("articles_"+ store.searchUrl, ()=> 
      $fetch(store.endpoint + 'api/articles?', {
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
  page.value = 0
  if (store.advanced && page.value== 0) {
    refresh()
  }
})

onMounted(() => {
    get_suggestions()
})


const slice_results = () => {
  offset.value = page.value * per_page
  console.log(offset.value)
  console.log(articles.value.articles.bm.slice(offset.value, offset.value + per_page))
  
}


watch(() => page.value, () => {
  slice_results()


})

watch(articles, (newArticles) => {
  if (store.advanced && newArticles) {
    let total_bm = newArticles.meta.bm ? newArticles.meta.bm.total : 0
    let total_nn = newArticles.meta.nn ? newArticles.meta.nn.total : 0
    console.log(Math.max(total_bm, total_nn))
    pages.value = Math.ceil(Math.max(total_bm, total_nn) / per_page)
    console.log("PAGES", pages)
    if (store.advanced) {
      let offset = page.value * per_page
      console.log("OFFSET", offset)
      //bm_articles.value = newArticles.articles.bm.length < max_articles.value ? newArticles.articles.bm : newArticles.articles.bm.slice(max_articles.value)
      //nn_articles.value = newArticles.articles.nn.length < max_articles.value ? newArticles.articles.nn : newArticles.articles.nn.slice(max_articles.value)
    }
    


    
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

const article_error = (error, article, dict) => {
  console.log("ARTICLE_ERROR", article, dict)
  console.log(error)
}

</script>

<style lang="scss" scoped>
.result-count {
    font-size: 1rem;
}

.list .article-column  {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .5);
    @apply bg-white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .5);
    padding: 0.5rem;
}

.list .article-column:empty  {
    display: none;
}

.article-column>div>.list-view-item {
  border-bottom: solid 1px rgba(0,0,0, .25);
}


.article-column>div:first-child .list-view-item {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}

.article-column>div:last-child .list-view-item {
  border-bottom: none;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}


button[disabled] {
  color: gray;
  cursor: default;
}

</style>
