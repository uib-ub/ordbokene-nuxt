<template>
    <button>
    <slot></slot>
    </button>
</template>


<style scoped>

.btn-primary, .btn-secondary, .btn-borderless {
    border-radius: 2rem;
    padding: .25rem 1rem .25rem 1rem;
    font-weight: 600;
}

.btn-primary {
  @apply bg-white border-1 border-primary;
  i {
    @apply primary;
  }
}

.btn-primary:focus, .btn-borderless:focus, .btn-primary:active, .btn-borderless:active {
  @apply bg-primary bg-opacity-25;
}

.btn-secondary {
  @apply bg-white border-1 border-secondary;

  &:focus, &:active {
    @apply bg-secondary bg-opacity-25;

  }
}

.btn-light {
  @apply bg-white border-1 border-secondary;
}


.ordbok-btn[aria-expanded=true] {

    @apply bg-primary text-white border-1 border-primary;

}

</style>