<template>
  <v-form role="search" class="autocomplete-container" :class="$vuetify.display.name">
    <v-combobox 
        autofocus
        solo
        clearable
        compact
        full-width
        :prepend-inner-icon="mdiMagnify"
        color="primary">
    </v-combobox>
  </v-form>
</template>

<script>
  import { mdiMagnify   } from '@mdi/js'

  export default {
    data: () => ({
      mdiMagnify 
    })
  }
</script>