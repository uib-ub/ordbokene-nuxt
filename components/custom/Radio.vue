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
      margin-bottom: -.125rem;
      position: relative;
      display: inline-block;
      margin-right: .5rem;
      width: 1rem;
      height: 1rem;
      border: solid 1px theme('colors.gray.500');
      background: white;
      border-radius: .25rem;
      border-radius: 1rem;
    }
    
    
    input:checked + label::before {
      margin-bottom: -.125rem;
      border-color: theme('colors.primary.DEFAULT');
      border-width: 2px;
    }
    
    input:checked + label::after {
        content: '';
        position: absolute;
        top: .5rem;
        left: .25rem;
        right: 0;
        height: .5rem;
        width: .5rem;
        background: theme('colors.primary.DEFAULT');
        border-radius: 1rem;
    }
    
    input:focus + label::before {
      outline: theme('colors.secondary.DEFAULT') solid 1px;
      box-shadow: 2px 2px 0px theme('colors.secondary.DEFAULT');
    }   
    </style>