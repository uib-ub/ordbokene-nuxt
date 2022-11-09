<template>
    <button>
    <i aria-hidden="true" v-bind:class="['bi', icon, {'primary-icon': color=='primary' || primary, 'secondary-icon': color=='prsecondary' || secondary, 'left-icon': left, 'right-icon': right}]"/>
    </button>
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
    },
    secondary: {
      type: Boolean,
      default: false
    }
})

</script>

<style scoped>

.primary-icon {
  @apply text-primary !important;
}

.secondary-icon {
  @apply text-secondary) !important;
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