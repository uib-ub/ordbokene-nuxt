<template>
  <component :is="tag" :class="body.type_"><!--
 --><component :is="item.tag || 'span'" v-for="(item, index) in assemble_text"
          :class="item.type"
          :key="index"
           v-bind="item.props"><!--
          -->{{item.html}}<!--
          
       --><router-link class="article_ref" v-if="item.type == 'article_ref'" :to="item.ref" @click="link_click(item)" :key="index"><!--
       --><DefElement tag='span' v-if="item.link_text.type_" :dict="dict" :key="item.id+'_sub'" :body='item.link_text' :content_locale="content_locale"/><span v-else>{{item.link_text}}</span><!--
       --><span class="homograph" v-if="item.lemmas[0].hgno" :aria-label="`${dict=='bm'? 'Betydning': 'Tyding'} ${item.lemmas[0].hgno}`" :title="`${dict=='bm'? 'Betydning': 'Tyding'} ${item.lemmas[0].hgno}`" :key="index"><!--
        --> ({{roman_hgno(item.lemmas[0])}}{{item.definition_order ? '': ')'}}</span>
        <span class="def_order" v-if="item.definition_order" :aria-label="'definisjon '+item.definition_order">{{item.lemmas[0].hgno ? ', ': ' ('}}{{item.definition_order}})</span>
       </router-link>

       <!--
       --><span class="numerator" v-if="item.type == 'fraction'">{{item.num}}</span><!--
       -->{{item.type == 'fraction' ? '⁄' : ''}}<!--
       --><span class="denominator" v-if="item.type == 'fraction'">{{item.denom}}</span><!--
 --></component></component>
</template>


<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const emit = defineEmits(['error'])

const props = defineProps({
    body: Object,
    tag: {
      type: String,
      default: 'span'
    },
    dict: String,
    content_locale: String
})


const unparsed = computed(() => {

        return props.body.items.map(
          function(item){
            try {
            
            if (item.type_ == 'usage') {
              if (item.items) {
                item.content = item.text
                return {type: item.type_, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dict: props.dict}}
              }
              else {
                return {type: item.type_, html: item.text, tag: 'i'}
              }
            }
            else if (item.type_ == 'article_ref') {
                return {
                    type: item.type_,
                    html: '',
                    lemmas: item.lemmas,
                    link_text: item.word_form || item.lemmas[0].annotated_lemma ||  item.lemmas[0].lemma,
                    ref: '/' + props.dict + '/' + item.article_id + (item.definition_id ? '#def' + item.definition_id : ''),
                    article_id: item.article_id,
                    definition_id: item.definition_id,
                    definition_order: item.definition_order,
                    source: "" //TODO: handle focus when returning from article
                    }
                } 
            else if (item.type_ == 'pronunciation') return {type: item.type_, html: item.string}
            else if (item.type_ == 'pronunciation_guide') return {type: item.type_, body: item, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dict: props.dict}}
            else if (item.type_ == 'superscript') return {type: item.type_, html: item.text, tag: 'sup'}
            else if (item.type_ == 'subscript') return {type: item.type_, html: item.text, tag: 'sub'}
            else if (item.type_ == 'quote_inset') return {type: item.type_, body: item, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dict: props.dict}}
            else if (item.type_ == 'fraction') return fraction(item.numerator, item.denominator)
            else if (item.id) return {type: item.type_, html:  ({"nn":store.concepts_nn, "bm":store.concepts_bm}[props.dict].data.concepts[item.id] || {})['expansion'] || item.id}
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
        var old_parts = props.body.content.split(/(\$)/)
        var text_items = unparsed.value.slice(0).reverse()
        var new_parts = []
        old_parts.forEach(function(item){
        if(item == '$') {
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



</script>