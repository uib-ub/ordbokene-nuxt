import { createI18n } from 'vue-i18n'
import eng from '../locales/eng.json'
import nno from '../locales/nno.json'
import nob from '../locales/nob.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      eng,
      nno,
      nob
    }
  })

  vueApp.use(i18n)
})