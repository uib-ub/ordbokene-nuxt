<script setup>
const props = defineProps({
    lemmas: Array,
    dict: String,
    article_id: Number,
    title_id: String,
    content_locale: String
})

onMounted(() => {
    const showLinkCopy = navigator.clipboard;
})
</script>

<template>
<client-only>
<div class="d-flex justify-content-around">
    <button class="btn rounded-pill"><i class="bi bi-link pe-2"></i> {{$t("article.copy_link", content_locale)}}</button>
    <button class="btn rounded-pill"><i class="bi bi-share-fill pe-2"></i> {{$t("article.share", content_locale)}}</button>
    <button class="btn rounded-pill"><i class="bi bi-quote pe-2"></i> {{$t("article.cite", content_locale)}}</button>
</div>
</client-only>
</template>

<style scoped>
.btn{
    color: var(--bs-primary);
    text-transform: uppercase;
    font-size: .8rem;
    font-weight: 600;
}
</style>