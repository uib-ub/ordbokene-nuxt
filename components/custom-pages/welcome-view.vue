<template>
  <div>
    <div v-if="welcome_bm && welcome_nn" class="md:container mx-auto grid lg:grid-cols-2 gap-4 grid-flow-row px-3 py-3 xl:py-10 xl:px-48">
      <section class="grid">
        <Article :article_id="parseInt(welcome_bm.front_article.value)" dict="bm" :scoped_locale="scoped_locale('bm')" welcome />
      </section>

      <section class="grid">
        <Article :article_id="parseInt(welcome_nn.front_article.value)" dict="nn" :scoped_locale="scoped_locale('nn')" welcome />
      </section>

      <section v-if="latest_bm" class="welcome">
        <div class="article new-articles rounded !my-0">
          <h2 class="dict-label">{{ $t('article.new', {dict: $t('dicts_inline.bm')}, {locale: scoped_locale('bm')}) }}</h2>
          <ul class="flex flex-col md:flex-row lg:flex-col xl:flex-row flex-wrap pt-2 px-3 gap-x-2">
            <li v-for="([id, name], index) in latest_bm" :key="index" class="lg:col-auto">
                <NuxtLink class="suggest-link no-underline" :to="`/${$i18n.locale}/bm/${id}`"><span class="hoverlink">{{name}}</span></NuxtLink>
            </li>
          </ul>
        </div>
      </section>

      <section v-if="latest_nn" class="welcome">
        <div class="article new-articles rounded !my-0">
          <h2 class="dict-label">{{ $t('article.new', {dict: $t('dicts_inline.nn')}, {locale: scoped_locale('nn')}) }}</h2>
          <ul class="flex flex-col md:flex-row lg:flex-col xl:flex-row flex-wrap pt-2 px-3 gap-x-2">
            <li v-for="([id, name], index) in latest_nn" :key="index">
                <NuxtLink class="suggest-link no-underline" :to="`/${$i18n.locale}/nn/${id}`"><span class="hoverlink">{{name}}</span></NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
    
    <Spinner v-else-if="bm_pending || nn_pending || latest_bm_pending || latest_nn_pending" />
    <div class="px-4 md:px-8" v-if="bm_error || nn_error || latest_bm_error || latest_nn_error">
      <ErrorMessage :title="$t('content_not_found')" :error="bm_error || nn_error || latest_bm_error || latest_nn_error"/>  
    </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/stores/searchStore'
import { useSessionStore } from '~/stores/sessionStore'
const store = useSearchStore()
const session = useSessionStore()
const i18n = useI18n()

const sortArticles = (data) => {
    return data.sort((a, b) => new Date(b[3]) - new Date(a[3])).slice(0, 5)
}

const scoped_locale = dict => {
  if (i18n.locale.value === "nob" || i18n.locale.value === 'nno') {
    return {bm: 'nob', nn: 'nno'}[dict] 
  }
  return i18n.locale.value
}

const { data: welcome_bm, pending: bm_pending, error: bm_error} = useFetch(session.endpoint + 'bm/parameters.json')
const { data: welcome_nn, pending: nn_pending, error: nn_error} = useFetch(session.endpoint + 'nn/parameters.json')
const { data: latest_bm, pending: latest_bm_pending, error: latest_bm_error} = useLazyAsyncData('latest_bm', () => $fetch('https://ord.uib.no/bm/fil/article100new.json').then(response => { return sortArticles(response) }))
const { data: latest_nn, pending: latest_nn_pending, error: latest_nn_error} = useLazyAsyncData('latest_nn', () => $fetch('https://ord.uib.no/nn/fil/article100new.json').then(response => { return sortArticles(response) }))


</script>

<style scoped>

a {
    border: 2px;
}

li:not(:last-child):after {
  @apply md:content-['|'] lg:content-none xl:content-['|'] pl-2 text-gray-500;


}

.article.new-articles {
  @apply !pb-1;
}



.new-articles li:before {
  @apply content-['⬥'] md:content-none lg:content-['⬥'] xl:content-none text-primary mr-2;
}

</style>


