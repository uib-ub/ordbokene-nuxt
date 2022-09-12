<script setup>
const props = defineProps({
    lemmas: Array,
    dict: String,
    article_id: Number,
    title_id: String,
    content_locale: String
})

</script>

<template>
<div>
    <button>{{$t("article.copy_link", content_locale)}}</button>
    <button>{{$t("article.share", content_locale)}}</button>
    <button>{{$t("article.cite", content_locale)}}</button>
</div>
</template>