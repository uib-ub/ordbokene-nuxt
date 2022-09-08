<template>
    <span v-bind:class="{ 'lookup': $route.name=='lookup'}" v-for="(lemma_group, i) in lemma_groups" :key="i">
    <h3>
                <!--
    --><span v-for="(lemma, index) in lemma_group.lemmas"
          :key="index"><DefElement v-if="lemma.annotated_lemma" :body="lemma.annotated_lemma" tag="span"/><span v-else>{{lemma.lemma}}</span><!--
          --><span v-if="lemma.hgno"
                   :aria-label="$t('accessibility.homograph') + parseInt(lemma.hgno)"
                   :title="$t('accessibility.homograph')+parseInt(lemma.hgno)"
                   class="hgno">{{" "+roman_hgno(lemma)}}</span><!--
                    --><span
                   class="title_comma"
                   v-if="lemma_group.lemmas[1] && index < lemma_group.lemmas.length-1">{{", "}}
                  </span>
    </span>
</h3>
<h3 v-if="secondary_header_text">{{secondary_header_text}}</h3>  
    <span v-if="lemma_group.description" class="subheader">
    <span class="header_group_list">{{lemma_group.description}}</span>
          {{lemma_group.genus}}
    <span v-if="settings.inflectionNo" class="inflection_classes">{{lemma_group.inflection_classes}}</span>

    </span>
    </span>
</template>


<script setup>
import {useSettingsStore } from '~/stores/settingsStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const settings = useSettingsStore()
const test = t('or')

const props = defineProps({
    lemmas: Array,
    dict: String,
    article_id: Number,
    title_id: String,
    content_locale: String
})

const emit = defineEmits(['invalid'])

const inflection_classes = () => {
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
    let groups = [{lemmas: props.lemmas}]
      try {
        if (props.lemmas[0].paradigm_info[0] && props.lemmas[0].paradigm_info[0].tags[0] != 'NOUN' && props.lemmas[0].paradigm_info[0].tags[0] != 'EXPR') {
          groups = [{description:  t('tags.'+props.lemmas[0].paradigm_info[0].tags[0], props.content_locale), lemmas: props.lemmas}]
        }
        else if (props.lemmas[0].paradigm_info[0].tags[0] == 'NOUN') {
            let genus_map  = {}
            props.lemmas.forEach(lemma =>{
              let genera = new Set()
              lemma.paradigm_info.forEach(paradigm => {
                genera.add(paradigm.tags[1])
              })
              let genus_description = ""
              if (genera.size == 3) {
                genus_description +=  t('tags.Masc') + ', ' +  t('tags.Fem', props.content_locale) +  t('or') +  t('tags.Neuter', props.content_locale)
              } else {
                genus_description += Array.from(genera).map(code =>  t('tags.'+code, props.content_locale)).sort().join(t('or'))
              }
              if (genus_map[genus_description]) {
                genus_map[genus_description].push(lemma)
              }
              else {
                genus_map[genus_description] = [lemma]
              }
            })
            groups = Object.keys(genus_map).map(key => {
              return {description:  t('tags.NOUN', props.content_locale), genus: key, lemmas: genus_map[key], }
            })

        
        }
        
        groups.forEach((lemma_group, index) => {
              groups[index]['inflection_classes'] = inflection_classes(lemma_group.lemmas)
            })
    } catch(error) {
      console.log("lemma_groups",props.article_id, props.dict, '"'+error.message+'"')
      emit('invalid')
    }
      return groups


})

const secondary_header_text = computed(() => {
    let a_forms = []
      props.lemmas.forEach((lemma, i) => {
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
h3 {
    font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight:600;

}

.header_group_list {
    font-variant: all-small-caps;
    font-style: normal;
    font-size: 1.5rem;
}

.hgno {
  color: rgba(0,0,0,.6) !important;
  font-family: unset;
  font-size: 1rem;
}

</style>
