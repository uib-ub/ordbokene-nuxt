<template>
<li class="sub_article">
    <span class="sub_article_header">
    {{body.lemmas[0]}}
    </span>
    <ul>
    <DefElement :body="body.intro" v-if="body.intro" :dictionary="dictionary" @article-click="article_click"/>
    <Definition :level="9" :body="body.article.body.definitions[0]" :dictionary="dictionary" @article-click="article_click" :content_locale="content_locale"/>
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
    ul {
        padding-left: 0px;
    }
</style>
    