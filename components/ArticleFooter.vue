<script setup>
const props = defineProps({
    lemmas: Array,
    dict: String,
    article_id: Number,
    title_id: String,
    content_locale: String
})

let copy_popup = ref(false);


const showToast = () => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastList = toastElList.map(function(toastEl) {
          return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => toast.show());
        console.log(toastList);
}

const create_link = () => {
      return `https://ordbokene.no/${props.dict}/${props.article_id}/${encodeURIComponent(props.lemmas[0].lemma)}`
    };

const webShareApiSupported = computed(() => {
  return navigator.share
})

const showLinkCopy = computed(() => {
  return navigator.clipboard
})

const shareViaWebShare = () => {
        navigator.share({
        title: "Ordbøkene.no: " + props.lemmas[0].lemma,
        text: "",
        url: "/" + props.dict + '/' + props.article_id + '/' + encodeURIComponent(props.lemmas[0].lemma)
      })
      };

const copy_link = () => {
      let link = create_link()
        navigator.clipboard.writeText(link).then(() => {
          console.log("SUCCESS")
          copy_popup = true;
          showToast();
         }).catch(err => {
           console.log("ERROR COPYING:",err)
         })
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

const copy_citation = () => {
      let citation = document.getElementById("citation").textContent;
      navigator.clipboard.writeText(citation)
      copy_popup = true
    }

const download_ris = () => {
      const [lemma, dd, mm, yyyy, link] = get_citation_info()
      const a = document.createElement("a")
      a.style = "display: none"
      a.setAttribute("download", `${lemma}_${props.dict}.ris`)
      const dict = {"bm":"Bokmålsordboka", "nn": "Nynorskordboka"}[props.dict]
      const text = `TY  - DICT\nTI  - ${lemma}\nT2  - ${dict}\nPB  - Språkrådet og Universitetet i Bergen\nUR  - ${link}\nY2  - ${yyyy}/${mm}/${dd}/\nER  - `
      a.setAttribute('href', 'data:application/x-research-info-systems;charset=utf-8,' + encodeURIComponent(text));
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
</script>

<template>
<client-only>
  <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
    <div class="d-flex">
      <div class="toast-body">{{$t('article.link_copied', 1, { locale: content_locale})}}</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div v-if="copy_popup">
  <div class="position-absolute top-50 start-50 translate-middle"><span>{{$t('article.link_copied', 1, { locale: content_locale})}}</span></div>
  </div>
<div class="d-flex justify-content-around mt-3">
    <button class="btn rounded-pill" v-if="showLinkCopy" @click="copy_link" :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]"><BootstrapIcon icon="bi-link" class="pe-2" /> {{$t("article.copy_link", 1, { locale: content_locale})}}</button>
    <button class="btn rounded-pill" v-if="webShareApiSupported" @click="shareViaWebShare" :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]"><BootstrapIcon icon="bi-share-fill" class="pe-2" /> {{$t("article.share", 1, { locale: content_locale})}}</button>
    <button class="btn rounded-pill" type="button" data-bs-toggle="collapse" :data-bs-target="'#cite-'+article_id" aria-expanded="false" aria-controls="collapseExample" :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]"><BootstrapIcon icon="bi-quote" class="pe-2" /> {{$t("article.cite", 1, { locale: content_locale})}}</button>
</div>
<div class="collapse py-2" :id="'cite-'+article_id">
    <div class="cite-container card card-body">
      <h4>{{$t('article.cite_title')}}</h4>
      <p :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]">{{$t("article.cite_description[0]", 1, { locale: content_locale})}}<em>{{$t('dicts.'+$props.dict)}}</em>{{$t("article.cite_description[1]", 1, { locale: content_locale})}}</p>
      <div id="citation" v-html="$t('article.citation', create_citation())" />
      <div class="pt-3">
        <button class="btn rounded-pill" @click="copy_citation" :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]"><BootstrapIcon icon="bi-clipboard" class="pe-1" /> {{$t("article.copy", 1, { locale: content_locale})}}</button>
        <button class="btn rounded-pill" @click="download_ris" :lang="{nob: 'nb', nno: 'nn', eng: 'en'}[content_locale]"><BootstrapIcon icon="bi-download" class="pe-1" /> {{$t("article.download", 1, { locale: content_locale})}}</button>
      </div>
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