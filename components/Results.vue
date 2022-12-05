<template>
    <div v-bind:class="{'list': listView}">     
    <div v-if="pending" class="flex align-items-center justifycenter py-5 my-5">
        <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading</span>
        </div>
    </div>
    <div ref="results" tabindex="-1" v-if="store.view != 'suggest' && !pending && !error && articles && articles.meta" >
    <div aria-live="polite" class="lg:sr-only">
      <div class="sr-only" v-if="store.originalInput">Viser resultater for oppslagsordet <strong>{{$route.params.slug[0]}}.</strong></div>
    <div class="result-announcement p-1" v-if="articles.meta.bm">{{$t('notifications.results', {count: articles.meta.bm.total})+$t("in")+$t('dicts_inline.bm')}}</div>
    <div class="result-announcement p-1" v-if="articles.meta.nn">{{$t('notifications.results', {count: articles.meta.nn.total})+$t("in")+$t('dicts_inline.nn')}}</div>
    </div>


    <div class="gap-3 lg:gap-8 grid lg:grid-cols-2 mx-1" v-if="route.params.dict == 'bm,nn' || route.query.dict == 'bm,nn' ">
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.bm')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Bokmålsordboka</h2>
          <span v-if="articles.meta.bm.total" aria-hidden="true" class="result-count">  | {{$t('notifications.results', {count: articles.meta.bm.total})}}</span>
          <span v-else aria-hidden="true" class="result-count">  | {{$t('notifications.no_results')}}</span></div>
        <component :is="store.advanced && listView ? 'ol' : 'div'" class="article-column">
          <component v-for="article_id in store.advanced ? bm_articles : articles.articles.bm" :key="article_id + page" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm"/>
            </NuxtErrorBoundary>
          </component>
        </component>
    </section>
      <section class="lg:grid-cols-6" :aria-label="$t('dicts.nn')">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span v-if="articles.meta.nn.total" aria-hidden="true" class="result-count">  | {{$t('notifications.results', {count: articles.meta.nn.total})}}</span>
          <span v-else aria-hidden="true" class="result-count">  | {{$t('notifications.no_results')}}</span></div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="article_id in store.advanced ? nn_articles : articles.articles.nn" :key="article_id  + page" :is="store.advanced && listView ? 'li' : 'div'">
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
          <span class="result-count">  | {{$t('notifications.results', {count: articles.meta.bm.total})}}</span>
        </div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="article_id in store.advanced ? bm_articles : articles.articles.bm" :key="article_id + page" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'bm')">
              <Article :article_id="article_id" dict="bm"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      <div v-if="(route.params.dict == 'nn' || route.query.dict == 'nn' )  && articles.meta.nn">
        <div class="hidden lg:inline-block py-2"><h2 class="lg:inline-block">Nynorskordboka</h2>
          <span class="result-count">  | {{$t('notifications.results', {count: articles.meta.nn.total})}}</span>
        </div>
        <component class="article-column" :is="store.advanced && listView ? 'ol' : 'div'">
          <component v-for="(article_id, idx) in store.advanced ? nn_articles : articles.articles.nn" :key="article_id + page" :is="store.advanced && listView ? 'li' : 'div'">
            <NuxtErrorBoundary v-on:error="article_error($event, article_id, 'nn')">
              <Article :article_id="article_id" dict="nn"/>
            </NuxtErrorBoundary>
          </component>
        </component>
      </div>
      
    </div>
    <div v-if="store.advanced && pages > 1" class="p-2 py-6 md:p-8 flex md:flex-wrap justify-center flex md:gap-4">
    <button :disabled="page == 1" @click="change_page(-1)" class="bg-primary text-white rounded-4xl p-1 px-2 md:p-3 md:px-8">
      <CustomIcon icon="bi-chevron-left md:pr-0.75em"/><span class="sr-only md:not-sr-only">forrige side</span>
    </button>
    <div class="text-center self-center align-middle mx-4 md:mx-8 text-lg h-full">Side {{page}} av {{pages}}</div>
    <button :disabled="page == pages" @click="change_page(1)" class="bg-primary text-white rounded-4xl p-1 px-2 md:p-3 md:px-8">
      <span class="sr-only md:not-sr-only">neste side</span><CustomIcon icon="bi-chevron-right md:pl-0.75em"/>
    </button>
    </div>
  </div>
  <div v-if="error_message">
    {{error_message}}
  </div>
  <div v-if="error" aria-live="">
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
const router = useRouter()

const suggestions = ref()
const error_message = ref()
const per_page = 10
const page = ref(parseInt(route.query.page) || 1)
const pages = ref(0)
const offset = ref(per_page * page)
const results = ref()


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
  if (store.advanced) {
    if (route.query.page) {
      slice_results()
      console.log("UPDATING", route.query.page)
      
    }
    else {
      refresh()

    }
    
  }
})

onMounted(() => {
    get_suggestions()
})


const slice_results = () => {
  offset.value = (page.value-1) * per_page
  if (articles.value.articles.bm) {
    let end_bm = offset.value < articles.value.articles.bm.length ? offset.value + per_page : articles.value.articles.bm.length
    console.log(offset.value, end_bm)
    bm_articles.value =  articles.value.articles.bm.slice(offset.value, end_bm)
  }
  if (articles.value.articles.nn) {
    let end_nn = offset.value < articles.value.articles.nn.length ? offset.value + per_page : articles.value.articles.nn.length
    console.log(offset.value, end_nn)
    nn_articles.value =  articles.value.articles.nn.slice(offset.value, end_nn)
  }

  console.log(nn_articles.value)
  
  
  if (results.value) {
    results.value.focus()
    results.value.scrollIntoView();
  }
}


watch(() => route.query.page, () => {
  page.value = route.query.page
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
      let offset = (page.value-1) * per_page
      console.log("OFFSET", offset)
      slice_results()
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

const change_page = async (change) => {
  navigateTo({query: {...route.query, ...{page: parseInt(page.value) + change}}})
}

</script>

<style lang="scss" scoped>
.result-count {
    font-size: 1rem;
}

ol.article-column>li {
  list-style: none;
}

.list .article-column  {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .5);
    @apply bg-white;
    box-shadow: 2px 2px 0px rgba(0,0,0, .5);
    padding: 0.5rem;
}

.list .article-column:empty  {
    display: none;
}





button[disabled] {
  color: theme('colors.gray.100');
  cursor: default;
}



</style>
