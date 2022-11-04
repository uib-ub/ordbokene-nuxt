<script setup>
import {useSettingsStore } from '~/stores/settingsStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const settings = useSettingsStore()

const resetSettings = (settings) => {
    settings.$patch({
      inflectionExpanded: false, 
      inflectionNo: false, 
      inflectionTableContext: false, 
    })
};

useHead({
title: t('settings.title')
})

</script>

<template>
<div class="secondary-page container h-100">
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
  <button class="primary" @click="resetSettings(settings)">
    <BootstrapIcon icon="bi-trash-fill" left/><span>{{$t('settings.reset')}}</span>
  </button>
</div>
</template>

<style scoped>


</style>
