import { createI18n } from 'vue-i18n'
import eng from '../locales/eng.json'
import nno from '../locales/nno.json'
import nob from '../locales/nob.json'


export default defineNuxtPlugin(({ vueApp }) => {
  let current_locale = ""

    if (process.client) {
      current_locale = localStorage.getItem('currentLocale') || (new Date().getDate() % 2 ? 'nno' : 'nob')
      localStorage.setItem('currentLocale', current_locale)
    }
    else {
      current_locale =  (new Date().getDate() % 2 ? 'nno' : 'nob')
    }
  
  

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: current_locale,
    messages: {
      eng,
      nno,
      nob
    }
  })

  vueApp.use(i18n)
})