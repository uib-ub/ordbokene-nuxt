

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()

const different = store.input!= store.q && store.input
</script>

<template>
    <div>
    <span v-if="different">{{different}} er ikke et oppslagsord i {{store.dict}}. Viser ordet {{$route.params.slug[0]}}</span>
    <SuggestResults :key="store.q"/>
    </div>

</template>