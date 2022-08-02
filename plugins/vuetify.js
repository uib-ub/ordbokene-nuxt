import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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
        lightTheme: {
          dark: false,
          colors: {
            primary: '#560027',
            secondary: '#BC477B',
            tertiary: '#FDF4F5',
            anchor: '#880E4F',
            error: '#FDF4F5',
            border: '#9E9E9E',
            button: '#f5f5f5',
            text: '#000000'
          },
          variables: {} //ADD AN EMPTY OBJECT
        }
      }
     },
  })

  

  nuxtApp.vueApp.use(vuetify)
})


