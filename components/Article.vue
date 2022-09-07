<template>
    <article>
        <h2 v-if="store.view != 'article'" class="dict-label">{{{"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[dict]}}</h2>
        <div class="p-3">
        <h3>{{data.lemmas[0].lemma}}    </h3><button v-if="inflected" class="inflection-button py-1 px-3" type="button" data-bs-toggle="collapse" :data-bs-target="'#inflection-'+article_id" aria-expanded="false" aria-controls="collapseExample">
            {{$t('article.show_inflection')}}
        </button>
        <p>

        
        </p>
        <div v-if="inflected" class="collapse" :id="'inflection-'+article_id" ref="inflection_table">
        <div class="inflection-container card card-body">

            <InflectionTable :eng="$i18n.locale == 'eng'" :lemmaList="lemmas_with_word_class_and_lang" :mq="'sm'" :context="true" :key="$i18n.locale"/>

        </div>
        </div>
        {{data}}
        

        </div>
    </article>
</template>

<script>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'


export default {
    props: {
        article_id: String,
        dict: String
    },
    async setup(props) {
        const store = useStore()
        const { pending, data } = await useAsyncData('articlee'+props.article_id, () => $fetch(`https://oda.uib.no/opal/dev/${props.dict}/article/${props.article_id}.json`))
        return {data, pending, store}
  
    },
    computed: {
        collapsed: function() {
            return this.$refs

        },
        inflected: function() {
      return this.data.lemmas.reduce((acc, lemma) => acc += lemma.paradigm_info.reduce((acc2, digm) => digm.inflection_group.includes("uninfl") ? 0 : acc2 += digm.inflection.length, 0), 0) > this.data.lemmas.length
        },
        lemmas_with_word_class_and_lang: function() {
      return this.data.lemmas.map(lemma => Object.assign({language: this.dict == 'bm' ? 'nob' : 'nno',
                                                     word_class: lemma.paradigm_info[0].inflection_group.split('_')[0]}, lemma))
    },
    }
}
</script>

<style scoped>

 h2 {
    color: rgba(0,0,0,.6);
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    letter-spacing: .1rem;
    z-index: 2;
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;

}

h3 {
    font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight:600;

}

article {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .2);
    background-color: white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .2);
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
    box-shadow: 1px 1px 1px var(--bs-link);
    border: solid 1px var(--bs-link);
    border-radius: 1.5rem;
    display: inline-flex;
}

.inflection-wrapper {
    overflow: hidden;
}


</style>
