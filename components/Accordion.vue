<template>
    <div class="w-full">
    <component :is="props.is || 'div'"><button class="p-3 text-left w-full"
                                               @click="expanded = !expanded" 
                                               :aria-expanded="expanded">
                                               <BootstrapIcon :icon="expanded ? 'bi-chevron-up' : 'bi-chevron-down'" left primary/>{{header}}
                                        </button></component>
    
    <slot v-if="expanded"></slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    is: String,
    header: String
})

const expanded = ref(false)



</script>


<style scoped>

button[aria-expanded=true] {
    @apply bg-tertiary-darken;

}


</style>