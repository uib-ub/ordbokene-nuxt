<template>
<div class="checkbox-container">

  <svg aria-hidden="true" class="text-primary absolute pointer-events-none" v-if="checked" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>
      <svg aria-hidden="true" class="text-gray-700 absolute pointer-events-none" v-else style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" /></svg>

  <input  class="sr-only" type="checkbox" :id="props.labelId" :checked="props.checked" v-model="model">
  <label class="pl-8" :for="props.labelId">
    <slot></slot>
  </label>
</div>

</template>

<script setup lang="ts">

const emit= defineEmits(['update:modelValue'])

const props = defineProps({
    labelId: String,
    checked: {
        type: Boolean,
        default: false
    }
})

const model = computed({
    get() {
        return props.checked
    },
    set(val) {
        emit('update:modelValue', val)
    }
})


</script>


<style scoped lang="scss">



.checkbox-container:focus-within svg { 
  outline: solid 2px theme('colors.secondary.DEFAULT');

}

</style>