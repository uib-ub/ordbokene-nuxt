<template>
    <div class="list-view-item" v-if="settings.listView && store.advanced == true && $route.name == 'search' && store.q">
        <span v-if="pending" class="list-group-item"><div class="skeleton skeleton-content w-25"/><div class="skeleton skeleton-content w-50"/></span>
        <NuxtLink v-else class="list-group-item result-list-item" :to="link_to_self()">

    <div v-for="(lemma_group, i) in lemma_groups" :key="i">
    <span class="lemma-group">

    <span v-for="(lemma, index) in lemma_group.lemmas"
          :key="index"><span class="lemma"><DefElement v-if="lemma.annotated_lemma" :body="lemma.annotated_lemma" tag="span" :content_locale="content_locale"/><span v-else>{{lemma.lemma}}</span></span>
          <span v-if="lemma.hgno"
                   :aria-label="$t('accessibility.homograph') + parseInt(lemma.hgno)"
                   :title="$t('accessibility.homograph')+parseInt(lemma.hgno)"
                   class="hgno">{{" "+roman_hgno(lemma)}}</span>
                    <span
                   class="title_comma"
                   v-if="lemma_group.lemmas[1] && index < lemma_group.lemmas.length-1">{{", "}}
                  </span>
    </span>
</span>
<span v-if="secondary_header_text">,&nbsp;<span class="lemma-group lemma">{{secondary_header_text}}</span></span>
    &nbsp;<em v-if="lemma_group.description" class="subheader">
    <span class="header_group_list">{{lemma_group.description}}</span>
          {{lemma_group.genus}}
    <span v-if="settings.inflectionNo" class="inflection_classes">{{lemma_group.inflection_classes}}</span>

    </em>
</div><Snippet :dict="dict" :definitions="data.body.definitions"/>

    </NuxtLink>
