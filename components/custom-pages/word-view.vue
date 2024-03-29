<template>
    <div>     
    <Spinner v-if="!error && !articles"/>    
    <div v-if="!error && !pending && articles && articles.meta && $route.name != 'index'" ref="results">
      <div class="md:sr-only pt-2 md:pt-0 px-2 text-sm" :class="{'sr-only': store.dict != 'bm,nn'}" role="status" aria-live="polite">
        <span v-if="total || (no_suggestions_bm && no_suggestions_nn)">{{$t('notifications.results', total, {count: total})}}</span>
        <span v-if="!no_suggestions_bm || !no_suggestions_nn"><span v-if="total">. </span>{{$t('notifications.suggestions_available', total == 0 || 2)}}</span>
      </div>
      <div :class="{'gap-2 lg:gap-8 lg:grid lg:grid-cols-2': dicts.length == 2}">
        <section v-for="dict in dicts" :key="dict" :aria-labelledby="dict+'_heading'" class="lg:grid-cols-6">
          <div class="pt-0 pb-3 px-2">
            <h2 :id="dict+'_heading'">
              {{$t('dicts.'+dict)}} 
              <template v-if="articles.meta[dict]">
                <span class="result-count-text">{{articles.meta[dict].total}}</span>
                <span class="sr-only">&nbsp;{{$t('notifications.keywords')}}</span>
              </template>
            </h2>
          </div>
          <component :is="listView ? 'ol' : 'div'" v-if="articles.meta[dict] && articles.meta[dict].total"  class="article-column">
            <component :is="listView ? 'li' : 'div'" v-for="article_id in articles.articles[dict]" :key="article_id" >
              <NuxtErrorBoundary @error="article_error($event, article_id, dict)">
                <Article :scoped_locale="scoped_locale(dict)" :list="listView" :article_id="article_id" :dict="dict"/>
              </NuxtErrorBoundary>
            </component>
          </component>
          <client-only>
            <div v-if="store.q && !specialSymbols(store.q)">
              <Suggest :scoped_locale="scoped_locale(dict)"  :dict="dict" :articles_meta="articles.meta"/>
            </div>
          </client-only>
        </section>
        
    </div>
    <section v-if="!(no_suggestions_bm && no_suggestions_nn)" class="pt-0 mb-12 mt-12 px-2" :class="{'text-center': store.dict == 'bm,nn'}" aria-labelledby="feedback_title">
                <h2 id="feedback_title">{{$t('notifications.feedback.title')}}</h2>
                <div v-if="!feedback_given" class="flex gap-4 mt-4 my-6 mb-8 h-10" :class="{'justify-center': store.dict == 'bm,nn'}">
                    <button type="button" class="btn w-[96px]" @click="track_feedback(true)" >{{$t('notifications.feedback.yes')}}<BiHandThumbsUpFill class="text-primary ml-3"/></button>
                    <button type="button" class="btn w-[96px]" @click="track_feedback(false)">{{$t('notifications.feedback.no')}}<BiHandThumbsDownFill class="text-primary ml-3"/></button></div>
                    <p v-else class="mt-4 my-6 mb-8 justify-center h-10" role="status" aria-live="polite">
                    {{$t('notifications.feedback.thanks')}}
                </p>
    </section>
  </div>
  <ErrorMessage v-if="error" :error="error" :title="$t('error.articles')"/>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/stores/searchStore'
import {useSettingsStore } from '~/stores/settingsStore'
import {useSessionStore } from '~/stores/sessionStore'


const settings = useSettingsStore()
const store = useSearchStore()
const session = useSessionStore()
const route = useRoute()
const { t } = useI18n()
const i18n = useI18n()
const error_message = ref()
const no_suggestions_bm = useState('no_suggestions_bm')
const no_suggestions_nn = useState('no_suggestions_nn')

const { pending, error, refresh, data: articles } = await useFetch('api/articles?', {
          baseURL: session.endpoint,
          params: {
            w: store.q,
            dict: store.dict,
            scope: 'e',
          }          
          })

const feedback_given = ref(false)

const baseUrl = useRequestURL().protocol+'//'+useRequestURL().host

const track_feedback = (value) => {
    feedback_given.value = true
    useTrackEvent(value ? 'feedback_positive' : 'feedback_negative', {props: {query: store.dict + "/" + store.q}})

}

const scoped_locale = dict => {
  if (i18n.locale.value === "nob" || i18n.locale.value === 'nno') {
    return {bm: 'nob', nn: 'nno'}[dict] 
  }
  return i18n.locale.value
}

if (error.value && session.endpoint === "https://oda.uib.no/opal/prod/`") {
  session.endpoint = `https://odd.uib.no/opal/prod/`
  refresh()
}


const title = computed(()=> {
  return store.dict === "bm,nn" ? store.q : store.q + " | " + t('dicts.'+ store.dict)
})

const dicts = computed(()=> {
  const currentDict = store.dict
  if (currentDict === "bm") {
    return ["bm"]
  }
  if (currentDict === "nn") {
    return ["nn"]
  }
  return ["bm", "nn"]
})

const metaDescription = computed(() => {
    return articles.value && dicts.value.map(dict => i18n.t('notifications.results_dict', {dict: i18n.t('dicts_inline.'+dict), count: articles.value.meta[dict] && articles.value.meta[dict].total})).join(". ")
})

useHead({
  title, 
  meta: [
    {property: 'og:title', content: title }, 
    {name: 'twitter:title', content: title },
    {name: 'description', content: metaDescription },
    {property: 'og:description', content: metaDescription },
    {name: 'twitter:description', content: metaDescription },
  ]
})


if (false && route.query.orig) { // TODO: reenable when we replace the old site
  useHead({
  link: [
      {rel: 'canonical', href: baseUrl + route.path }
    ]
})
}

useHead({ // TODO: remove when we replace the old site
  link: [
      {rel: 'canonical', href: `https://ordbokene.no/${store.dict}/${store.q}` }
    ]
})


definePageMeta({
    middleware: [
      "simple-search-middleware"
    ]
  })


const listView = computed(() => {
  return store.q && settings.simpleListView
})

const total = computed(() => {
  return (articles.value.meta.bm && articles.value.meta.bm.total || 0) + (articles.value.meta.nn && articles.value.meta.nn.total || 0)
})



const article_error = (error, article, dict) => {
  useTrackEvent("article_error", {props: {article: dict + "/" + article, message: dict + "/" + article + " " + error.toString()}})
  console.log(error)
}

</script>
