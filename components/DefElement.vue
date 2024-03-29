<template>
  <component :is="tag" :class="body.type_"><!--
 --><component :is="item.tag || 'span'" v-for="(item, index) in assemble_text"
          :key="index"
          :class="item.type + (item.tag == 'em' ? ' notranslate' : '')"
           v-bind="item.props"><!--
          -->{{item.html}}<!--
       --><NuxtLink v-if="item.type == 'article_ref'" :key="index" class="article_ref notranslate"  :to="item.ref" @click="link_click(item.ref)" ><!--
       --><DefElement v-if="item.link_text.type_" :key="item.id+'_sub'" tag='span' :dict="dict" :body='item.link_text' :scoped_locale="scoped_locale"/><span v-else>{{item.link_text}}</span><!--
       --><span  v-if="item.lemmas[0].hgno" :key="index" class="homograph"><!--
        --> (<span class="sr-only">{{parseInt(item.lemmas[0].hgno)}}</span><span aria-hidden="true">{{roman_hgno(item.lemmas[0])}}{{item.definition_order ? '': ')'}}</span></span>
        <span v-if="item.definition_order" class="def_order">{{item.lemmas[0].hgno ? ', ': ' ('}}{{item.definition_order}})</span>
      </NuxtLink><span v-else>{{item.link_text}}</span>
       <!--
       --><span v-if="item.type == 'fraction'" class="numerator">{{item.num}}</span><!--
       -->{{item.type == 'fraction' ? '⁄' : ''}}<!--
       --><span v-if="item.type == 'fraction'" class="denominator">{{item.denom}}</span><!--
 --></component>
 <span v-if="semicolon && no_preceeding_punctuation">; </span>
 <span v-if="comma && no_preceeding_punctuation">, </span>
 </component>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
import DefElement from './DefElement.vue'
import { useSearchStore } from '~/stores/searchStore'
import { useSessionStore } from '~/stores/sessionStore'

const store = useSearchStore()
const session = useSessionStore()
const i18n = useI18n()


const emit = defineEmits(['error', 'link-click'])
const link_click = (itemref) => {
    emit('link-click', itemref)
}

const props = defineProps({
    body: Object,
    tag: {
      type: String,
      default: 'span'
    },
    dict: String,
    scoped_locale: String,
    semicolon: Boolean,
    comma: Boolean,
    has_article_ref: Boolean
})


const unparsed = computed(() => {

        return props.body.items.map(
          function(item){
            try {
            
            if (item.type_ === 'usage') {
              if (item.items) {
                item.content = item.text
                return {type: item.type_, html: item.text, tag: DefElement, props: {body: item, tag: 'em', dict: props.dict}}
              }
              else {
                return {type: item.type_, html: item.text, tag: 'em'}
              }
            }
            else if (item.type_ === 'article_ref') {
                return {
                    type: item.type_,
                    html: '',
                    lemmas: item.lemmas,
                    link_text: item.word_form || item.lemmas[0].annotated_lemma ||  item.lemmas[0].lemma,
                    ref: `/${i18n.locale.value}/${props.dict}/${item.article_id}${item.definition_id ? '#def' + item.definition_id : ''}`,
                    article_id: item.article_id,
                    definition_id: item.definition_id,
                    definition_order: !item.word_form && item.definition_order,
                    source: "" // TODO: handle focus when returning from article
                    }
                } 
            else if (item.type_ === 'pronunciation') return {type: item.type_, html: item.string}
            else if (item.type_ === 'pronunciation_guide') return {type: item.type_, body: item, html: '', tag: DefElement, props: {body: item, tag: 'em', dict: props.dict}}
            else if (item.type_ === 'superscript') return {type: item.type_, html: item.text, tag: 'sup'}
            else if (item.type_ === 'subscript') return {type: item.type_, html: item.text, tag: 'sub'}
            else if (item.type_ === 'quote_inset') return {type: item.type_, body: item, html: '', tag: DefElement, props: {body: item, tag: 'em', dict: props.dict}}
            else if (item.type_ === 'fraction') return fraction(item.numerator, item.denominator)
            else if (item.id) return {type: item.type_, html:  ({"nn":session.concepts_nn, "bm":session.concepts_bm}[props.dict][item.id] || {}).expansion || item.id}
            else return {type: item.type_ || 'plain', html: item}
            }
        catch(error) {
            console.log(error) // todo: add plausible logging
            return {type: 'plain', html: ""}
            }
        
        }
    )
})

const assemble_text = computed(() => {
    try {
        const old_parts = props.body.content.split(/(\$)/)
        const text_items = unparsed.value.slice(0).reverse()
        const new_parts = []
        old_parts.forEach(function(item){
        if(item === '$') {
            new_parts.push(text_items.pop())
        } else if (item.length) {
            new_parts.push({type: 'plain', html: item})
        }
        })
        return new_parts
        }
        catch(error) {
          console.log(error)
        return []
        }
})

const no_preceeding_punctuation = computed(()=> {
  const assebled_text = assemble_text.value
  const final_text = assebled_text[assebled_text.length-1] ? assebled_text[assebled_text.length-1].link_text || assebled_text[assebled_text.length-1].html : "none"
  if (final_text.length) {
    return !["?","!"].includes(final_text[final_text.length -1] )
  }

})



</script>
<style scoped>
.usage {
  @apply italic;
}


</style>
