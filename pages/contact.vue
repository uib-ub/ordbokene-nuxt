<template>
<main class="secondary-page">
  <Accordion  is="h4" header="Hallo">Test</Accordion>
  <h2>{{$t('contact.title')}}</h2>
  <div>
    <h3>{{$t('contact.content[0]')}}</h3>
    <p>{{$t('contact.content[2]')}} <a href="mailto:ordbok@uib.no">ordbok@uib.no</a></p>
    <h3>{{$t('contact.content[1]')}}</h3>
    <p>{{$t('contact.content[3]')}} <span style="white-space: nowrap;"><a href="mailto:ordbok-teknisk@uib.no">ordbok-teknisk@uib.no</a></span></p>
  </div>
  <div><h3>{{$t('contact.faq.title')}}</h3></div>
  <Accordion id='faq-1' is="h4" :header="$t('contact.faq.items[0].title')">
    <p><em>Bokmålsordboka</em>{{$t('and')}}<em>Nynorskordboka</em>{{$t('contact.faq.items[0].text[0]')}}<router-link to="/om" @click="$emit('close')">{{$t('contact.faq.items[0].text[1]')}}</router-link></p>
  </Accordion>
  <Accordion id='faq-2' is="h4" :header="$t('contact.faq.items[1].title')">
    {{$t('contact.faq.items[1].text')}}
  </Accordion>
  <Accordion id='faq-3' is="h4" :header="$t('contact.faq.items[2].title')">
    {{$t('contact.faq.items[2].text')}}
  </Accordion>
</main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('contact.title')
})
  


</script>

