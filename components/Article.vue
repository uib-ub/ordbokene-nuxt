<template>
    <article class="pt-lg-1">
        <h2 v-if="store.view != 'article'" class="dict-label d-lg-none d-block">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <div class="p-4">
        <ArticleHeader :lemmas="data.lemmas" :content_locale="content_locale" :dict="dict"/>
        
        <button v-if="inflected" class="inflection-button py-1 px-3 mx-2" type="button" data-bs-toggle="collapse" :data-bs-target="'#inflection-'+article_id" aria-expanded="false" aria-controls="collapseExample">
            {{$t('article.show_inflection')}}
        </button>

        <div v-if="inflected" class="collapse py-2" :id="'inflection-'+article_id" ref="inflection_table">
            <div class="inflection-container card card-body">
                <InflectionTable :eng="$i18n.locale == 'eng'" :lemmaList="lemmas_with_word_class_and_lang" :mq="'sm'" :context="true" :key="$i18n.locale"/>
            </div>
        </div>
        <div class="article_content pt-3" ref="article_content">
            <section v-if="data.body.pronunciation && data.body.pronunciation.length" class="pronunciation">
                <h4>{{$t('article.headings.pronunciation', content_locale)}}</h4>
                <ul>
                <DefElement v-for="(element, index) in data.body.pronunciation" :dict="dict" :key="index" :body='element' v-on:rticle-click="link_click"/>
                </ul>
            </section>
            <section v-if="data.body.etymology && data.body.etymology.length" class="etymology">
                <h4>{{$t('article.headings.etymology', content_locale)}}</h4>
                <ul>
                <DefElement v-for="(element, index) in data.body.etymology" :dict="dict" :key="index" :body='element' v-on:rticle-click="link_click"/>
                </ul>
            </section>
            <section class="definitions" v-if="has_content">
                <h4>{{$t('article.headings.definitions', content_locale)}}</h4>
                <ol>
                <Definition v-for="definition in data.body.definitions" :dict="dict" :level="1" :key="definition.id" :body='definition' v-on:rticle-click="link_click"/>
                </ol>
            </section>
            <section v-if="sub_articles.length" class="expressions">
                <h4>{{$t('article.headings.expressions', content_locale)}}</h4>
                <ul>
                <SubArticle :body="subart" v-for="(subart, index) in sub_articles" :dict="dict" :key="index" v-on:rticle-click="link_click"/>
                </ul>
            </section>
        </div>
    </div>
    </article>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const store = useStore()


const element_error = (event) => {
    console.log("ERROR", event)
}

const props = defineProps({
    article_id: Number,
    dict: String
})

const content_locale = computed(() => {
    return i18n.locale == 'eng' ? 'eng' : {bm: 'nob', nn: 'nno'}[props.dict]
})

const has_content = () => {
    for (const definition of props.body.definitions) {
        for (const element of definition.elements) {
          if (['explanation', 'example', 'compound_list', 'definition'].includes(element.type_)) {
            return true
          }
        }
      }
      return false
}



const { pending, data } = await useAsyncData('article_'+props.article_id, () => $fetch(`https://oda.uib.no/opal/dev/${props.dict}/article/${props.article_id}.json`))

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
    console.log("find_sub_articles", this.article.article_id, this.dictionary,  '"'+error.message+'"')

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


section {
  padding-top: 10px;
  padding-bottom: 10px
}


section.etymology > h4, section.pronunciation > h4 {
  display: inline;
}

section.etymology ul, section.pronunciation ul, section.etymology li, section.pronunciation li {
  display: inline;
}

section.etymology li:not(:first-child):not(:last-child):before, section.pronunciation li:not(:first-child):not(:last-child):before {
  content: ", ";
}

section.etymology li:not(:first-child):last-child:before, section.pronunciation li:not(:first-child):last-child:before {
  content: "; ";
  font-size: smaller;
}

li {
  padding-bottom: 4px;
}

li.level1.definition {
  list-style: upper-alpha;
}

li.level2.definition {
  list-style: decimal;
}

li.level3.definition {
  /* Norsk ordbok skal ha "lower.alpha" her */
  list-style: disc;
}

li.sub_article > ul {
  padding-left: 0px;
}

::marker {
  font-weight: bold;
  color: var(--v-primary-base);
}

ol > li:only-child.level1, li:only-child.level2 {
  /* level3 a.k.a. underdefinisjoner skal vises med bullet selv om de står alene */
  list-style: none;
}

li:only-child.level1 > ol {
  padding-left: 0px;
}

ul, ol {
  padding-left: 12px !important;
}

ul li {
  list-style:none;
}

ul li.definition {
  list-style: disc;
}

h4 {
  font-size: 1.5rem;
  color: var(--bs-primary);
  font-variant: all-small-caps;
  font-weight: 600;

}


</style>
