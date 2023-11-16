<template>
<section v-if="!error" class="secondary-page mt-4">
         <ContentRenderer :value="data">
      <ContentRendererMarkdown :value="data" />
    </ContentRenderer>
      </section>
      <div v-show="error" class="md:pt-4 ord-container">
      <ErrorMessage :title="$t('error.network.title')" :description="$t('error.network.description')"/>
      </div>
</template>
<script setup>
import { useI18n } from "vue-i18n"

const i18n = useI18n()
const { data, error } = await useAsyncData('advanced-help', () => queryContent(i18n.locale.value, "help", "advanced").findOne())

</script>