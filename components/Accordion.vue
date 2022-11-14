<template>
    <div class="w-full">
    <component :is="props.is || 'div'"><button class="p-3 mt-4 text-left w-full"
                                               @click="expanded = !expanded" 
                                               :aria-expanded="expanded"
                                               :aria-controls="expanded? id : null">
                                               <BootstrapIcon :icon="expanded ? 'bi-chevron-up' : 'bi-chevron-down'" left primary/>{{header}}
                                        </button></component>
    
    <div  v-if="expanded" :id="id" class="pt-2 pb-4"><slot></slot></div>
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

button {
    @apply text-text;
    border-radius: .25rem;
    font-size: 1.17em;
}

button:active, button:focus {
    @apply bg-tertiary-darken
}

button[aria-expanded=true] {
    @apply bg-tertiary-darken;

}


</style>