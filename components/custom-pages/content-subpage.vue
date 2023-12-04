<template>
  <div class="secondary-page overflow-auto">
          <ContentRenderer v-if="!error" :value="data">
            <ContentRendererMarkdown :value="data"/>
            <template #empty>
              <ErrorMessage :title="$t('content_not_found')" :error="{}"/>  
            </template>
            
        </ContentRenderer>
        <ErrorMessage v-if="error" :title="$t('content_not_found')" :error="error"/>  
  </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  
  const i18n = useI18n()
  const route = useRoute()
  
  
  const { data, error } = await useAsyncData('subpage-data', () => {
    return queryContent(route.params.locale ? route.fullPath : '/' + i18n.locale.value + route.fullPath ).findOne()})
  
  if (!error) {
    useHead({
      title: data.value?.title,
      meta: [
        {property: 'og:title', content:  data.value?.title},
        {name: 'twitter:title', content:  data.value?.title },
        {name: 'description', content: data.value?.description },
        {name: 'twitter:description', content: data.value?.description },
        {property: 'og:description', content: data.value?.description }
      ]
  })
  
  }
  
  
  </script>