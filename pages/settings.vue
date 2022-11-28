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
<main id="main" tabindex="-1" class="secondary-page flex flex-col gap-2">
  <h2>{{$t('settings.title')}}</h2>
<CustomCheckbox labelId="toggle-inflection-expanded" v-model="settings.$state.inflectionExpanded" :checked="settings.$state.inflectionExpanded">
      {{$t('settings.inflection_expanded')}}
    </CustomCheckbox>
    <CustomCheckbox labelId="toggle-inflection-no" v-model="settings.$state.inflectionNo" :checked="settings.$state.inflectionNo">
      {{$t('settings.inflection_no')}}
    </CustomCheckbox>
    <CustomCheckbox labelId="toggle-inflection-context" v-model="settings.$state.inflectionTableContext" :checked="settings.$state.inflectionTableContext">
      {{$t('settings.inflection_table_context')}}
    </CustomCheckbox>


<div class="mt-4">
  <button class="btn btn-primary" @click="resetSettings(settings)">
    <CustomIcon icon="bi-trash-fill" left primary/><span>{{$t('settings.reset')}}</span>
  </button>
</div>
</main>
</template>

<style scoped>


</style>
