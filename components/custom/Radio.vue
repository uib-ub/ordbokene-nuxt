<template>
    <span>
      <svg aria-hidden="true" class="text-primary absolute pointer-events-none" v-if="value == model" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
</svg>
      <svg aria-hidden="true" class="text-gray-700 absolute pointer-events-none" v-else style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
</svg>

      
      <input  class="sr-only" type="radio" :id="labelId" :name="name" :checked="props.value==props.model" :value="props.value" @change="change">
      <label class="pl-8" :for="props.labelId">
        <slot></slot>
      </label>
    </span>
    
    </template>
    
    <script setup lang="ts">
    
    
    const props = defineProps({
        labelId: String,
        name: String,
        value: String,
        model: String
    })

    const emit = defineEmits(['change'])
    

    const change = (event) => {
        console.log(event)
        emit('change', props.value)
    }

    
    </script>
    
    
    <style scoped lang="scss">
    
    input {
      position: absolute;
    }
    
    input + label {
      display: block;
      position: relative;
    }
    
    input + label::before {
      content: '';

    }
    
    

    
    input:checked + label::after {
        content: '';

 
    }
    

    </style>