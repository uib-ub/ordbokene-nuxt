<template>
    <h2>ID: {{ article_id }}</h2>
</template>

<script>

export default {
    props: {
        article_id: Object
    },
    setup(props) {
        console.log(props.article_id)
        

    }
}
</script>
