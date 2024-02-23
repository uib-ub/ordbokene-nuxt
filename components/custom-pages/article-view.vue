<template>
  <div>
    <div class ="py-2 pb-6 md:pb-8 article-view">
      <NuxtErrorBoundary @error="article_error($event, parseInt($route.params.article_id), dict)">
        <Article single :scoped_locale="scoped_locale(dict)" :article_id="parseInt($route.params.article_id)" :dict="dict"/>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from '~/stores/searchStore'
import { useI18n } from 'vue-i18n'

const store = useSearchStore()
const route = useRoute()
const dict = route.params.dict // prevent reactivity that causes error message when navigating back to search
const i18n = useI18n()


const article_error = (error, article, dict) => {
  useTrackEvent("article_error", {props: {article: dict + "/" + article, message: dict + "/" + article + " " + error.toString()}})
  console.log(error)
}

const scoped_locale = dict => {
  if (i18n.locale.value === "nob" || i18n.locale.value === 'nno') {
    return {bm: 'nob', nn: 'nno'}[dict] 
  }
  return i18n.locale.value
}


</script>

<style scoped>

.article {
    border-radius: 0;
}

</style>
