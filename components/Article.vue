<template>
    <article>
        <h2 v-if="store.view != 'article'" class="dict-label d-lg-none d-block">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <div class="p-3">
        <ArticleHeader :lemmas="data.lemmas" :content_locale="content_locale" :dict="dict"/>
        
        <button v-if="inflected" class="inflection-button py-1 px-3 mx-2" type="button" data-bs-toggle="collapse" :data-bs-target="'#inflection-'+article_id" aria-expanded="false" aria-controls="collapseExample">
            {{$t('article.show_inflection')}}
        </button>

        <div v-if="inflected" class="collapse py-2" :id="'inflection-'+article_id" ref="inflection_table">
        <div class="inflection-container card card-body">

            <InflectionTable :eng="$i18n.locale == 'eng'" :lemmaList="lemmas_with_word_class_and_lang" :mq="'sm'" :context="true" :key="$i18n.locale"/>

        </div>
        </div>
<p class="pt-3">
        {{data}}</p>
        

        </div>
    </article>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const store = useStore()

const props = defineProps({
    article_id: Number,
    dict: String
})

const content_locale = computed(() => {
    if (i18n.locale == 'eng') {
        return 'eng'
      } else {
        return {bm: 'nob', nn: 'nno'}[props.dict]
      }
})


const { pending, data } = await useAsyncData('article_'+props.article_id, () => $fetch(`https://oda.uib.no/opal/dev/${props.dict}/article/${props.article_id}.json`))

const inflected = computed(() => {
    return data.value.lemmas.reduce((acc, lemma) => acc += lemma.paradigm_info.reduce((acc2, digm) => digm.inflection_group.includes("uninfl") ? 0 : acc2 += digm.inflection.length, 0), 0) > data.value.lemmas.length

})

const lemmas_with_word_class_and_lang = computed(() => {
    return data.value.lemmas.map(lemma => Object.assign({language: props.dict == 'bm' ? 'nob' : 'nno',
                                                     word_class: lemma.paradigm_info[0].inflection_group.split('_')[0]}, lemma))
})

</script>

<style scoped>

 h2 {
    color: rgba(0,0,0,.6);
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    letter-spacing: .1rem;
    font-variant-caps: all-small-caps;
    font-weight: 600;
    font-size: 1.25rem;

}

article {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .3);
    background-color: white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .3);
    margin-bottom: 1rem;
}

.inflection-button {
    border: solid 1px var(--bs-primary);
    color: var(--bs-primary);
    background-color: white;
    border-radius: 2rem;

}

.inflection-button:focus {
    box-shadow: 1px 1px 1px var(--bs-primary);
}


.inflection-container {
    box-shadow: 1px 1px 1px var(--bs-primary);
    border: solid 1px var(--bs-primary);
    border-radius: 1.5rem;
    display: inline-flex;
}

.inflection-wrapper {
    overflow: hidden;
}


</style>
