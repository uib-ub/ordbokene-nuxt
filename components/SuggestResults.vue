<template>
<section v-if="suggestions && suggestions.length" class="suggestions">
    <slot/>
    <ul class="nav nav-pills flex-column md:flex md:flex-wrap md:gap-2 pt-4 md:py-4">
        <template  v-for="(item, idx) in suggestions" :key="idx">
        <li v-if="minimal || !store.lemmas[dict].has(item.q)" class="!border-1 flex px-2 mx-0">
            <NuxtLink :lang="dictLang[dict]" no-prefetch class="suggest-link notranslate py-3 md:py-0 w-full" :to="suggest_link(compare ? store.q + '|' + item : item)" @click="track_suggest(item)"><component :is="iconComponent" class="mr-3 mb-1 text-primary"/><span class="link-content hoverlink">{{item}}</span></NuxtLink>
        </li>
        </template>
    </ul>
</section>
</template>

<script setup>

import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/stores/searchStore'
const store = useSearchStore()
const route = useRoute()
const i18n = useI18n()

const props = defineProps({
    suggestions: Object,
    dict: String,
    minimal: Boolean,
    book: Boolean,
    compare: Boolean,
    plausibleGoal: String
})

const iconComponent = props.book ? resolveComponent('BiBookHalf') : resolveComponent('BiSearch')


const track_suggest = (to) => {
    useTrackEvent(props.plausibleGoal + "_" + props.dict, {props: {from: store.q, to, combined: store.q + "|" + to}})

}

const suggest_link = (suggestion) => {
    if (route.name === 'search') {
        let url = `/${i18n.locale.value}/search?q=${suggestion}&dict=${store.dict}&scope=${store.scope}`
        if (store.pos) {
            url = url + '&pos=' + store.pos
        }
        return url
    }
    else {
        return `/${i18n.locale.value}/${store.dict}/${suggestion}` 
    }
}


</script>

<style scoped>

a {
    font-size: 1.17rem;
    border: 2px;
    @apply md:p-2 no-underline;
}


li:not(:last-child) {
    border-bottom: solid 1px theme('colors.gray.300')

}

li {
    @apply md:!border-none;
}
    
    
</style>
