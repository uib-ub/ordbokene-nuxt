import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
    css: ['~/assets/fonts/fonts.css', 'bootstrap-icons/font/bootstrap-icons.scss'],
    runtimeConfig: {
      public: {
        endpointEnv: process.env.ENDPOINT_ENV
      }
    },
    modules: [
        '@pinia/nuxt',
        'nuxt-windicss'
      ],
      build: {
        transpile: ['@headlessui/vue'],
    },
    vite: {
      resolve: {
        alias: {
          'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
        }
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
    }

})
