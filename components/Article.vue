<template>
<div>
   <ArticleContent v-if="data" v-bind="props" :data="data" />
</div>
</template>

<script setup>

const props = defineProps({
    scoped_locale: {type: String, required: true},
    article_id:  {type: Number, required: true},
    dict:  {type: String, required: true},
    welcome: Boolean,
    single: Boolean,
    list: Boolean
})



const getArticleFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('ordbokene_articles', 2);
    console.log("OPEN", openRequest)

    openRequest.onerror = function() {
      console.log("ERROR")
      reject(openRequest.error);
    };

    openRequest.onsuccess = function() {
      console.log("SUCCESS", openRequest.result)
      const db = openRequest.result;
      console.log("DB", db)
      const transaction = db.transaction("articles_" + props.dict, 'readonly');
      console.log("TRANSACTION", transaction)
      console.log("STORE", "articles_" + props.dict)
      const store = transaction.objectStore("articles_" + props.dict);
      const getRequest = store.get(props.article_id);
      console.log("GET", getRequest)

      getRequest.onerror = function() {
        reject(getRequest.error);
      };

      getRequest.onsuccess = function() {
        resolve(getRequest.result);
      };
    };
  });
};




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
const data = await getArticleFromIndexedDB(); 
const error = ref(null)
pending.value = false



console.log("CLIENT", process.client)

//const { pending, data, error } = await useAsyncData('article_' + props.dict + props.article_id, () => $fetch(`${session.endpoint}${props.dict}/article/${props.article_id}.json`))


//const { pending, data, error } = await useAsyncData('article_' + props.dict + props.article_id, () => getArticleFromIndexedDB())

</script>