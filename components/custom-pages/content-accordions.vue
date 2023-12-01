<template>
  <div class="secondary-page">
      <ContentRenderer v-if="!error" :value="intro">
            <ContentRendererMarkdown :value="intro" />
            <template #not-found>
              <ErrorMessage :title="$t('content_not_found')" :error="{}"/>  
            </template>
          </ContentRenderer>
  
          <template v-for="loc in sections" :key="loc._path" >
            <nav v-if="loc.children[0].children" class="mt-8">
            <ul class="w-full !pl-0">
            <li v-for="subpage in loc.children[0].children.slice(1, loc.children[0].children.length) " :key="subpage._path" class="list-none text-left w-full content-link-item">
              <NuxtLink class="w-full link-header !no-underline flex justify-between hover:bg-canvas-darken hover:shadow-inner duration-100 px-5 py-4" :to="subpage._path">{{subpage.title}} <BiChevronRight class="self-center text-gray-700"/></NuxtLink>
            </li>
            </ul>
            </nav>
          </template>

      <ErrorMessage v-if="error" :title="$t('content_not_found')" :error="error"/>  
  </div>
</template>
  
<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const i18n = useI18n()
const route = useRoute()

const { data: intro, error} = await useAsyncData(`content-accordion-${route.name}-${i18n.locale.value}`, () => queryContent(i18n.locale.value, route.name).findOne())

const queryBuilder = queryContent(i18n.locale.value, route.name)
const { data: sections } = await useAsyncData(`content-navigation-${route.name}-${i18n.locale.value}`, () => fetchContentNavigation(queryBuilder))


useContentHead(intro)

useHead({
  meta: [
    {property: 'og:title', content: intro.value?.title },
    {name: 'twitter:title', content: intro.value?.title },
    {name: 'twitter:description', content: intro.value?.description },
    {property: 'og:description', content: intro.value?.description }
  ]
})


</script>


<style scoped>

.content-link-item:not(:last-child) {
          @apply !border-b border-solid border-gray-100;
          
      }
</style>