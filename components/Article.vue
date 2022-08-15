<template>
    <h2>ID: {{ article_id }}</h2>
    <h3>Body</h3>
    <p>{{article}}</p>
</template>

<script>

export default {
    props: {
        article_id: String,
    },
    async setup(props) {
        const { data: article } = await useLazyAsyncData('article', () => $fetch(`https://oda.uib.no/opal/dev/nn/article/${props.article_id}.json`))
        return {article}
  
    }
}
</script>
