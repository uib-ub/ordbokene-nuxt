<template>
    <i aria-hidden="true" v-bind:class="['bi', icon, {'primary-icon': color=='primary' || primary, 'left-icon': left, 'right-icon': right}]"/>
</template>


<script setup lang="ts">

const props = defineProps({
    icon: String,
    color: String,
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
})

</script>

<style scoped>

.primary-icon {
  color: var(--bs-primary) !important;
}

.left-icon {
  padding-right: 0.5em;
}

.right-icon {
  padding-left: 0.25em;
}

h2 i {
  font-size: 75%;
}

</style>