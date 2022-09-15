<script setup>
const props = defineProps({
    lemmas: Array,
    dict: String,
    article_id: Number,
    title_id: String,
    content_locale: String
})

const citation_dialog = ref(false);

 const create_link = () => {
      return `https://ordbokene.no/${props.dict}/${props.article_id}/${encodeURIComponent(props.lemmas[0].lemma)}`
    };

const logLink = () => {
    console.log(create_link())
}

const get_citation_info = () => {
      let date = new Date();
      let dd = (date.getDate() < 10? '0' : '') + date.getDate()
      let mm = (date.getMonth() < 9? '0' : '') + (date.getMonth()+1)
      let yyyy = date.getFullYear()
      let link = create_link()
      let lemma = props.lemmas[0].lemma
      let dict = {"bm":"Bokmålsordboka", "nn":"Nynorskordboka"}[props.dict]
      return [lemma, dd, mm, yyyy, link, dict]
    }

const create_citation = () => {
      const [lemma, dd, mm, yyyy, link, dict] = get_citation_info()
      let citation = {lemma, link, dd, mm, yyyy, dict}

      return citation
    }



onMounted(() => {
    
})
</script>

<template>
<client-only>
<div class="d-flex justify-content-around">
    <button class="btn rounded-pill" @click="logLink"><i class="bi bi-link pe-2"></i> {{$t("article.copy_link", content_locale)}}</button>
    <button class="btn rounded-pill"><i class="bi bi-share-fill pe-2"></i> {{$t("article.share", content_locale)}}</button>
    <button class="btn rounded-pill" type="button" data-bs-toggle="collapse" :data-bs-target="'#cite-'+article_id" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-quote pe-2"></i> {{$t("article.cite", content_locale)}}</button>
</div>
<div class="collapse py-2" :id="'cite-'+article_id">
    <div class="cite-container card card-body">
      <h4>{{$t('article.cite_title')}}</h4>
      <p>{{$t("article.cite_description[0]", content_locale)}}<em>{{$t('dicts.'+$props.dict)}}</em>{{$t("article.cite_description[1]", content_locale)}}</p>
      <div id="citation" v-html="$t('article.citation', create_citation())" />
    </div>
</div>
</client-only>
</template>

<style scoped>
.btn {
    color: var(--bs-primary);
    text-transform: uppercase;
    font-size: .8rem;
    font-weight: 600;
}
.btn:focus {
    box-shadow: 1px 1px 1px var(--bs-primary);
}

.cite-container {
    box-shadow: 1px 1px 1px var(--bs-primary);
    border: solid 1px var(--bs-primary);
    border-radius: 1.5rem;
    display: inline-flex;
    width: 100%;
}
h4 {
  font-size: 1.5rem;
  color: var(--bs-primary);
  font-variant: all-small-caps;
  font-weight: 600;

}
</style>