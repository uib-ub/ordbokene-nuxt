import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss', 'bootstrap-icons/font/bootstrap-icons.scss'],
    runtimeConfig: {
      public: {
        endpointEnv: process.env.ENDPOINT_ENV
      }
    },
    buildModules: [
        '@pinia/nuxt',
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
