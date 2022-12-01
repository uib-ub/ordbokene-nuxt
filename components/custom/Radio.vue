<template>
    <div>
      <input  class="sr-only" type="radio" :id="labelId" :name="name" :checked="props.value==props.model" :value="props.value" @change="change">
      <label :for="props.labelId">
        <slot></slot>
      </label>
    </div>
    
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
      margin-bottom: -2px;
      position: relative;
      display: inline-block;
      margin-right: 8px;
      width: 16px;
      height: 16px;
      border: solid 1px theme('colors.gray.500');
      background: white;
      border-radius: 4px;
      border-radius: 16px;
    }
    
    
    input:checked + label::before {
      margin-bottom: -2px;
      border-color: theme('colors.primary.DEFAULT');
      border-width: 2px;
    }
    
    input:checked + label::after {
        content: '';
        position: absolute;
        top: 8px;
        left: 4px;
        right: 0;
        height: 8px;
        width: 8px;
        background: theme('colors.primary.DEFAULT');
        border-radius: 16px;

 
    }
    
    input:focus + label::before {
      outline: theme('colors.secondary.DEFAULT') solid 1px;
      box-shadow: 2px 2px 0px theme('colors.secondary.DEFAULT');
    }   
    </style>