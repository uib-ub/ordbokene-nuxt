<template>
<li class="sub_article">
    <span class="sub_article_header">
    {{body.lemmas[0]}}
    </span>
    <ul>
    <DefElement :body="body.intro" v-if="body.intro" :dict="dict" @link-click="link_click"/>
    <Definition :level="9" :body="body.article.body.definitions[0]" :dict="dict" @link-click="link_click" :content_locale="content_locale"/>
    </ul>
</li>
</template>

<script setup>

const props = defineProps({
    body: Object,
    dict: String,
    content_locale: String
})

const emit = defineEmits(['link-click'])
const link_click = (event) => {
    emit('link-click', event)
}

</script>

<style scoped>

.sub_article_header {
  font-weight: bold;
  color: var(--bs-primary);
}

li.sub_article {
  padding-top: 8px;
}

li.sub_article ul {
  padding-top: 0px;
}

ul li {
  list-style:none;
}


</style>
    