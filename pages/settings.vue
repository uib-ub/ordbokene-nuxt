<script setup>
import {useSettingsStore } from '~/stores/settingsStore'
const settings = useSettingsStore()

const resetSettings = (settings) => {
    settings.$patch({
      inflectionExpanded: false, 
      inflectionNo: false, 
      inflectionTableContext: false, 
    })
};

useHead({
title: "settings"
})

</script>

<template>
<main class="secondary-page">
  <h2>{{$t('settings.title')}}</h2>

  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="checkOne" v-model="settings.$state.inflectionExpanded">
    <label class="form-check-label" for="checkOne">
      {{$t('settings.inflection_expanded')}}
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="checkTwo" v-model="settings.$state.inflectionNo">
    <label class="form-check-label" for="checkTwo">
      {{$t('settings.inflection_no')}}
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="checkThree" v-model="settings.$state.inflectionTableContext">
    <label class="form-check-label" for="checkThree">
      {{$t('settings.inflection_table_context')}}
    </label>
  </div>
  <button class="btn btn-outline-primary" @click="resetSettings(settings)">
    <BootstrapIcon icon="bi-trash-fill" /> <span>{{$t('settings.reset')}}</span>
  </button>
</main>
</template>

<style scoped>
.bi{
  color: rgba(0,0,0,.54);
}
.btn-outline-primary{
  border: none;
  color: black;
}
.btn-outline-primary:hover,.btn-outline-primary:focus{
  background-color: white;
  color: black;
}
</style>
