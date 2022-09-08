<template>
<li class="example">
    <DefElement tag="q" :body="body.quote"  v-on:link-click="link_click" :dictionary="dictionary" /><span v-if="body.explanation && body.explanation.content.length"> – </span>
    <DefElement tag="span" :body="body.explanation" v-if="body.explanation && body.explanation.content.length" v-on:link-click="link_click" :dictionary="dictionary" />
</li>
    
</template>
<script setup>

const props = defineProps({
    body: Object,
    dict: String
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
    