import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
    css: ['~/assets/fonts/fonts.css', 'bootstrap-icons/font/bootstrap-icons.scss'],
    nitro: {
      compressPublicAssets: true,
    },
    runtimeConfig: {
      public: {
        endpointEnv: process.env.ENDPOINT_ENV || 'dev',
        versionWatermark: process.env.WATERMARK || 'test'
      }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-windicss'
      ],
      piniaPersistedstate: {
        cookieOptions: {
          sameSite: 'strict',
        }
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
    ],
    i18n: {
      // ...
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // recommended
      }
    }
    }

})
