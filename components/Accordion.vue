<template>
    <div class="w-full accordion-container">
    <component :is="props.is || 'div'"><button class="p-2 mt-4 text-left w-full"
                                               @click="expanded = !expanded" 
                                               :aria-expanded="expanded"
                                               :aria-controls="expanded? id : null">
                                               <BootstrapIcon class="pr-2" :icon="expanded ? 'bi-chevron-up' : 'bi-chevron-down'"/>{{header}}
                                        </button></component>
    
    <div  v-if="expanded" :id="id  " class="pt-2 pb-4"><slot></slot></div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    is: String,
    header: String,
    id: String
})

const expanded = ref(false)

const id = props.id || encodeURIComponent(props.header)


</script>


<style scoped>

button {
    @apply text-text pt-2 pb-3;
    font-size: 1.17em;

}

.accordion-container:not(:last-child) {
    border-bottom: solid 1px theme('colors.gray.100');
    
}

button:active, button:focus {
    @apply bg-tertiary-darken1
}

button[aria-expanded=true] {
    @apply bg-tertiary-darken2;

}

h4 i {
    @apply text-primary
}

h3 i {
    @apply text-gray-700;
}




</style>