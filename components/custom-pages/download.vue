<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


// If you want to use it in setup, import from the nuxtApp.
const { $pwa } = useNuxtApp()



const isLoading = ref(false);


async function downloadArticles(languages) {
  console.log(`Downloading articles for ${languages}`);
  isLoading.value = true;
  try {
    const urls = languages.split(',').map(lang => `https://git.app.uib.no/spraksamlingane/ordbokene-nuxt/-/raw/b910b808368311e602005e4bd0a0f782e300823c/public/batch/articles_${lang}.json`);
    const storeNames = languages.split(',').map(lang => `articles_${lang}`);

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const articlesArray = await Promise.all(responses.map(response => response.json()));

    const request = indexedDB.open("ordbokene_articles", 2); // increment the version number

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      storeNames.forEach((storeName, index) => {
        if (db.objectStoreNames.contains(storeName)) {
          db.deleteObjectStore(storeName);
        }
        const store = db.createObjectStore(storeName);
        for (const id in articlesArray[index]) {
          store.put(articlesArray[index][id], parseInt(id));
        }
      });
    };
  } catch (error) {
    console.error(`Error downloading articles:`, error);
  } finally {
    isLoading.value = false;
  }
}


useHead({
  title: "Offline"
})



</script>

<template>
<main id="main" tabindex="-1" class="secondary-page flex flex-col gap-4">
  <h1>Download Dictionaries</h1>
  <client-only>
    <section v-if="$pwa" class="mb-4 flex flex-col gap-4">
      {{$pwa}}
      
      <div class="flex gap-2">
      <button class="btn" @click="() => downloadArticles('nn')">Download the nynorsk dictionary</button>
      <button class="btn" @click="() => downloadArticles('bm')">Download the bokmål dictionary</button>
      <button class="btn" @click="() => downloadArticles('bm,nn')">Download both dictionaries</button>
      </div>
      <div v-if="isLoading">Loading articles...</div>
    </section>
  </client-only>
</main>
</template>
