<template>
    <i aria-hidden="true" class="bi" v-bind:class="{icon, 'primary-icon': color=='primary'}"/>
</template>


<script setup>

const props = defineProps({
    icon: String,
    color: String
})

</script>

<style scoped>

.primary-icon {
  color: var(--bs-primary) !important;
}

</style>