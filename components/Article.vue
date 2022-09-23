<template>

    <article class="pt-lg-1">
        <div v-if="pending" class="skeleton-container">
            <div class="skeleton mt-4 skeleton-heading"/>
        <div class="skeleton mt-2 mb-4 skeleton-subheading"/>
        <div class="skeleton skeleton-content w-50 "/>
        <div class="skeleton skeleton-content w-25 skeleton-indent"/>
        <div class="skeleton skeleton-content w-75"/>
        <div class="skeleton skeleton-content w-25 skeleton-indent"/>
        <div class="skeleton skeleton-content w-50"/>
        <div class="skeleton skeleton-content w-75 skeleton-indent"/>
        <div class="skeleton skeleton-content w-25"/>
        </div>

        <div v-else>
        <h2 v-if="store.view != 'article'" class="dict-label d-lg-none d-block">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <h2 v-if="store.view == 'article'" class="article-dict-label">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <div class="p-4">
        <ArticleHeader :lemmas="data.lemmas" :content_locale="content_locale" :dict="dict"/>

        <button v-if="inflected" class="inflection-button py-1 px-3 mx-2" @click="toggle = !toggle" type="button" data-bs-toggle="collapse" :data-bs-target="'#inflection-'+article_id" aria-expanded="false" aria-controls="collapseExample">
             {{$t('article.show_inflection')}} <span v-if="!toggle"><Icon :icon="'bi-plus'" /></span><span v-if="toggle"><Icon :icon="'bi-dash'" /></span>
        </button>

        <div v-if="inflected" class="collapse py-2" :id="'inflection-'+article_id" ref="inflection_table">
            <div class="inflection-container card card-body">
                <NuxtErrorBoundary @error="inflection_error">
                <InflectionTable :eng="$i18n.locale == 'eng'" :lemmaList="lemmas_with_word_class_and_lang" :mq="'sm'" :context="true" :key="$i18n.locale"/>
                </NuxtErrorBoundary>
            </div>
        </div>
        <NuxtErrorBoundary @error="body_error">
        <div class="article_content pt-3" ref="article_content">
            <section v-if="data.body.pronunciation && data.body.pronunciation.length" class="pronunciation">
                <h4>{{$t('article.headings.pronunciation', content_locale)}}</h4>

                <DefElement v-for="(element, index) in data.body.pronunciation" :dict="dict" :key="index" :body='element' v-on:link-click="link_click"/>

            </section>
            <section v-if="data.body.etymology && data.body.etymology.length" class="etymology">
                <h4>{{$t('article.headings.etymology', content_locale)}}</h4>

                <DefElement v-for="(element, index) in data.body.etymology" :dict="dict" :key="index" :body='element' v-on:link-click="link_click"/>

            </section>
            <section class="definitions" v-if="has_content">
                <h4>{{$t('article.headings.definitions', content_locale)}}</h4>

                <Definition v-for="definition in data.body.definitions" :dict="dict" :level="1" :key="definition.id" :body='definition' v-on:link-click="link_click"/>

            </section>
            <section v-if="sub_articles.length" class="expressions">
                <h4>{{$t('article.headings.expressions', content_locale)}}</h4>
                <ul>
                <SubArticle :body="subart" v-for="(subart, index) in sub_articles" :dict="dict" :key="index" v-on:link-click="link_click"/>
                </ul>
            </section>
        </div>
        <ArticleFooter :lemmas="data.lemmas" :content_locale="content_locale" :dict="dict" :article_id="article_id" />
        </NuxtErrorBoundary>
    </div>
</div>
    </article>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Icon from './bootstrap/Icon.vue';

const i18n = useI18n()
const store = useStore()
const toggle = ref(false)

const props = defineProps({
    article_id: Number,
    dict: String
})

const { pending, data } = useAsyncData('article_'+props.article_id, () => $fetch(`https://oda.uib.no/opal/dev/${props.dict}/article/${props.article_id}.json`))

const body_error = (error) => {
    console.log("BODY_ERROR", error)
}

const inflection_error = (error) => {
    console.log("INFLECTION_ERROR", error)
}

const content_locale = computed(() => {
    return i18n.locale == 'eng' ? 'eng' : {bm: 'nob', nn: 'nno'}[props.dict]
})


const has_content = () => {
    for (const definition of data.value.body.definitions) {
        for (const element of definition.elements) {
          if (['explanation', 'example', 'compound_list', 'definition'].includes(element.type_)) {
            return true
          }
        }
      }
      return false
}

const inflected = computed(() => {
    return data.value.lemmas.reduce((acc, lemma) => acc += lemma.paradigm_info.reduce((acc2, digm) => digm.inflection_group.includes("uninfl") ? 0 : acc2 += digm.inflection.length, 0), 0) > data.value.lemmas.length

})

const lemmas_with_word_class_and_lang = computed(() => {
    return data.value.lemmas.map(lemma => Object.assign({language: props.dict == 'bm' ? 'nob' : 'nno',
                                                     word_class: lemma.paradigm_info[0].inflection_group.split('_')[0]}, lemma))
})


const find_sub_articles = (definition) => {
    let sub_art_list = []
  try {
    let sub_definitions = definition.elements.filter(el => el.type_ == 'definition')
    let sub_articles = definition.elements.filter(el => el.type_ == 'sub_article' && el.lemmas)

      sub_definitions.forEach((subdef, i) => {
        sub_art_list = sub_art_list.concat(find_sub_articles(subdef))
      })
      sub_art_list = sub_art_list.concat(sub_articles)
  return sub_art_list

  }
  catch(error) {
    console.log("find_sub_articles", props.article_id, props.dict,  '"'+error.message+'"')

    return []
  }
}
const sub_articles = computed(() => {
    return data.value.body.definitions.reduce((acc, val) => acc.concat(find_sub_articles(val)), []).sort((s1, s2) => s1.lemmas[0].localeCompare(s2.lemmas[0]))
})



const link_click = (event) => {
    console.log("ARTICLE CLICKED", event)
}

</script>

<style scoped>

 h2 {
    color: rgba(0,0,0,.6) !important;
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    letter-spacing: .1rem;
    font-variant-caps: all-small-caps;
    font-weight: 600;
    font-size: 1.25rem !important;

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
    width: 100%;
}

.inflection-wrapper {
    overflow: hidden;
}


ol > li:only-child.level1, li:only-child.level2 {
  /* level3 a.k.a. underdefinisjoner skal vises med bullet selv om de står alene */
  /* list-style: none;*/
  color: blue;
}

li:only-child.level1 > ol {
  padding-left: 0px;
}

ul, ol {
  padding-left: 12px !important;
}

ul li

ul li.definition {
  list-style: disc;
}

h4 {
  font-size: 1.5rem;
  color: var(--bs-primary);
  font-variant: all-small-caps;
  font-weight: 600;
  padding-right: 1rem;

}

.article-dict-label {
    font-size: 1.5rem !important;
    padding-left: 0.25rem;
    padding-bottom: 1rem;
}


.skeleton {
    background-color: rgba(0,0,0, .1);
    border-radius: 1rem;
    margin-left: 1rem;

}
.skeleton-heading {
    height: 2rem;
    width: 15rem;
}

.skeleton-subheading {
    height: 1.25rem;
    width: 10rem;
}

.skeleton-content {
    height: 1rem;
    margin: 1rem;
}

.skeleton-container {
    height: 30rem;
}
.skeleton-indent {
    margin-left: 2rem;
}

</style>
