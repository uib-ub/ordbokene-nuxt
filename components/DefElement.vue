<template>
    <component :is="tag" :class="body.type_"><!--
   --><component :is="item.tag || 'span'" v-for="(item, index) in assemble_text"
            :class="item.type"
            @error="article_error"
            :key="index"
             v-bind="item.props"><!--
            -->{{item.html}}<!--
            
         --><router-link class="article_ref" v-if="item.type == 'article_ref'" :to="item.ref" @click.native="article_link_click(item)" :key="index"><!--
         --><DefElement tag='span' v-if="item.link_text.type_" :dictionary="dictionary" :key="item.id+'_sub'" :body='item.link_text'/><span v-else>{{item.link_text}}</span><!--
         --><span class="homograph" v-if="item.lemmas[0].hgno" :aria-label="`${dictionary=='bm'? 'Betydning': 'Tyding'} ${item.lemmas[0].hgno}`" :title="`${dictionary=='bm'? 'Betydning': 'Tyding'} ${item.lemmas[0].hgno}`" :key="index"><!--
          --> ({{roman_hgno(item.lemmas[0])}}{{item.definition_order ? '': ')'}}</span>
          <span class="def_order" v-if="item.definition_order" :aria-label="'definisjon '+item.definition_order">{{item.lemmas[0].hgno ? ', ': ' ('}}{{item.definition_order}})</span>
         </router-link>
  
         <!--
         --><span class="numerator" v-if="item.type == 'fraction'">{{item.num}}</span><!--
         -->{{item.type == 'fraction' ? '⁄' : ''}}<!--
         --><span class="denominator" v-if="item.type == 'fraction'">{{item.denom}}</span><!--
   --></component></component>
  </template>
  
  <script>
  import entities from '../utils/entities.js'
  import helpers from '../utils/helpers.js'
  
  function replace_grammar_id(item, lang) {
    let content = item.content
    if (content.includes('$') && (item.items[0].id)){
      let replacement_item = entities[lang][item.items[0].id]['expansion']
      content = content.replace('$', replacement_item)}
  
    return content
  }
  
  export default {
    name: 'DefElement',
    props: {
      body: Object,
      tag: {
        type: String,
        default: 'li'
      },
      dictionary: String
    },
    data: function() {
      return {
        path: this.$route.fullPath
      }
    },
    computed: {
      fulltext_highlight: function() {
        return this.$store.state.fulltextHighlight
      },
      unparsed: function(){
        try {
          let lang = this.dictionary
          let path = this.path
          return this.body.items.map(
            function(item){
              if (item.type_ == 'usage') {
                if (item.items) {
                  item.content = item.text
                  return {type: item.type_, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dictionary: lang}}
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
                      ref: '/' + lang + '/' + item.article_id + (item.definition_id ? '#def' + item.definition_id : ''),
                      article_id: item.article_id,
                      definition_id: item.definition_id,
                      definition_order: item.definition_order,
                      source: path
                      }
                  } 
              else if (item.type_ == 'pronunciation') return {type: item.type_, html: item.string}
              else if (item.type_ == 'pronunciation_guide') return {type: item.type_, body: item, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dictionary: lang}}
              else if (item.type_ == 'superscript') return {type: item.type_, html: item.text, tag: 'sup'}
              else if (item.type_ == 'subscript') return {type: item.type_, html: item.text, tag: 'sub'}
              else if (item.type_ == 'quote_inset') return {type: item.type_, body: item, html: '', tag: 'DefElement', props: {body: item, tag: 'i', dictionary: lang}}
              else if (item.type_ == 'fraction') return helpers.fraction(item.numerator, item.denominator)
              else if (item.id) return {type: item.type_, html:  (entities[lang][item.id] || {})['expansion'] || item.id}
              else return {type: item.type_ || 'plain', html: item}
          }
        )
  
        }
        catch(error) {
          this.$emit('error', {location: "unparsed", message: error.message} )
          return {type: 'plain', html: item}
        }
  
      },
      assemble_text: function(){
        try {
                var old_parts = this.body.content.split(/(\$)/)
        var text_items = this.unparsed.slice(0).reverse()
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
          this.$emit('error', {location: "assemble_text", message: error.message} )
          return []
        }
  
      }
    },
    methods: {
      article_link_click: function(item) {
        this.$emit('article-click', item)
      },
      article_error: function(payload) {
        this.$emit('error', payload)
      },
      roman_hgno: helpers.roman_hgno
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .usage {
    font-style: italic;
  }
  
  .pronunciation_guide {
    font-size: smaller;
  }
  
  .numerator{
    vertical-align: super;
    padding-right: 2px;
    font-size: smaller;
  }
  
  .denominator {
    vertical-align: sub;
    padding-left: 2px;
    font-size: smaller;
  }
  
  
  mark {
    background: rgba(255, 255, 255, 0);
    color: inherit;
  }
  
  i {
    font-style: normal;
  }
  
  
  .link_text {
    text-decoration: underline;
  
  }
  
  .homograph, .def_order{
    text-decoration: none !important;
    color: black
  
  }
  
  q:before {
    content: none;
  }
  
  q:after {
    content: none;
  }
  
  </style>
  