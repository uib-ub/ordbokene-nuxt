<template>
    <div class="w-full">
    <component :is="props.is || 'div'"><button class="p-3 text-left w-full"
                                               @click="expanded = !expanded" 
                                               :aria-expanded="expanded"
                                               :aria-controls="expanded? id : null">
                                               <BootstrapIcon :icon="expanded ? 'bi-chevron-up' : 'bi-chevron-down'" left primary/>{{header}}
                                        </button></component>
    
    <div  v-if="expanded" :id="id"><slot></slot></div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    is: String,
    header: String,
    id: String
})

const expanded = ref(false)



</script>


<style scoped>

button[aria-expanded=true] {
    @apply bg-tertiary-darken;

}


</style>