<template>
<div>
    <SearchForm/>
    <NuxtChild/>
</div>
</template>

<script setup>
import { useStore } from '~/stores/searchStore'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

    </script>