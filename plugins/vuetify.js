import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    display: {
      thresholds: {
        xs: 470,
        sm: 700,
        md: 1250,
        lg: 1900,
      }
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          variables: {},
          dark: false,
          colors: {
            primary: '#560027',
            secondary: '#BC477B',
            tertiary: '#FDF4F5',
            anchor: '#880E4F',
            error: '#FDF4F5'
          }
        }
      }
     },
     icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    }
  })

  

  nuxtApp.vueApp.use(vuetify)
})


