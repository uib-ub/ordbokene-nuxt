<template>
<div>

  <input  class="sr-only" type="checkbox" :id="props.labelId" :checked="props.checked" v-model="model">
  <label :for="props.labelId">
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
}


input:checked + label::before {
  margin-bottom: -.125rem;
  background: theme('colors.primary.DEFAULT');
  border-color: theme('colors.primary.DEFAULT');
}

input:checked + label::after {
  content: '';
  position: absolute;
  top: .5rem;
  left: .25rem;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  height: .35rem;
  width: .75rem;
  transform: rotate(-45deg);
}

input:focus + label::before {
  outline: theme('colors.secondary.DEFAULT') solid 1px;
  box-shadow: 2px 2px 0px theme('colors.secondary.DEFAULT');
}


</style>