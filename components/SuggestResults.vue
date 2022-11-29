<template>
<div v-if="suggestions.length" class="suggestions p-2 mb-4 mt-8">
    <h2>{{$t('notifications.similar')}}</h2>
    <ul class="nav nav-pills flex-column md:flex md:flex-wrap md:gap-8 py-6 pt-4 md:py-8">
        <li class="nav-item py-3 md:py-0" v-for="(item, idx) in suggestions" :key="idx">
            <NuxtLink class="nav-link lg:px-" :to="suggest_link(item[0])"><CustomIcon icon="bi-search" left/><span class="link-content">{{item[0]}}</span></NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup>

import { useStore } from '~/stores/searchStore'
const store = useStore()

const props = defineProps({
    suggestions: Object
})

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


</script>

<style scoped lang="scss">

a {
    font-size: 1.17rem;
    letter-spacing: .1rem;
    border: none;
}

.nav-link:hover .link-content {
    border-bottom: solid 2px var(--link-decoration);
}

li:not(:last-child) {
    border-bottom: solid 1px theme('colors.gray.300')


}

@screen md {
    li {
        border: none !important; 
    }
}


</style>
