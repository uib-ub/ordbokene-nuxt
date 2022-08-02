<template>
<v-layout>
          <v-app-bar
          color="primary"
          density="compact"
        
        >
          <template v-if="$vuetify.display.smAndDown" v-slot:append>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
          
          <v-app-bar-title>Ordbokene.no</v-app-bar-title>
          <div v-if="$vuetify.display.mdAndUp">
          <v-btn to="/help">Hjelp til søk</v-btn>
          <v-btn to="/about">Om ordbøkene</v-btn>
          <v-btn to="/settings">Innstillinger</v-btn>
          <v-btn to="/contact">Kontakt oss</v-btn>
          </div>
          <v-divider vertical/>
          <v-btn><v-icon :icon="mdiWeb"/></v-btn>
  
        </v-app-bar>
    <NuxtPage class="router-content"/>
</v-layout>
</template>


<script>
  import { mdiWeb  } from '@mdi/js'

  export default {
    data: () => ({
      mdiWeb
    })
  }
</script>

<style>

.router-content {
    padding-left: calc((100vw - 1200px) / 2) !important;
    padding-right: calc((100vw - 1200px) / 2) !important;
    padding-top: 128px !important;

}


</style>