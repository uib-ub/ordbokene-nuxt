<template>
  <div class="callout error pt-1 pb-6" role="alert">
  <h2 class="pb-2"><BiExclamationTriangleFill class="mr-3 mb-1"/>{{title}}</h2>
  <p>{{description}}</p>
  <p v-if="error.data" class="pt-2">{{$t('error.status', {code: error.statusCode})}}</p>
</div>

</template>

<script setup>
import { useI18n } from "vue-i18n"

const i18n = useI18n()

const props = defineProps({
    error: Object,
    title: String,
})

const description = ref()

if (props.error.data == undefined) {
    description.value = i18n.t('error.network.description')
}
else if (props.error.statusCode === 503) {
    description.value = i18n.t('error.503.description')

}
else if (props.error.statusCode === 404) {
    description.value = i18n.t('error.404.description')

}
else if (props.error.statusCode && props.error.statusCode > 499) {
    description.value = i18n.t('error.server.description', {code: props.error.statusCode})

}
else if (props.error.statusCode && props.error.statusCode > 399) {
    description.value = i18n.t('error.generic.description')

}
else {
    description.value = i18n.t('error.generic.description')
}




console.log(String(props.error))

useTrackEvent('fetch_error', {props: {code: props.error.statusCode}})


</script>