<template>
<div v-if="store.suggest.a" class="row">
    <h2>Mente du</h2>
    <ul class="nav nav-pills px-3">
        <li v-for="(item, idx) in suggestions" :key="idx+store.q">
            <button class="btn btn-outline-primary me-3"><i class="bi bi-search"></i> {{item[0]}}</button>
        </li>
    </ul>
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()

const suggestions = computed(() => {
    let assembled = []
    let seen = new Set()

    if (store.suggest.a.inflect) {
        store.suggest.a.inflect.forEach(item => {
            if (store.q != item[0]) {
                assembled.push(item)
                seen.add(item[0])
            }
        })
    }

    if (store.suggest.a.exact) {
        store.suggest.a.exact.forEach(item => {
            if (!seen.has(item[0])
            && store.q != item[0] 
            && (item[0].length <= store.q.length 
            || (item[0].slice(0, store.q.length) != store.q && item[0] != "å "+store.q))) {
                assembled.push(item)
            }
        })
    }

    if (store.suggest.a.similar) {
        store.suggest.a.similar.forEach(item => {
                assembled.push(item)
        })
    }


    return assembled  
});

</script>

<style scoped>
.btn-outline-primary{
    border-radius: 100px;
    letter-spacing: 0.1rem;
}
</style>