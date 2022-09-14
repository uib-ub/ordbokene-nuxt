<template>
<div v-if="store.suggest.a" class="row p-2 mb-4 mt-2">
    <h2>{{$t('notifications.similar')}}</h2>
    <ul class="d-grid gap-2 d-md-block nav nav-pills px-3 py-3">
        <li class="btn btn-outline-primary rounded-pill me-3 mb-3" v-for="(item, idx) in suggestions" :key="idx">
            <NuxtLink :to="suggest_link(item[0])" class="btn btn-outline-primary me-3"><i class="bi bi-search"></i> {{item[0]}}</NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()

const suggest_link = (suggestion) => {
    if (store.advanced) {
        let url = `/${store.dict}/search?q=${suggestion}&scope=${store.scope}`
        if (store.pos) {
            url = url + '&pos=' + store.pos
        }
        return url
    }
    else {
        return suggestion
    }
}

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
                seen.add(item[0])
            }
        })
    }

    if (store.suggest.a.similar) {
        store.suggest.a.similar.forEach(item => {
                if (!seen.has(item[0])) {
                assembled.push(item)
                }
        })
    }

    store.top_suggestion = assembled[0][0]

    return assembled
});



</script>

<style scoped>
.btn-outline-primary{
    letter-spacing: 0.1rem;
}
</style>
