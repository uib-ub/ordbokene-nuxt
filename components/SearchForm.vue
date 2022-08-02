<template>
  <form role="search" action="/search" class="search-container" :class="$vuetify.display.name" @submit.prevent="onSumbmit">
    <label for="search">Søk i [ordbok]</label>
    <input v-model="q" id="search" name="q" type="search" placeholder="Søk..." required/>
    <v-icon left :icon="mdiBook"/><label for="dict-select">Ordbok:</label>
    <select v-model="dict" name="dict" id="dict-select">
      <option value="bm,nn">Begge ordbøkene</option>
      <option value="bm">Bokmålsordboka</option>
      <option value="nn">Nynorskordboka</option>
    </select>
    <button type="submit">
        <v-icon left :icon="mdiMagnify"/>
    </button>


  </form>
</template>

<script>
  import { mdiMagnify, mdiBook } from '@mdi/js'

  export default {
    data: () => ({
      mdiMagnify,
      mdiBook,
      q: "",
      dict: "bm,nn"
    }),
    methods: {
      onsubmit() {
        console.log("SUBMIT")
      }
    }
  }
</script>