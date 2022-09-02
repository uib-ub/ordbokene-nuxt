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

</script>

<template>
<div>
  <h1>Settings</h1>
  <NuxtLink to="/">
    Index page
  </NuxtLink>
  <br>
  {{$route.params}}
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
  <button class="btn" @click="resetSettings(settings)">
    <i class="bi bi-trash-fill"></i> <span>{{$t('settings.reset')}}</span>
  </button>
</div>
</template>

<style scoped>
.form-check-input:checked{
background-color: var(--bs-primary);
border-color: var(--bs-primary);
}
.form-check-input:focus{
  border-color: var(--bs-primary);
}

.bi{
  color: rgba(0,0,0,.54);
}
.btn:focus,.btn:hover{
  border-color: var(--bs-primary);
}
</style>
