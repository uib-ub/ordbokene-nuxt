

<script setup>
import { useStore } from '~/stores/searchStore'
const store = useStore()
</script>

<template>
    <div>
        <h2>Word</h2>
    <span v-if="store.q != $route.params.slug[0]">{{store.q}} er ikke et oppslagsord i {{store.dict}}. Viser ordet {{$route.params.slug[0]}}</span>

    </div>
</template>