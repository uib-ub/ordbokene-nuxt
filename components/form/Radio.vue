<template>
    <div>
      <input  class="sr-only" type="radio" :id="props.labelId" :name="props.name" :value="props.value" v-model="model">
      <label :for="props.labelId">
        <slot></slot>
      </label>
    </div>
    
    </template>
    
    <script setup lang="ts">
    
    const emit= defineEmits(['update:modelValue'])
    
    const props = defineProps({
        labelId: String,
        name: String,
        value: String
    })
    
    const model = computed({
        get() {
            return props.value
        },
        set(val) {
            emit('update:modelValue', val)
        }
    })
    
    
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
      box-shadow: 2px 2px 1px theme('colors.secondary.DEFAULT');
    }




    




    /*
    input[type='radio'] + label {
  display: block;
  position: relative;
  padding: 0;
}

input[type='radio'] + label::before {
  content: '';
  position: relative;
  display: inline-block;
  margin-right: .5rem;
  width: 1rem;
  height: 1rem;
  border: solid 1px theme('colors.gray.500');
  background: white;
  border-radius: 1rem;
}

input[type='radio']:checked + label::before {
  border-color: theme('colors.primary.DEFAULT');
  border-width: 2px;
}


input[type='radio']:checked + label::after {
  content: '';
  position: absolute;
  position: absolute;
  top: .39rem;
  left: .25rem;
  right: 0;
  height: .5rem;
  width: .5rem;
  background: theme('colors.primary.DEFAULT');
  border-radius: 1rem;

}

input[type='radio']:focus + label::before {

  box-shadow: 2px 2px 1px theme('colors.secondary.DEFAULT');
}

input[type='radio'] {
  @apply sr-only
}


*/
    
    
    </style>