</div>
    <div class="article pt-lg-1" v-else-if="!error">
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
        <h2 v-if="welcome" class="dict-label">{{$t('monthly', 1, { locale: content_locale}) + {"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <h2 v-else-if="store.view != 'article'" class="dict-label d-lg-none d-block">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <h2 v-else-if="store.view == 'article'" class="article-dict-label">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <div :class="welcome? 'p-4' : 'px-4 pt-4 pb-2'">
        <ArticleHeader :lemma_groups="lemma_groups" :secondary_header_text="secondary_header_text" :content_locale="content_locale" :dict="dict"/>

        <button v-if="inflected && !welcome" class="inflection-button btn rounded-pill py-1 px-3 mx-2" @click="toggle = !toggle" type="button" data-bs-toggle="collapse" :data-bs-target="'#inflection-'+article_id" aria-expanded="false" aria-controls="collapseExample">
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
            <section v-if="!welcome && data.body.pronunciation && data.body.pronunciation.length" class="pronunciation">
                <h4>{{$t('article.headings.pronunciation', 1, { locale: content_locale})}}</h4>

                <DefElement v-for="(element, index) in data.body.pronunciation" :dict="dict" :key="index" :body='element' v-on:link-click="link_click"/>

            </section>
            <section v-if="!welcome && data.body.etymology && data.body.etymology.length" class="etymology">
                <h4>{{$t('article.headings.etymology', 1, { locale: content_locale})}}</h4>

                <DefElement v-for="(element, index) in data.body.etymology" :dict="dict" :key="index" :body='element' v-on:link-click="link_click"/>

            </section>
            <section class="definitions" v-if="has_content">
                <h4 v-if="!welcome">{{$t('article.headings.definitions', 1, { locale: content_locale})}}</h4>

                <Definition v-for="definition in data.body.definitions" :dict="dict" :level="1" :key="definition.id" :body='definition' v-on:link-click="link_click" :welcome="welcome"/>

            </section>
            <section v-if="sub_articles.length && !welcome" class="expressions">
                <h4>{{$t('article.headings.expressions', 1, { locale: content_locale})}}</h4>
                <ul>
                <SubArticle :body="subart" v-for="(subart, index) in sub_articles" :dict="dict" :key="index" v-on:link-click="link_click"/>
                </ul>
            </section>
        </div>
        <ArticleFooter v-if="!welcome" :lemmas="data.lemmas" :content_locale="content_locale" :dict="dict" :article_id="article_id" />
        <div v-else class="d-flex justify-content-end"><NuxtLink :to="link_to_self()">{{$t('article.show')}} <i class="bi-arrow-right"/></NuxtLink></div>

        </NuxtErrorBoundary>
    </div>
</div>
</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Icon from './bootstrap/Icon.vue';
import {useSettingsStore } from '~/stores/settingsStore'

const { t } = useI18n()
const i18n = useI18n()
const store = useStore()
const toggle = ref(false)
const settings = useSettingsStore()

const props = defineProps({
    article_id: Number,
    dict: String,
    welcome: Boolean
})

const { pending, data, error } = useAsyncData('article_'+props.article_id, () => $fetch(`https://odd.uib.no/opal/dev/${props.dict}/article/${props.article_id}.json`,
                                                                                        {
                                                                                            async onResponseError({ request, response, options }) {
                                                                                                // TODO: plausible logging, error message if article view
                                                                                                console.log("RESPONSE ERROR", response.status)
                                                                                            },
                                                                                            async onRequestError({ request, response, error }) {
                                                                                                // TODO: plausible logging, error message if article view
                                                                                                console.log("REQUEST ERROR", error)
                                                                                            }
                                                                                        }))

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

const link_to_self = () => {
    return `/${props.dict}/${props.article_id}/${encodeURIComponent(data.value.lemmas[0].lemma)}`
    }


const inflection_classes = (lemmas) => {
    let inf_classes = new Set()
    let ureg = false
    lemmas.forEach((lemma, i) => {
    if (lemma.inflection_class) inf_classes.add(lemma.inflection_class)
    else ureg = true
    })
    if (inf_classes.size){

    let class_array = Array.from(inf_classes).sort()
    if (ureg) class_array.push("ureg.")
    let class_list
    if (class_array.length < 3) {
    class_list = class_array.join(" og ")
    }
    else {
    class_list = class_array.slice(0, -1).join(", ") + " og " + class_array[class_array.length -1]
    }
    return " ("+ class_list +")"
    }
}

const lemma_groups = computed(() => {
    let groups = [{lemmas: data.value.lemmas}]
      try {
        if (data.value.lemmas[0].paradigm_info[0] && data.value.lemmas[0].paradigm_info[0].tags[0] != 'NOUN' && data.value.lemmas[0].paradigm_info[0].tags[0] != 'EXPR') {
          groups = [{description:  t('tags.'+data.value.lemmas[0].paradigm_info[0].tags[0], 1, { locale: content_locale}), lemmas: data.value.lemmas}]
        }
        else if (data.value.lemmas[0].paradigm_info[0].tags[0] == 'NOUN') {
            let genus_map  = {}
            data.value.lemmas.forEach(lemma =>{
              let genera = new Set()
              lemma.paradigm_info.forEach(paradigm => {
                genera.add(paradigm.tags[1])
              })
              let genus_description = ""
              if (genera.size == 3) {
                genus_description +=  t('tags.Masc') + ', ' +  t('tags.Fem', 1, { locale: content_locale}) +  t('or') +  t('tags.Neuter', 1, { locale: content_locale})
              } else {
                genus_description += Array.from(genera).map(code =>  t('tags.'+code, 1, { locale: content_locale})).sort().join(t('or'))
              }
              if (genus_map[genus_description]) {
                genus_map[genus_description].push(lemma)
              }
              else {
                genus_map[genus_description] = [lemma]
              }
            })
            groups = Object.keys(genus_map).map(key => {
              return {description:  t('tags.NOUN', 1, { locale: content_locale}), genus: key, lemmas: genus_map[key], }
            })


        }

        groups.forEach((lemma_group, index) => {
              groups[index]['inflection_classes'] = inflection_classes(lemma_group.lemmas)
            })
    } catch(error) {
      console.log("lemma_groups",props.article_id, props.dict, '"'+error.message+'"')
    }
      return groups


})

const secondary_header_text = computed(() => {
    let a_forms = []
      data.value.lemmas.forEach((lemma, i) => {
        if (lemma.paradigm_info[0] && lemma.paradigm_info[0].inflection[1] && lemma.paradigm_info[0].inflection[1].tags[0] == 'Inf') {
          let inf2 = lemma.paradigm_info[0].inflection[1].word_form
          if (inf2 && inf2.length) {
            a_forms.push(inf2)
          }
        }
      });
      return a_forms.join(', ')
})


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

.inflection-button {
    border: solid 1px var(--bs-primary);
    color: var(--bs-primary);
    background-color: white;
    border-radius: 2rem;
    padding-right: 0.5rem !important;
}

.inflection-button:focus {
    box-shadow: 1px 1px 1px var(--bs-primary);
}
.inflection-button:hover {
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
    padding-left: 0.5rem;
    padding-bottom: 1rem;

}

.dict-label {
    padding-left: 0.25rem;
    margin-top: 0;
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

span.lemma {
    color: var(--bs-primary);
}

span.lemma-group {
    font-weight: 600;
}


.article {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .3);
    background-color: white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .3);
    margin-bottom: 1rem;
}



a.result-list-item {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


a.result-list-item:hover {
    background-color: rgba(0,0,0, .1);
}

.article-column>.list-view-item {
  border-bottom: solid 1px rgba(0,0,0, .25);
}


.article-column>.list-view-item:first-child {
  border-radius: 1.5rem 1.5rem 0 0 ;
}

.article-column>.list-view-item:last-child {
  border-bottom: none;
  border-radius: 0 0 1.5rem 1.5rem;
}

</style>
