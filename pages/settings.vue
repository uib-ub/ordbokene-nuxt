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
<main id="main" class="secondary-page flex flex-col gap-2">
  <h2>{{$t('settings.title')}}</h2>
<FormCheckbox labelId="toggle-inflection-expanded" v-model="settings.$state.inflectionExpanded" :checked="settings.$state.inflectionExpanded">
      {{$t('settings.inflection_expanded')}}
    </FormCheckbox>
    <FormCheckbox labelId="toggle-inflection-no" v-model="settings.$state.inflectionNo" :checked="settings.$state.inflectionNo">
      {{$t('settings.inflection_no')}}
    </FormCheckbox>
    <FormCheckbox labelId="toggle-inflection-context" v-model="settings.$state.inflectionTableContext" :checked="settings.$state.inflectionTableContext">
      {{$t('settings.inflection_table_context')}}
    </FormCheckbox>


<div class="mt-4">
  <button class="btn-primary" @click="resetSettings(settings)">
    <BootstrapIcon icon="bi-trash-fill" left primary/><span>{{$t('settings.reset')}}</span>
  </button>
</div>
</main>
</template>

<style scoped>


</style>
