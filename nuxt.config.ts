import { defineNuxtConfig } from 'nuxt'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'aws-lambda'
  },
  app: {
    cndUrl: 'https://beta.ordbok-dev.aws.uib.no'
  },
    css: ['~/assets/styles/main.scss',
  "bootstrap-icons/font/bootstrap-icons.scss"],
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
