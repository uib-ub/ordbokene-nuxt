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
          <v-btn><v-icon>language</v-icon></v-btn>
  
        </v-app-bar>
    <NuxtPage class="router-content"/>
</v-layout>
</template>


<style>



</style>