<template>
<div>
   <ArticleContent v-if="data" v-bind="props" :data="data" />
</div>
</template>

<script setup>

import { openDB } from 'idb';

const props = defineProps({
    scoped_locale: {type: String, required: true},
    article_id:  {type: Number, required: true},
    dict:  {type: String, required: true},
    welcome: Boolean,
    single: Boolean,
    list: Boolean
})



async function getArticleFromIndexedDB(lang, id) {
  try {
    const db = await openDB("ordbokene_articles", 2);
    if (!db.objectStoreNames.contains(`articles_${lang}`)) {
      console.log(`Object store articles_${lang} does not exist`);
      return;
    }
    const article = await db.get(`articles_${lang}`, id);
    return article;
  } catch (error) {
    console.error(`Error getting article from IndexedDB:`, error);
  }
}




/*
const pending = ref(true)
const data = ref(null)
const error = ref(null)


onMounted(async () => {
  console.log("MOUNTED", props.dict, props.article_id)
  try {
    data.value = await getArticleFromIndexedDB();
    pending.value = false
  } catch (error) {
    error.value = error;
  }
});

*/
console.log("HERE")
const pending = ref(true)
const data = await getArticleFromIndexedDB(props.dict, props.article_id); 
const error = ref(null)
pending.value = false



console.log("CLIENT", process.client)

//const { pending, data, error } = await useAsyncData('article_' + props.dict + props.article_id, () => $fetch(`${session.endpoint}${props.dict}/article/${props.article_id}.json`))


//const { pending, data, error } = await useAsyncData('article_' + props.dict + props.article_id, () => getArticleFromIndexedDB())

</script>