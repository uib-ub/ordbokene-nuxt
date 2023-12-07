<template>
<section class="secondary-page mt-4">
         <ContentRenderer :value="data">
      <ContentRendererMarkdown :value="data" />
      <template #empty>
            <p>{{$t('content_not_found')}}</p>
          </template>
    </ContentRenderer>
      </section>
</template>
<script setup>
import { useI18n } from "vue-i18n"

const i18n = useI18n()
const { data, error} = await useAsyncData(`advanced-help-${i18n.locale.value}`, () => queryContent(i18n.locale.value, "help", "advanced").findOne())

</script>