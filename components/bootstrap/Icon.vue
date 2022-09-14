<template>
    <i aria-hidden="true" :class="'bi ' + icon"/>
</template>


<script setup>

const props = defineProps({
    icon: String,
})

</script>