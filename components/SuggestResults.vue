<template>
    <div>
    <ClientOnly>
    <div v-if="inflect.length">
    <h2>Treff i former av oppslagsord</h2>
    <ul class="nav nav-pills flex-column md:flex md:flex-wrap md:gap-8 py-6 pt-4 md:py-8">
        <li class="nav-item flex" v-for="(item, idx) in inflect" :key="idx">
            <NuxtLink class="suggest-link py-3 md:py-0 md w-full" :to="suggest_link(item[0])"><Icon name="bi:search" class="mr-3 mb-1"/><span class="link-content">{{item[0]}}</span></NuxtLink>
        </li>
    </ul>
    </div>
    </ClientOnly>

<div v-if="suggestions && suggestions.length" class="suggestions py-2 px-1 mb-4 mt-8">
    
    <h2>{{$t('notifications.similar')}}</h2>
    <ul class="nav nav-pills flex-column md:flex md:flex-wrap md:gap-8 py-6 pt-4 md:py-8">
        <li class="nav-item flex" v-for="(item, idx) in similar" :key="idx">
            <NuxtLink class="suggest-link py-3 md:py-0 md w-full" :to="suggest_link(item[0])"><Icon name="bi:search" class="mr-3 mb-1"/><span class="link-content">{{item[0]}}</span></NuxtLink>
        </li>
    </ul>
</div>
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
        let url = `/search?q=${suggestion}&scope=${store.scope}`
        if (store.pos) {
            url = url + '&pos=' + store.pos
        }
        return url
    }
    else {
        return suggestion
    }
}


const inflect = computed(()=> {
    console.log("INFLECT", store.autocomplete_suggestions.inflect)
    if (store.autocomplete_suggestions.inflect) {
        console.log("SLICING", store.autocomplete_suggestions.inflect)
        return store.autocomplete_suggestions.inflect.filter(item => {
            return item[0] != store.q && store.originalInput != item[0]
        }).slice(0,6)
        
    }
    return []
})

</script>

<style scoped lang="scss">

a {
    font-size: 1.17rem;
    letter-spacing: .1rem;
    border: none;
}

.suggest-link:hover .link-content {
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
