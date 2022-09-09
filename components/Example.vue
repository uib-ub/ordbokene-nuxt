<template>
<li class="example">
    <em><DefElement tag="q" :body="body.quote"  v-on:link-click="link_click" :dictionary="dictionary" :content_locale="content_locale"/><span v-if="body.explanation && body.explanation.content.length"> – </span>
    <DefElement tag="span" :body="body.explanation" v-if="body.explanation && body.explanation.content.length" v-on:link-click="link_click" :dictionary="dictionary" :content_locale="content_locale"/></em>
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
    