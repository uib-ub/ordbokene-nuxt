<template>
<div>
<ul>
    <li v-for="(item, idx) in data.a.similar" :key="idx">{{item[0]}}</li>

</ul>
{{data}}
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()


const { data } = await useLazyAsyncData('suggest', () => $fetch(`https://oda.uib.no/opal/dev/api/suggest?q=${store.selected.q}&dict=${store.dict}&n=20&dform=int&meta=n&include=eifs`))




</script>