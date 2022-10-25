

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const different = store.originalInput
</script>

<template>
    <div>
    <div class="callout" v-if="different"><BootstrapIcon icon="bi-info-circle-fill" left/> <strong>{{different}}</strong> er ikke et oppslagsord i {{store.dict}}. Viser ordet <strong>{{$route.params.slug[0]}}</strong>.
    <span v-if="false && store.top_suggestion && store.top_suggestion != store.q"> Se også <NuxtLink :to="store.top_suggestion">{{store.top_suggestion}}</NuxtLink></span></div>
    </div>
</template>