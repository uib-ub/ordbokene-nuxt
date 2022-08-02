<template>
  <v-form role="search" class="autocomplete-container" :class="$vuetify.display.name">
    <v-combobox
        :prepend-inner-icon="mdiMagnify">


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