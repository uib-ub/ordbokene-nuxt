<template>
      <li :class="['definition', 'level'+level]"  :ref="level != 9 ? 'def' + body.id : ''" :id="level != 9? 'def' + body.id : ''">
    <span v-if="level!=9"/>
    <ul class="explanations">
      <DefElement :body="explanation" :dict="dict" :has_article_ref=has_article_ref(explanation) v-for="(explanation, index) in explanations" :key="index" v-on:link-click="link_click" :content_locale="content_locale"/>
    </ul>
    <div v-if="examples.length">
      <h5>{{$t('article.headings.examples', content_locale)}}</h5>
      <ul class="examples">
        <Example :body="example" :dict="dict" v-for="(example, index) in examples" :key="index" v-on:link-click="link_click" :content_locale="content_locale"/>
      </ul>
    </div>
    <ul class="compound_lists">
      <CompoundList :dict="dict" v-for="(compound_list, index) in compound_lists" :body="compound_list" :key="index" v-on:link-click="link_click" :content_locale="content_locale"/>
    </ul>
    <component :is="level < 3 ? 'ol' : 'ul'" class="sub_definitions" v-if="subdefs.length">
      <Definition :def_number='index+1' :level="level+1" :body="subdef" v-for="(subdef, index) in subdefs"  :dict="dict" :key="index" v-on:link-click="link_click" :content_locale="content_locale"/>
    </component>
  </li>
    
</template>


<script setup>

const props = defineProps({
    body: Object,
    level: Number,
    dict: String,
    def_number: Number,
    content_locale: String
})

const emit = defineEmits(['link-click'])
const link_click = (event) => {
    emit('link-click', event)
}

const explanations = computed(() => {
    return props.body.elements.filter(el => el.type_ == 'explanation')
})

const examples = computed(() => {
    return props.body.elements.filter(el => el.type_ == 'examples')
})

const compound_lists = computed(() => {
    return props.body.elements.filter(el => el.type_ == 'compound_list')
})

const subdefs = computed(() => {
    return props.body.elements.filter(el => el.type_ == 'definition').filter(def => def.elements.filter(el => el.type_ != 'sub_article').length > 0)
})


const has_article_ref = (item) => {
    if(item.items.length && item.items[0].type_ == "article_ref" && item.items[0].definition_id === undefined)
        {
          return "true";
        }
        else{
          return "false";
        }

}



</script>