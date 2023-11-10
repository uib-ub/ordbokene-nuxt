<template>
<div class="overflow-x-auto p-2">
    <client-only>
        <InflectionTable :custom-translate="translate" :mq="inflection_size()" :lemma-list="lemmaList"  :context="true"/>
        <template #fallback>
        <InflectionTable v-if="single" :custom-translate="translate" :lemmaList="lemmaList"  :context="true"/>
        </template>
    </client-only>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/stores/searchStore'
import {useSettingsStore } from '~/stores/settingsStore'
const store = useSearchStore()
const settings = useSettingsStore()
const i18n = useI18n()

const props = defineProps({
    single: Boolean,
    scoped_locale: String,
    lemmaList: Array,
    dict: String,
})

const inflection_size = () => {
    if (store.dict === 'bm,nn' ) {
      return window.matchMedia('(min-width: 1280px)').matches ? 'sm' : 'xs'
    }
    else {
      return window.matchMedia('(min-width: 1024px)').matches ? 'sm' : 'xs'
    }
}


const translate = (...args) => {
    if (args.includes(undefined)) {
        return ""
    }
    return i18n.t("infl."+ args.join("."), 1, {locale: props.scoped_locale})
}

</script>


<style>

.infl-wrapper, .infl-wrapper>div {
    @apply flex flex-col items-start gap-4;
}


.infl-wrapper caption {
    @apply sr-only;

}

.infl-wrapper span.comma:empty {
    @apply hidden;
}

.infl-wrapper span.comma:not(:first-child):before {
    content: ", ";
}

.infl-wrapper div.comma:not(:last-child):after {
    content: ", ";
}

.infl-wrapper td.infl-group {
    @apply text-center italic bg-tertiary;
}

.infl-wrapper td.infl-label {
    @apply text-left italic; 
}

.infl-wrapper td.infl-cell {
    text-align: left;
}

.infl-wrapper .context {
    @apply !text-gray-500;
}

.infl-wrapper div.lemma {
    @apply hidden;
}

.infl-wrapper th, td {
    border-width: 0px 0px 1px 0px;
    @apply border-2 border-gray-50 shadow-md duration-200 text-base p-2;
    
}


.table-responsive.sm .table-responsive:not(:first-child) {
    @apply mt-6;
}

.infl-wrapper th {
    @apply bg-canvas-darken pt-1 text-base;
}

.infl-wrapper .infl-label[scope='col'] {
    @apply text-center align-top;
}

.infl-wrapper .infl-label[scope='row'] {
    @apply text-left align-baseline;
}

.infl-wrapper td.hilite {
    background-color: #f7E1EB !important;
}



</style>