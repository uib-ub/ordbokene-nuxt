

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const different = store.originalInput
</script>

<template>
    <div>
    <div aria-hidden="true" class="callout" v-if="different"><CustomIcon icon="bi-info-circle-fill" left/> Viser resultater for oppslagsordet <strong>{{$route.params.slug[0]}}.</strong></div>
    </div>
</template>