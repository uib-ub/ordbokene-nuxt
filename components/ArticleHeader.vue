<template>
  <div class="mb-2">
    <div class="article-title" v-for="(lemma_group, i) in lemma_groups" :key="i">
    <h3 class="notranslate">
                
   <span v-for="(lemma, index) in lemma_group.lemmas"
          :key="index">
          <DefElement v-if="lemma.annotated_lemma" :body="lemma.annotated_lemma" tag="span" :scoped_locale="scoped_locale"/><span v-else>{{lemma.lemma}}</span>
         <span v-if="lemma.hgno" class="hgno">{{"\xa0"}}<span class="sr-only">{{parseInt(lemma.hgno)}}</span><span aria-hidden="true">{{roman_hgno(lemma)}}</span></span>
                   <span
                   v-if="lemma_group.lemmas[1] && index < lemma_group.lemmas.length-1"
                   class="title_comma">{{", "}}
                  </span>
    </span>
</h3>
<h3 v-if="secondary_header_text" class="notranslate">{{secondary_header_text}}</h3>  
  <div v-if="lemma_group.description" :lang="locale2lang[scoped_locale]"  class="subheader">
    <span class="header-group-list">{{lemma_group.description}}</span>
      <em v-if="lemma_group.pos_group">{{" "+lemma_group.pos_group}}</em>
    <span v-if="settings.inflectionNo" class="inflection_classes">{{lemma_group.inflection_classes}}</span>

  </div>
  </div>
  </div>
</template>


<script setup>
import {useSettingsStore } from '~/stores/settingsStore'
const settings = useSettingsStore()

const props = defineProps({
    lemma_groups: {type: Array, required: true},
    secondary_header_text: String,
    dict: String,
    article_id: {type: Number, required: true},
    scoped_locale: {type: String, required: true}
})

</script>

<style scoped>



.subheader {
  @apply text-base;

}

.hgno {
  color: rgba(0,0,0,.6) !important;
  font-family: unset;
  font-size: 1rem;
}

div>.article-title:not(:first-child) {
  margin-top: 1rem;
}

div>.article-title:not(:only-child) h3 {
  margin-bottom: 0rem;
}

.article-title>h3:not(:only-child) {
  margin-bottom: 0.5rem;
}

</style>
