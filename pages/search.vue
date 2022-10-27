<template>
    <div class="dict-view">
      <div class="container">
      <SearchNav advanced/>
      <main id="main" ref="mainRef">
        <NuxtErrorBoundary @error="form_error">
        <AdvancedSearchForm/>
      </NuxtErrorBoundary>
      <NuxtErrorBoundary @error="content_error">  
    <Results v-if="store.q"/>
      </NuxtErrorBoundary>
    </main>
    </div>
        
    </div>
    </template>
    
<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const route = useRoute()
const mainRef = ref(0)

defineExpose({
        mainRef
    })

useHead({
  title: t('advanced')
})

definePageMeta({
    middleware: 'advanced-search-middleware'
  })

const form_error = (error) => {
    console.log("FORM ERROR",error)
}
const content_error = (error) => {
    console.log("CONTENT ERROR", error)
}    


</script>
