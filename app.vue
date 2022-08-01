<template>
<v-layout>
          <v-app-bar
          color="primary"
          density="compact"
        >
          <template v-slot:append>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
  
          <v-app-bar-title>Ordbokene.no</v-app-bar-title>
  
        </v-app-bar>
    <NuxtPage />
</v-layout>
</template>