<template>
    <article>
        <h2 v-if="store.view != 'article'" class="dict-label" role="heading" aria-level="2">{{dict_label}}</h2>
        <div class="p-3">
        <h3>test</h3>
        <ArticleHeader/><br><br>
    {{article}}

        </div>
    </article>
</template>

<script>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'


export default {
    props: {
        article_id: String,
        dict_label: String
    },
    async setup(props) {
        const store = useStore()
        const { data: article } = await useLazyAsyncData('article', () => $fetch(`https://oda.uib.no/opal/dev/nn/article/${props.article_id}.json`))
        return {article, store}
  
    },
    computed: {
        test: function() {
            return this.store.input

        }
    }
}
</script>

<style scoped>

 h2 {
    color: gray;
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    letter-spacing: .1rem;
    font-weight: 500;
    z-index: 2;
    font-variant-caps: all-small-caps;
    font-size: 1.25rem;

}

h3 {
    font-family: Inria Serif;
  color: var(--bs-primary);
  font-weight:600;

}

article {
    border-radius: 2rem;
    border: solid 1px rgba(0,0,0, .2);
    background-color: white;
    box-shadow: 2px 2px 1px rgba(0,0,0, .2);
    margin-bottom: 1rem;
}



</style>
